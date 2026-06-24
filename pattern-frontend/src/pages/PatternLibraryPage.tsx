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
  Group,
  Title,
  Image,
  Modal,
  Slider,
  Chip,
  useMantineColorScheme,
  ActionIcon
} from "@mantine/core";

function PatternLibraryPage() {
  const [search, setSearch] = useState("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const [expandedPattern, setExpandedPattern] = useState<typeof patterns[number] | null>(null);
  const [draftPattern, setDraftPattern] = useState<Pattern | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Pattern | null>(null);

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [sliderValue, setSliderValue] = useState(4);

  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const allTags = patterns.flatMap((pattern) => [
//     ...(pattern.tags ?? []),
//     pattern.craftType,
//     pattern.difficulty,
//   ]);

  const craftTypes = Array.from(
    new Set(
        patterns
        .map((pattern) => pattern.craftType)
        .filter((value): value is string =>
            typeof value === "string" && value.trim() !== ""
        )
    )
    ).map((value) => ({
    value,
    count: patterns.filter((p) => p.craftType === value).length,
    }));

    const filterCounts = new Map<string, number>();

    patterns.forEach((pattern) => {
    const values = [
        ...(pattern.tags ?? []),
        pattern.difficulty,
    ].filter((value): value is string =>
        typeof value === "string" && value.trim() !== ""
    );

    values.forEach((value) => {
        filterCounts.set(value, (filterCounts.get(value) ?? 0) + 1);
    });
    });

    const otherFilters = Array.from(filterCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({
        value,
        count,
    }));

    const filterOptions = [...craftTypes, ...otherFilters];

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

  const toggleStartWorking = () => {
    if (!expandedPattern) return;
    setIsWorking(!isWorking);
  };

  useEffect(() => {
    getPatterns().then((data) => {
        console.log(filterOptions);
        setPatterns(data);
    });
    }, []);

  const visiblePatterns = patterns.filter((pattern) => {
    const query = search.toLowerCase();

    const patternFilterValues = [
        ...(pattern.tags ?? []),
        pattern.craftType,
        pattern.difficulty,
    ].filter((value): value is string =>
        typeof value === "string" && value.trim() !== ""
    );

    const matchesSearch =
        pattern.title.toLowerCase().includes(query) ||
        pattern.content.toLowerCase().includes(query) ||
        patternFilterValues.some((value) =>
        value.toLowerCase().includes(query)
        );

    const matchesFilters =
        selectedTags.length === 0 ||
        selectedTags.every((selected) =>
        patternFilterValues.includes(selected)
        );

    return matchesSearch && matchesFilters;
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
                        # cards/row:
                    </Text>
                    <Slider 
                        value={sliderValue} 
                        onChange={setSliderValue} 
                        min={3} max={6} 
                        step={1} w={100}
                        label={null}
                        marks={[
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                            { value: 6, label: '6' },
                        ]}/>
                    <ActionIcon
                        onClick={toggleTheme}
                        variant={colorScheme === "dark" ? "light" : "dark"}
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
            <Group gap="xs" mt="sm" wrap="wrap">
                <Button
                    variant="light"
                    onClick={() => setShowTags((prev) => !prev)}
                    >
                    filter by:
                </Button>
                    <Chip.Group
                        multiple
                        value={selectedTags}
                        onChange={setSelectedTags}
                        >
                            {showTags && filterOptions.map(({ value, count }) => (
                            <Chip key={value} value={value}>
                                {value} ({count})
                            </Chip>
                            ))}
                    </Chip.Group>
                {/* {Array.from(filterCounts.entries())
                    .sort((a, b) => b[1] - a[1])
                    .map(([value, count]) => (
                        <Chip key={value} value={value}>
                        {value} ({count})
                        </Chip>
                    ))} */}
            </Group>
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
          setIsWorking(false);
        }}
        setDeleteTarget={setDeleteTarget}
        isWorking={isWorking}
        onWorking={toggleStartWorking}
        setIsWorking={setIsWorking}
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