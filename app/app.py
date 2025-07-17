from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import text_routes, image_routes

app = FastAPI(title="Moderation API", description="API to moderate text and images using OpenAI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(image_routes.router)
app.include_router(text_routes.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("your_file_name:app", host="0.0.0.0", port=8000, reload=True)


    
