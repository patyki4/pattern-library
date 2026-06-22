import { useEffect, useState } from "react";
import type { Pattern } from "../types/Pattern";
import PatternForm from "../components/PatternForm"
import PatternGrid from "../components/PatternGrid"
import { getPatterns, createPattern, updatePattern, deletePattern } from "../api/pattern_handler";
import { PatternModal } from "../components/PatternModal";
import "../App.css"
import {
  Button,
  Box,
  Text,
  TextInput,
  Textarea,
  Card,
  Group,
  Title,
  Image,
  Modal,
  Slider,
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

  const [sliderValue, setSliderValue] = useState(4);

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
  }, []);

  const visiblePatterns = patterns.filter((pattern) => {
    const query = search.toLowerCase();

    return (
        pattern.title.toLowerCase().includes(query) ||
        pattern.content.toLowerCase().includes(query) ||
        pattern.craftType.toLowerCase().includes(query) ||
        (pattern.difficulty?.toLowerCase() ?? "").includes(query) ||
        pattern.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
  
  return (
    <Box
        style={{
            minHeight: "100vh",
            overflowX: "hidden",
            backgroundColor: "var(--mantine-color-body)",
        }}
        >
        <div style={{ width: "100%", padding: "var(--mantine-spacing-sm)"}}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    width: "100%",
                }}
                >
                <div />
                <Title order={1}>
                    Pattern Library
                </Title>
                <Group justify="flex-end" gap="sm">
                    <Text>
                        # cards:
                    </Text>
                    <Slider 
                        value={sliderValue} 
                        onChange={setSliderValue} 
                        min={3} max={6} 
                        step={1} w={100}
                        marks={[
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                            { value: 6, label: '6' },
                        ]}/>
                    <ActionIcon
                        onClick={toggleTheme}
                        variant="light"
                        size="lg"
                        >
                        {colorScheme === "dark" ? "☀️" : "🌙"}
                    </ActionIcon>
                </Group>
            </div>
        <section style={{ marginBottom: "1rem" }}></section>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search patterns..."
            style={{ marginBottom: "1rem" }}
          />
      </div>
        <PatternGrid
            patterns={visiblePatterns}
            cardsPerRow={sliderValue}
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
    </Box>
  );
}

export default PatternLibraryPage;