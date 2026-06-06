from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Pattern(Base):
    __tablename__ = "patterns"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    content = Column(Text, nullable=False)

    definitions = Column(Text)

    craft_type = Column(String(20), nullable=False)

    difficulty = Column(String(20))

    thumbnail_url = Column(String(500))

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )