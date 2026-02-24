import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestAPIRoot:
    def test_api_root_returns_message(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "De Origen Natural" in data["message"]


class TestGalleryAPI:
    def test_get_gallery_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200

    def test_get_gallery_returns_list(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/gallery")
        data = response.json()
        assert isinstance(data, list)

    def test_get_gallery_has_items(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/gallery")
        data = response.json()
        assert len(data) > 0

    def test_gallery_item_has_required_fields(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/gallery")
        data = response.json()
        assert len(data) > 0
        item = data[0]
        assert "id" in item
        assert "title_es" in item
        assert "title_en" in item
        assert "image_url" in item
        assert "category" in item

    def test_gallery_item_has_bilingual_titles(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/gallery")
        data = response.json()
        for item in data:
            assert item["title_es"], "Spanish title should not be empty"
            assert item["title_en"], "English title should not be empty"


class TestContactAPI:
    def test_post_contact_returns_201_or_200(self, api_client):
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "message": "Test message from automated testing",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code in [200, 201]

    def test_post_contact_returns_contact_object(self, api_client):
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "message": "Test message from automated testing",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        data = response.json()
        assert "id" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]

    def test_post_contact_with_optional_fields(self, api_client):
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_{unique_id}",
            "company": "Test Company",
            "email": f"test_{unique_id}@example.com",
            "phone": "+1234567890",
            "service_interest": "beans",
            "message": "Interested in buying cacao beans",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code in [200, 201]
        data = response.json()
        assert data["company"] == "Test Company"
        assert data["phone"] == "+1234567890"
        assert data["service_interest"] == "beans"

    def test_post_contact_requires_name(self, api_client):
        payload = {
            "email": "test@example.com",
            "message": "Test message",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422

    def test_post_contact_requires_valid_email(self, api_client):
        payload = {
            "name": "Test User",
            "email": "not-an-email",
            "message": "Test message",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422

    def test_post_contact_requires_message(self, api_client):
        payload = {
            "name": "Test User",
            "email": "test@example.com",
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422

    def test_get_contact_returns_200(self, api_client):
        response = api_client.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200

    def test_contact_persists_in_database(self, api_client):
        """Create contact then verify it appears in GET list"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_PERSIST_{unique_id}",
            "email": f"test_persist_{unique_id}@example.com",
            "message": "Persistence test message",
        }
        post_response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert post_response.status_code in [200, 201]
        created_id = post_response.json()["id"]

        get_response = api_client.get(f"{BASE_URL}/api/contact")
        messages = get_response.json()
        found = any(m["id"] == created_id for m in messages)
        assert found, f"Created contact {created_id} not found in GET /api/contact"
