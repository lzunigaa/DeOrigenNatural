# De Origen Natural Company - CAOJAMBO Website

## Original Problem Statement
Crear una web basándose en el PDF de De Origen Natural Company, exportador de cacao fino de aroma y Majambo del Amazonas Peruano.

## User Requirements
- Sitio informativo + funcionalidad de cotizaciones/contacto
- Formulario de contacto general
- Galería de imágenes/productos
- Multilingüe (ES/EN)
- Paleta de colores que transmita seguridad y confianza

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + MongoDB
- **Design**: Deep Jungle Green (#1A3C34) + Terracotta (#C06E52)
- **Typography**: Playfair Display (headings) + Manrope (body) + Space Mono (data)

## Core Features Implemented
1. ✅ Hero section con parallax y CTA
2. ✅ Quiénes Somos (About) con Misión/Visión
3. ✅ Nuestros Procesos (Producir/Transportar/Distribuir)
4. ✅ Valores (Integridad/Trazabilidad/Sostenibilidad)
5. ✅ Variedades (Majambo/Cacao/Derivados)
6. ✅ Servicios (Venta/Desarrollo/Exportación)
7. ✅ Sostenibilidad con métricas
8. ✅ Galería con lightbox
9. ✅ Formulario de contacto funcional
10. ✅ Toggle de idioma ES/EN persistente
11. ✅ Navegación con scroll suave
12. ✅ Menú móvil responsive
13. ✅ Footer con información de contacto

## API Endpoints
- `GET /api/gallery` - Obtener imágenes de galería
- `POST /api/contact` - Enviar mensaje de contacto
- `GET /api/contact` - Obtener mensajes (admin)

## User Personas
1. **Compradores B2B**: Chocolateros y empresas buscando cacao premium
2. **Importadores**: Buscando proveedores confiables de Amazonía
3. **Interesados generales**: Información sobre productos y sostenibilidad

## Prioritized Backlog
### P0 (Completed)
- [x] Landing page completa
- [x] Formulario de contacto
- [x] Multilingüe ES/EN
- [x] Galería de productos

### P1 (Next Phase)
- [ ] Panel de administración para gestionar contactos
- [ ] Integración con email (envío de notificaciones)
- [ ] SEO optimizado
- [ ] Información de contacto real

### P2 (Future)
- [ ] Blog/Noticias
- [ ] Catálogo de productos expandido
- [ ] Certificaciones y documentación descargable

## Date: Feb 24, 2026
