import { useState, useEffect} from "react";
import { Textarea, TextInput, Button, Group } from "@mantine/core";
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
    
const [tagsInput, setTagsInput] = useState(
  pattern.tags?.join(", ") ?? ""
);

useEffect(() => {
  setTagsInput(pattern.tags?.join(", ") ?? "");
}, [pattern.id]);

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
            value={tagsInput}
            onChange={(e) => setTagsInput(e.currentTarget.value)}
        />

        <TextInput
            label="difficulty"
            value={pattern.difficulty ?? "difficulty"}
            onChange={(e) =>
                setPattern({
                ...pattern,
                difficulty: e.currentTarget.value,
                })
            }
        />

        <TextInput
            label="craft type"
            value={pattern.craftType ?? "craft type"}
            onChange={(e) =>
                setPattern({
                ...pattern,
                craftType: e.currentTarget.value,
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
                    onSave({
                        ...pattern,
                        tags: tagsInput
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        });
                    }}>
                    save
                </Button>
            </Group>
        </Group>
    </div>
)}

export default PatternEditView;