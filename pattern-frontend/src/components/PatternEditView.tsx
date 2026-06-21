import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternEditProps = {
  pattern: Pattern;
  setPattern: React.Dispatch<
    React.SetStateAction<Pattern | null>
  >;
  onSave: (pattern: Pattern) => void;
  setDeleteTarget: (pattern: Pattern | null) => void;

  onCancel: () => void;
}

export function PatternEditView({
  pattern,
  setPattern,
  onSave,
  setDeleteTarget,
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

                    paddingTop: "10px",
                    backgroundColor: "var(--mantine-color-body)",
                    justifyContent: "space-between",
                    marginTop: "auto",

                    // backdropFilter: "blur(6px)",
                    // WebkitBackdropFilter: "blur(6px)",

                    borderTop: "3px solid rgba(134, 175, 206, 0.08)",
                    //boxShadow: "0 -6px 18px rgba(0,0,0,0.08)",

                    display: "flex",
                    width: "100%",
                }}>
                <Button color="red" onClick={() => setDeleteTarget(pattern)}>
                    delete
                </Button>
            <Group
                justify="flex-end"
                style={{
                    // flexShrink: 0,
                    // position: "sticky",
                    // bottom: 0,

                    // padding: "6px 0",
                    // background: "transparent",
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
        </Group>
    </div>
)}