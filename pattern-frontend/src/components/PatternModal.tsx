import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternModalProps = {
  pattern: Pattern | null;
  isEditing: boolean;

  setIsEditing: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setPattern: React.Dispatch<
    React.SetStateAction<Pattern | null>
  >;

  onSave: (pattern: Pattern) => void;

  opened: boolean;
  onClose: () => void;
};

export function PatternModal({
  pattern,
  isEditing,
  setIsEditing,
  setPattern,
  onSave,
  opened,
  onClose,
}: PatternModalProps) {

return (
    <Modal
        opened={pattern !== null}
        onClose={onClose}
        size="90%"
        centered
    >
        {pattern && !isEditing && (
            <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "80vh",
                }}
                >
                    {/* Thumbnail */}
                    {pattern.thumbnailUrl && (
                        <img
                        src={pattern.thumbnailUrl}
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

                    <div
                        style={{
                        flex: 1,
                        paddingRight: "0.5rem",
                        }}
                    >
                        <Title order={2}>{pattern.title}</Title>
                        <Text style={{ whiteSpace: "pre-wrap" }}>
                            {pattern.content}
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
            </div>
        )}
        {pattern && isEditing && (
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
                <Button variant="default" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    if (!pattern) return;

                    onSave(pattern);

                    setIsEditing(false);
                    //setExpandedPattern(null);
                  }}
                >
                  Save
                </Button>
              </Group>
            </div>
        )}
    </Modal>
  );
}



            