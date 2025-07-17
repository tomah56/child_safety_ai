from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, HttpUrl
from openai import OpenAI
from app.dependencies import get_openai_client

router = APIRouter()

class ImageRequest(BaseModel):
    image_url: HttpUrl

@router.post("/moderate/image")
async def moderate_image(request: ImageRequest, client: OpenAI = Depends(get_openai_client)):
    try:
        response = client.moderations.create(
            model="omni-moderation-latest",
            input=[{"type": "image_url", "image_url": {"url": str(request.image_url)}}]
        )
        flagged = response.results[0].flagged
        return flagged
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))