from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from openai import OpenAI
from app.dependencies import get_openai_client

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/moderate/text")
async def moderate_text(request: TextRequest, client: OpenAI = Depends(get_openai_client)):
    try:
        response = client.moderations.create(
            model="omni-moderation-latest",
            input=[{"type": "text", "text": request.text}]
        )
        flagged = response.results[0].flagged
        return flagged
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))