import { useEffect, useState } from "react";
import type { Pattern } from "./types/Pattern";
import {
  Button,
  Text,
  TextInput,
  Textarea,
  Card,
  Badge,
  Group,
  Stack,
  Title,
  Image,
  Modal
} from "@mantine/core";

function App() {
  const [search, setSearch] = useState("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [craft_type, setCraftType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedPattern, setExpandedPattern] = useState<typeof patterns[number] | null>(null);

  const loadPatterns = () => {
    fetch(
  `http://127.0.0.1:8000/patterns?search=${encodeURIComponent(search)}`
  )
      .then((res) => res.json())
      .then((data) => setPatterns(data));
  };

  useEffect(() => {
    loadPatterns();
  }, [search]);

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
          difficulty,
          tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
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
      setTagsInput("");
    }
  };


  const numCols = 3;

  const rows = Array.from(
    { length: Math.ceil(patterns.length / numCols) },
    (_, i) => patterns.slice(i * numCols, i * numCols + numCols)
  );
  
  return (
    <div> 
      <div style={{ width: "100%", padding: "var(--mantine-spacing-sm)"}}>
        <Title order={1}>
          Pattern Library
        </Title>
        <section style={{ marginBottom: "1rem" }}></section>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns..."
            style={{ marginBottom: "3rem" }}
          />
      </div>
      <div style={{ width: "100vw", overflow: "visible", marginTop: 50,  marginBottom: "5rem"  }}>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              marginBottom: 20,
              alignItems: "center",
              
            }}
          >
            {row.map((pattern, index) => (
              <Card
                p="lg"
                key={pattern.id ?? index}
                style={{
                  width: "clamp(160px, 30vw, 500px)",
                  height: "clamp(160px, 40vh, 400px)",
                  flex: "0 0 auto",
                  overflow: "hidden",
                  display: "inline-block",
                  marginLeft: index === 0 ? 0 : -20,
                  marginBottom: -40,
                  position: "relative",
                  transform:
                    hoveredId === pattern.id
                      ? "translateY(-6px) scale(1.04)"
                      : "translateY(0px) scale(1)",
                  //zIndex: hoveredId === pattern.id ? 999 : 1,
                  boxShadow:
                    hoveredId === pattern.id
                      ? "0 12px 30px rgba(0,0,0,0.18)"
                      : undefined,
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  borderColor: "white"
                }}
                className="hoverCard"
                onMouseEnter={() => setHoveredId(pattern.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setExpandedPattern(pattern)}
              >
                <Card.Section>
                  <Image 
                    src="https://placehold.co/200x200"
                    height={150}
                    radius={5}
                  />
                </Card.Section>
                <Card.Section>
                  <Text lineClamp={6}>
                    {pattern.content}
                  </Text>
                </Card.Section>
              </Card>
            ))}
          </div>
        ))}
      </div>
      <Modal
        opened={expandedPattern !== null}
        onClose={() => setExpandedPattern(null)}
        size="95%"
        centered
      >
        {expandedPattern && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            {/* Thumbnail */}
            {expandedPattern.thumbnail_url && (
              <img
                src={expandedPattern.thumbnail_url}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            )}

            {/* Scrollable content */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "0.5rem",
              }}
            >
              <Title order={2}>{expandedPattern.title}</Title>

              <Text style={{ whiteSpace: "pre-wrap" }}>
                {expandedPattern.content}
              </Text>
            </div>

            {/* Footer */}
            <Group justify="flex-end" mt="md">
              <Button
                onClick={() => {
                  // future edit functionality
                }}
              >
                Edit
              </Button>
            </Group>
          </div>
        )}
      </Modal>
      <Card shadow="sm" padding="md" radius="md" color="blue">
        <Title order={3}>
          Add Pattern
        </Title>

        <TextInput
          label="Title"
          placeholder="Pattern title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
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

        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="tags (comma separated)"
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <button onClick={createPattern}>
          Save Pattern
        </button>
      </Card>
    </div>
  );
}

export default App;