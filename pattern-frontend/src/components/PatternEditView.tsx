import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternEditProps = {
  pattern: Pattern;
  setPattern: React.Dispatch<
    React.SetStateAction<Pattern | null>
  >;
  onSave: (pattern: Pattern) => void;

  onCancel: () => void;
}

export function PatternEditView({
  pattern,
  setPattern,
  onSave,
  onCancel
}: PatternEditProps) {

return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
        <TextInput
        label="Pattern Title"
        value={pattern.title ?? "title"}
        onChange={(e) =>
            setPattern({
            ...pattern,
            title: e.currentTarget.value,
            })
        }
        />

        <Textarea
        label="Content"
        minRows={12}
        autosize
        value={pattern.content}
        onChange={(e) =>
            setPattern({
            ...pattern,
            content: e.currentTarget.value,
            })
        }
        />

        <TextInput
        label="tags"
        value={pattern.tags.join(", ") ?? ""}
        onChange={(e) =>
            setPattern({
            ...pattern,
            tags: e.currentTarget.value.split(",").map((t) => t.trim())
            .filter(Boolean),
            })
        }
        />

        <TextInput
        label="Thumbnail URL"
        value={pattern.thumbnailUrl ?? ""}
        onChange={(e) =>
            setPattern({
            ...pattern,
            thumbnailUrl: e.currentTarget.value,
            })
        }
        />

        <Group justify="flex-end">
        <Button variant="default" onClick={() => onCancel()}>
            Cancel
        </Button>

        <Button
            onClick={() => {
            if (!pattern) return;

            onSave(pattern);
            }}
        >
            Save
        </Button>
        </Group>
    </div>
)}