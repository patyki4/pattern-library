from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import SessionLocal, engine
from app.models import Base, Pattern
from app.crud import create_pattern

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PatternCreate(BaseModel):
    title: str
    content: str
    definitions: str | None = None
    craft_type: str | None = None
    difficulty: str | None = None

@app.post("/patterns")
def add_pattern(pattern: PatternCreate, db: Session = Depends(get_db)):
    return create_pattern(
        db, 
        pattern.title, 
        pattern.content,
        pattern.definitions,
        pattern.craft_type,
        pattern.difficulty
        )

@app.get("/patterns")
def list_patterns(db: Session = Depends(get_db)):
    return db.query(Pattern).all()