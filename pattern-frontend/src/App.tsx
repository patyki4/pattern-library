import { useEffect, useState } from "react";
import type { Pattern } from "./types/Pattern";
import { getPatterns, createPattern, updatePattern } from "./api/patterns";
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
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdatePattern = async (updated: Pattern) => {
  const saved = await updatePattern(updated);

  setPatterns((prev) =>
    prev.map((p) =>
      p.id === saved.id ? saved : p
    )
  );
};

  useEffect(() => {
    getPatterns().then(setPatterns);
  }, [search]);

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
                  <Text>
                    {pattern.title}
                  </Text>
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
        onClose={() => {
          setExpandedPattern(null);
          setIsEditing(false);
        }}
        size="90%"
        centered
      >
        {expandedPattern && (
          <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
          {!isEditing && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",
              }}
            >
              {/* Thumbnail */}
              {expandedPattern.thumbnailUrl && (
                <img
                  src={expandedPattern.thumbnailUrl}
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
              ><Title order={2}>{expandedPattern.title}</Title>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {expandedPattern.content}
                </Text>
              </div>

              {/* Footer */}
              <Group justify="flex-end" mt="md">
                <Button
                  onClick={() => setIsEditing(true)}>
                  edit
                </Button>
              </Group>
            </div> 
          )}

          {isEditing && expandedPattern && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <TextInput
                label="Pattern Title"
                value={expandedPattern.title ?? "title"}
                onChange={(e) =>
                  setExpandedPattern({
                    ...expandedPattern,
                    title: e.currentTarget.value,
                  })
                }
              />
              <TextInput
                label="Thumbnail URL"
                value={expandedPattern.thumbnailUrl ?? ""}
                onChange={(e) =>
                  setExpandedPattern({
                    ...expandedPattern,
                    thumbnailUrl: e.currentTarget.value,
                  })
                }
              />

              <Textarea
                label="Content"
                minRows={12}
                autosize
                value={expandedPattern.content}
                onChange={(e) =>
                  setExpandedPattern({
                    ...expandedPattern,
                    content: e.currentTarget.value,
                  })
                }
              />
              <Group justify="flex-end">
                <Button variant="default" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    if (!expandedPattern) return;

                    handleUpdatePattern({
                      ...expandedPattern,
                      tags: (expandedPattern.tags ?? []).map((t: any) =>
                        typeof t === "string" ? t : t.name
                      ),
                    });

                    setIsEditing(false);
                    setExpandedPattern(null);
                  }}
                >
                  Save
                </Button>
              </Group>
            </div>
          )}
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