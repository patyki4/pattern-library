import { useEffect, useState } from "react";
import type { Pattern } from "../types/Pattern";
import PatternForm from "../components/PatternForm"
import PatternGrid from "../components/PatternGrid"
import { getPatterns, createPattern, updatePattern, deletePattern } from "../api/pattern_handler";
import { PatternModal } from "../components/PatternModal";
import "../App.css"
import {
  Button,
  Text,
  TextInput,
  Textarea,
  Card,
  Group,
  Title,
  Image,
  Modal,
  useMantineColorScheme,
  ActionIcon
} from "@mantine/core";

function PatternLibraryPage() {
  const [search, setSearch] = useState("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [expandedPattern, setExpandedPattern] = useState<typeof patterns[number] | null>(null);
  const [draftPattern, setDraftPattern] = useState<Pattern | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Pattern | null>(null);

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const handleCreatePattern = async (patternData: {
        title: string;
        content: string;
        definitions: string;
        craftType: string;
        difficulty: string;
        thumbnailUrl: string;
        tags: string[];
    }) => {
        const newPattern = await createPattern(patternData);
        setPatterns((prev) => [...prev, newPattern]);
    };

  const handleUpdatePattern = async (updated: Pattern) => {
    const saved = await updatePattern(updated);

    setPatterns((prev) =>
      prev.map((p) =>
        p.id === saved.id ? saved : p
      )
    );
    setExpandedPattern(saved);
    setDraftPattern(null);
    setIsEditing(false);
  };

  const handleDeletePattern = async (id: number) => {
    await deletePattern(id);

    setPatterns((prev) => prev.filter((p) => p.id !== id));

    setExpandedPattern(null);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    if (!expandedPattern) return;

    setDraftPattern({ ...expandedPattern });
    setIsEditing(true);
  };

  useEffect(() => {
    getPatterns().then(setPatterns);
  }, [search]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-mantine-color-scheme",
      colorScheme
    );
  }, [colorScheme]);
  
  return (
    <div style={{overflowX : "hidden"}}> 
      <div style={{ width: "100%", padding: "var(--mantine-spacing-sm)"}}>
        <Title order={1}>
          Pattern Library
        </Title>
        <ActionIcon
          onClick={toggleTheme}
          variant="subtle"
          size="lg"
        >
          {colorScheme === "dark" ? "☀️" : "🌙"}
        </ActionIcon>
        <section style={{ marginBottom: "1rem" }}></section>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns..."
            style={{ marginBottom: "1rem" }}
          />
      </div>
        <PatternGrid
            patterns={patterns}
            onSelectPattern={setExpandedPattern}
            />

      <PatternForm onSubmit={handleCreatePattern} />

      <PatternModal
        pattern={isEditing ? draftPattern : expandedPattern}
        isEditing={isEditing}
        onEdit={handleStartEditing}
        setIsEditing={setIsEditing}
        setPattern={setDraftPattern}
        onSave={handleUpdatePattern}
        opened={expandedPattern !== null}
        onClose={() => {
          setExpandedPattern(null);
          setIsEditing(false);
        }}
        setDeleteTarget={setDeleteTarget}
        sideBySide={sideBySide}
        setSideBySide={setSideBySide}
      />

      <Modal
        opened={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        centered
        size="auto"
        zIndex={999}
        withCloseButton={false}
      >
        {deleteTarget && (
          <>
            <Text>
              Delete{" "}
              "<strong>{deleteTarget.title}</strong>"?
            </Text>

            <Group justify="flex-end" mt="xl">
              <Button
                variant="default"
                onClick={() => setDeleteTarget(null)}
              >
                cancel
              </Button>

              <Button
                color="red"
                onClick={async () => {
                  await handleDeletePattern(deleteTarget.id);
                  setDeleteTarget(null);
                }}
              >
                delete
              </Button>
            </Group>
          </>
        )}
      </Modal>
    </div>
  );
}

export default PatternLibraryPage;