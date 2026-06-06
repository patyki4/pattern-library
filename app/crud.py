from sqlalchemy.orm import Session
from app.models import Pattern

def create_pattern(db: Session, title: str, content: str, definitions: str, craft_type: str, difficulty: str):
    pattern = Pattern(title=title, content=content, definitions=definitions, craft_type=craft_type, difficulty=difficulty)
    db.add(pattern)
    db.commit()
    db.refresh(pattern)
    return pattern

def update_pattern(
    db,
    pattern_id,
    title,
    content,
    definitions,
    craft_type,
    difficulty,
):
    pattern = db.get(Pattern, pattern_id)

    if pattern is None:
        return None

    pattern.title = title
    pattern.content = content
    pattern.definitions = definitions
    pattern.craft_type = craft_type
    pattern.difficulty = difficulty

    db.commit()
    db.refresh(pattern)

    return pattern


def delete_pattern(db, pattern_id):
    pattern = db.get(Pattern, pattern_id)

    if pattern is None:
        return False

    db.delete(pattern)
    db.commit()

    return True