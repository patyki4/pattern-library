from sqlalchemy import Column, Integer, String, Text, DateTime, Table, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

pattern_tags = Table(
    "pattern_tags",
    Base.metadata,
    Column(
        "pattern_id",
        ForeignKey("patterns.id"),
        primary_key=True,
    ),
    Column(
        "tag_id",
        ForeignKey("tags.id"),
        primary_key=True,
    ),
)

class Tag(Base):
    __tablename__ = "tags"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    patterns = relationship(
        "Pattern",
        secondary=pattern_tags,
        back_populates="tags",
    )

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

    tags = relationship(
        "Tag",
        secondary=pattern_tags,
        back_populates="patterns",
    )