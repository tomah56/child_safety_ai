from fastapi.testclient import TestClient
from app.app import app

client = TestClient(app)

def test_moderate_image():
    response = client.post("/moderate/image", json={"image_url": "https://example.com/image.jpg"})
    assert response.status_code == 200
    assert response.json() in [True, False]

def test_moderate_text():
    response = client.post("/moderate/text", json={"text": "This is a test text."})
    assert response.status_code == 200
    assert response.json() in [True, False]