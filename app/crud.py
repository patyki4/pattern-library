from sqlalchemy.orm import Session
from app.models import Pattern, Tag

def create_pattern(
    db: Session, 
    title: str, 
    content: str, 
    definitions: str, 
    craftType: str, 
    difficulty: str, 
    thumbnailUrl: str,
    tags,
):
    pattern = Pattern(
        title=title, 
        content=content, 
        definitions=definitions, 
        craft_type=craftType, 
        difficulty=difficulty,
        thumbnail_url=thumbnailUrl)
    for tag_name in tags:
        tag = get_or_create_tag(
            db,
            tag_name.strip().lower(),
        )
        pattern.tags.append(tag)
        
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
    craftType,
    difficulty,
    thumbnailUrl,
):
    pattern = db.get(Pattern, pattern_id)

    if pattern is None:
        return None

    pattern.title = title
    pattern.content = content
    pattern.definitions = definitions
    pattern.craft_type = craftType
    pattern.difficulty = difficulty
    pattern.thumbnail_url = thumbnailUrl

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

def get_or_create_tag(
    db,
    tag_name,
):
    tag = (
        db.query(Tag)
        .filter(Tag.name == tag_name)
        .first()
    )

    if tag:
        return tag

    tag = Tag(name=tag_name)

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return tag