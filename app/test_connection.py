from sqlalchemy import text

from database import engine

with engine.connect() as conn:
    result = conn.execute(text("SELECT version();"))

    for row in result:
        print(row[0])

print("Successfully connected!")
