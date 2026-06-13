import type { Pattern } from "../types/Pattern";

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
    tags: (p.tags ?? []).map((tag: any) => tag.name),
  }));
}

// create
export async function createPattern(pattern: any) {
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
      tags: pattern.tags?.map((t: any) => t.name) ?? []
    }),
  });

  const data = await res.json();

  return data;
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


// old stuff from app.tsx
// const createPattern = async () => {
//     const response = await fetch(
//       "http://127.0.0.1:8000/patterns",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           content,
//           definitions,
//           craft_type,
//           difficulty,
//           tags: tagsInput
//           .split(",")
//           .map((t) => t.trim())
//           .filter(Boolean),
//         }),
//       }
//     );

//     if (response.ok) {
//       setTitle("");
//       setContent("");
//       setDefinitions("");
//       setCraftType("");
//       setDifficulty("");
//       loadPatterns();
//       setTagsInput("");
//     }
//   };