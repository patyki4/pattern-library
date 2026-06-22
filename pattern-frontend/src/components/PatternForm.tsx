import { useState } from "react";
import { Card, TextInput, Textarea, Title } from "@mantine/core";

type PatternFormProps = {
  onSubmit: (patternData: {
    title: string;
    content: string;
    definitions: string;
    craftType: string;
    difficulty: string;
    thumbnailUrl: string;
    tags: string[];
  }) => void;
};

function PatternForm({ onSubmit }: PatternFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [definitions, setDefinitions] = useState("");
    const [craftType, setCraftType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const handleSubmit = () => {
        onSubmit({
        title,
        content,
        definitions,
        craftType,
        difficulty,
        thumbnailUrl,
        tags: tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        });

        setTitle("");
        setContent("");
        setDefinitions("");
        setCraftType("");
        setDifficulty("");
        setTagsInput("");
        setThumbnailUrl("");
    };

    return (
        <Card shadow="sm" padding="md" radius="md" color="blue">
            <Title order={3}>
            add pattern
            </Title>

            <TextInput
            placeholder="pattern title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <TextInput
            value={craftType}
            onChange={(e) => setCraftType(e.target.value)}
            placeholder="craft type"
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <TextInput
            value={definitions}
            onChange={(e) => setDefinitions(e.target.value)}
            placeholder="definitions"
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="pattern contents"
            rows={8}
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <TextInput
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="difficulty"
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <TextInput
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tags (comma separated)"
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <TextInput
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="thumbnail url"
            style={{
                width: "100%",
                marginBottom: "1rem",
            }}
            />

            <button onClick={handleSubmit}>
            save pattern
            </button>
        </Card>
    )
}

export default PatternForm;