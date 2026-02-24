from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'rzunigabermejo@gmail.com')
SENDER_EMAIL = "De Origen Natural <onboarding@resend.dev>"

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title_es: str
    title_en: str
    description_es: Optional[str] = None
    description_en: Optional[str] = None
    image_url: str
    category: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Routes
@api_router.get("/")
async def root():
    return {"message": "De Origen Natural API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.contact_messages.insert_one(doc)
    
    # Send email notification
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1A3C34; border-bottom: 2px solid #C06E52; padding-bottom: 10px;">
                Nuevo Mensaje de Contacto - CAOJAMBO
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; font-weight: bold; color: #1A3C34;">Nombre:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8;">{input.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; font-weight: bold; color: #1A3C34;">Empresa:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8;">{input.company or 'No especificada'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; font-weight: bold; color: #1A3C34;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8;"><a href="mailto:{input.email}" style="color: #C06E52;">{input.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; font-weight: bold; color: #1A3C34;">Teléfono:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8;">{input.phone or 'No especificado'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; font-weight: bold; color: #1A3C34;">Servicio de Interés:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8;">{input.service_interest or 'No especificado'}</td>
                </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #FDFBF7; border-left: 4px solid #C06E52;">
                <h3 style="color: #1A3C34; margin-top: 0;">Mensaje:</h3>
                <p style="color: #5C5C5C; line-height: 1.6;">{input.message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #5C5C5C;">
                Este mensaje fue enviado desde el formulario de contacto de la web De Origen Natural Company.
            </p>
        </div>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [CONTACT_EMAIL],
            "subject": f"Nuevo contacto: {input.name} - {input.service_interest or 'Consulta general'}",
            "html": html_content
        }
        
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {CONTACT_EMAIL} for contact from {input.email}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        # Don't raise exception - still save the contact even if email fails
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg['created_at'], str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages

# Gallery routes
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images():
    images = await db.gallery_images.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    
    for img in images:
        if isinstance(img.get('created_at'), str):
            img['created_at'] = datetime.fromisoformat(img['created_at'])
    
    # If no images in DB, return default gallery
    if not images:
        return get_default_gallery()
    
    return images

def get_default_gallery():
    return [
        GalleryImage(
            id="1",
            title_es="Cacao Fino de Aroma",
            title_en="Fine Aroma Cacao",
            description_es="Granos de cacao seleccionados de la Amazonía Peruana",
            description_en="Selected cacao beans from the Peruvian Amazon",
            image_url="https://images.unsplash.com/photo-1699575947488-30f08e71896b?w=800",
            category="cacao",
            order=1
        ),
        GalleryImage(
            id="2",
            title_es="Bosque Amazónico",
            title_en="Amazon Forest",
            description_es="Nuestro entorno natural de producción",
            description_en="Our natural production environment",
            image_url="https://images.unsplash.com/photo-1699575678956-aefa714b67f0?w=800",
            category="nature",
            order=2
        ),
        GalleryImage(
            id="3",
            title_es="Proceso de Fermentación",
            title_en="Fermentation Process",
            description_es="Control de calidad en cada etapa",
            description_en="Quality control at every stage",
            image_url="https://images.pexels.com/photos/6420910/pexels-photo-6420910.jpeg?w=800",
            category="process",
            order=3
        ),
        GalleryImage(
            id="4",
            title_es="Majambo Fresco",
            title_en="Fresh Majambo",
            description_es="Fruta exótica del Amazonas",
            description_en="Exotic fruit from the Amazon",
            image_url="https://images.pexels.com/photos/14436424/pexels-photo-14436424.jpeg?w=800",
            category="product",
            order=4
        ),
        GalleryImage(
            id="5",
            title_es="Sostenibilidad",
            title_en="Sustainability",
            description_es="Prácticas responsables con el medio ambiente",
            description_en="Environmentally responsible practices",
            image_url="https://images.pexels.com/photos/7450070/pexels-photo-7450070.jpeg?w=800",
            category="sustainability",
            order=5
        ),
        GalleryImage(
            id="6",
            title_es="Granos Seleccionados",
            title_en="Selected Beans",
            description_es="Calidad premium para mercados gourmet",
            description_en="Premium quality for gourmet markets",
            image_url="https://images.pexels.com/photos/33662910/pexels-photo-33662910.jpeg?w=800",
            category="product",
            order=6
        )
    ]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
