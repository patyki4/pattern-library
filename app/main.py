from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import SessionLocal, engine
from app.models import Base, Pattern
from app.crud import (
    create_pattern,
    update_pattern,
    delete_pattern,
)

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

class PatternUpdate(BaseModel):
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

@app.put("/patterns/{pattern_id}")
def edit_pattern(
    pattern_id: int,
    pattern: PatternUpdate,
    db: Session = Depends(get_db),
):
    updated_pattern = update_pattern(
        db,
        pattern_id,
        pattern.title,
        pattern.content,
        pattern.definitions,
        pattern.craft_type,
        pattern.difficulty,
    )

    if updated_pattern is None:
        return {"error": "Pattern not found"}

    return updated_pattern

@app.delete("/patterns/{pattern_id}")
def remove_pattern(
    pattern_id: int,
    db: Session = Depends(get_db),
):
    success = delete_pattern(
        db,
        pattern_id,
    )

    if not success:
        return {"error": "Pattern not found"}

    return {"message": "Pattern deleted"}


@app.get("/patterns")
def list_patterns(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Pattern)

    if search:
        query = query.filter(
            Pattern.title.ilike(f"%{search}%")
        )

    return query.all()

@app.get("/patterns/{pattern_id}")
def get_pattern(
    pattern_id: int,
    db: Session = Depends(get_db),
):
    pattern = db.get(Pattern, pattern_id)

    if pattern is None:
        return {"error": "Pattern not found"}

    return pattern