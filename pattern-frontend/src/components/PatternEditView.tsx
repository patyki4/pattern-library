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

        <Group
            justify="flex-end"
            style={{
                flexShrink: 0,
                position: "sticky",
                bottom: 0,

                padding: "6px 0",
                background: "transparent",
                // backdropFilter: "blur(6px)",
                // WebkitBackdropFilter: "blur(6px)",

                // borderTop: "1px solid rgba(60, 96, 123, 0.08)",
                // boxShadow: "0 -6px 18px rgba(0,0,0,0.08)",
            }}>
            <Button variant="default" onClick={() => onCancel()}>
                cancel
            </Button>

            <Button
                color="indigo"
                onClick={() => {
                if (!pattern) return;
                onSave(pattern);
                }}>
                save
            </Button>
        </Group>
    </div>
)}