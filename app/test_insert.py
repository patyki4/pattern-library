from app.database import SessionLocal
from app.crud import create_pattern

db = SessionLocal()

pattern = create_pattern(
    db,
    title="Simple Scarf",
    content="Row 1: Knit all stitches. Row 2: Purl all stitches."
)

print("Inserted pattern:", pattern.id, pattern.title)

db.close()