from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional

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

craftType: str = Field(alias="craft_type")
thumbnailUrl: str = Field(alias="thumbnail_url")

class PatternCreate(BaseModel):
    title: str
    content: str
    definitions: str | None = None
    craftType: str
    difficulty: str | None = None
    thumbnailUrl: str | None = None
    tags: List[str] = Field(default_factory=list)

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "title",
                "content": "content",
                "definitions": "definitions",
                "craftType": "craft type",
                "thumbnailUrl": "https://example.com/img.png",
                "difficulty": "difficulty",
                "tags": []
            }
        }
    }

class PatternUpdate(BaseModel):
    title: str
    content: str
    definitions: str | None = None
    craftType: str | None = None
    difficulty: str | None = None
    thumbnailUrl: str | None = None
    tags: List[str] = Field(default_factory=list)

class TagResponse(BaseModel):
    name: str

    model_config = {
        "from_attributes": True
}
    
class PatternResponse(BaseModel):
    id: int

    title: str
    content: str
    definitions: str | None

    craftType: str | None
    difficulty: str | None

    thumbnailUrl: str | None

    tags: list[str] = []

    model_config = {
        "from_attributes": True
    }

@app.post("/patterns")
def add_pattern(pattern: PatternCreate, db: Session = Depends(get_db)):
    return create_pattern(
        db, 
        pattern.title, 
        pattern.content,
        pattern.definitions,
        pattern.craftType,
        pattern.difficulty,
        pattern.thumbnailUrl,
        pattern.tags
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
        pattern.craftType,
        pattern.difficulty,
        pattern.thumbnailUrl,
        pattern.tags
    )

    if updated_pattern is None:
        return {"error": "Pattern not found"}

    return PatternResponse(
    id=updated_pattern.id,
    title=updated_pattern.title,
    content=updated_pattern.content,
    definitions=updated_pattern.definitions,
    craftType=updated_pattern.craft_type,
    difficulty=updated_pattern.difficulty,
    thumbnailUrl=updated_pattern.thumbnail_url,
    tags=[tag.name for tag in updated_pattern.tags]
)

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


@app.get("/patterns", response_model=list[PatternResponse])
def list_patterns(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Pattern)

    if search:
        query = query.filter(
            Pattern.title.ilike(f"%{search}%")
        )

    patterns = query.all()
    return [
        PatternResponse(
            id=p.id,
            title=p.title,
            content=p.content,
            definitions=p.definitions,
            craftType=p.craft_type,
            difficulty=p.difficulty,
            thumbnailUrl=p.thumbnail_url,
            tags=p.tags,
        )
        for p in patterns
    ]

@app.get("/patterns/{pattern_id}", response_model=PatternResponse)
def get_pattern(pattern_id: int, db: Session = Depends(get_db)):
    pattern = db.get(Pattern, pattern_id)

    if pattern is None:
        return {"error": "Pattern not found"}

    return PatternResponse(
        id=pattern.id,
        title=pattern.title,
        content=pattern.content,
        definitions=pattern.definitions,
        craftType=pattern.craft_type,
        difficulty=pattern.difficulty,
        thumbnailUrl=pattern.thumbnail_url,
        tags=pattern.tags,
    )