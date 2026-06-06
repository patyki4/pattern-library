import { useEffect, useState } from "react";
import type { Pattern } from "./types/Pattern";

function App() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [craft_type, setCraftType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const loadPatterns = () => {
    fetch("http://127.0.0.1:8000/patterns")
      .then((res) => res.json())
      .then((data) => setPatterns(data));
  };

  useEffect(() => {
    loadPatterns();
  }, []);

  const createPattern = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/patterns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          definitions,
          craft_type,
          difficulty
        }),
      }
    );

    if (response.ok) {
      setTitle("");
      setContent("");
      setDefinitions("");
      setCraftType("");
      setDifficulty("");
      loadPatterns();
    }
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>Pattern Library</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Add Pattern</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pattern title"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <input
          value={craft_type}
          onChange={(e) => setCraftType(e.target.value)}
          placeholder="craft type"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <input
          value={definitions}
          onChange={(e) => setDefinitions(e.target.value)}
          placeholder="definitions"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Pattern instructions"
          rows={8}
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <input
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="difficulty"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <button onClick={createPattern}>
          Save Pattern
        </button>
      </section>

      <section>
        {patterns.map((pattern) => (
          <article
            key={pattern.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h2>{pattern.title}</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {pattern.content}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;