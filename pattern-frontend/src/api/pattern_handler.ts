import type { Pattern, NewPattern } from "../types/Pattern";

const API_URL = "http://127.0.0.1:8000/patterns";

export async function getPatterns() {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch patterns");
  }

  return data.map((p: any) => ({
    id: p.id,
    title: p.title,
    content: p.content,
    definitions: p.definitions,
    craftType: p.craftType,
    thumbnailUrl: p.thumbnailUrl,
    difficulty: p.difficulty,
    tags: p.tags ?? [],
    createdAt: p.createdAt ?? p.created_at,
  }));
}

// create
export async function createPattern(pattern: NewPattern): Promise<Pattern> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: pattern.title,
      content: pattern.content,
      definitions: pattern.definitions,
      craftType: pattern.craftType,
      thumbnailUrl: pattern.thumbnailUrl,
      difficulty: pattern.difficulty,
      tags: pattern.tags
    }),
  });

  const data = await res.json();

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    definitions: data.definitions,
    craftType: data.craftType ?? data.craft_type,
    thumbnailUrl: data.thumbnailUrl ?? data.thumbnail_url,
    difficulty: data.difficulty,
    tags: (data.tags ?? []).map((t: any): string =>
      typeof t === "string" ? t : t.name
    ),
    createdAt: data.createdAt ?? data.created_at,
  }
}

//update
export async function updatePattern(pattern: Pattern): Promise<Pattern> {
  const res = await fetch(`${API_URL}/${pattern.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pattern),
  });

  return await res.json();
}

export async function deletePattern(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete pattern");
  }
}