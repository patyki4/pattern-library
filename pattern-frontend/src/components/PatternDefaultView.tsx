import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternDefaultProps = {
  pattern: Pattern;
  onEdit: () => void;
  onWorking: () => void;
  onClose: () => void;
}

export function PatternDefaultView({
  pattern,
  onEdit,
  onWorking,
  onClose
}: PatternDefaultProps) {

return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
        <div>
            {/* Thumbnail */}
            {pattern.thumbnailUrl && (
                <img
                src={pattern.thumbnailUrl}
                alt=""
                style={{
                    float: "right",
                    width: "40%",
                    flexShrink: 0,
                    borderRadius: "8px",
                    marginBottom: "1rem",
                }}
                />
            )}
                
            <Title order={2}>{pattern.title}</Title>
            <Text>
                {pattern.difficulty} difficulty, {pattern.craftType}
            </Text>
            <Text>
                tags: {pattern.tags?.length ? pattern.tags.join(", ") : "none"}
            </Text>
            <Text style={{ whiteSpace: "pre-wrap" }}>
                {pattern.content}
            </Text> 
        </div>
        {/* footer */}
            <Group
                justify="flex-end"
                style={{
                    flexShrink: 0,
                    marginTop: "auto",
                    position: "sticky",
                    bottom: 0,

                    paddingTop: "10px",
                    backgroundColor: "var(--mantine-color-body)",
                    // background: "transparent",
                    // backdropFilter: "blur(6px)",
                    // WebkitBackdropFilter: "blur(6px)",

                    borderTop: "3px solid rgba(134, 175, 206, 0.08)",
                    //boxShadow: "-6 -6px 6px rgba(189, 205, 240, 0.08)",

                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Group>
                    <Button
                        color="indigo"
                        onClick={onEdit}
                    >
                        edit
                    </Button>
                    <Button
                        color="indigo"
                        onClick={onWorking}
                    >
                        working mode
                    </Button>
                </Group>
                <Button variant="subtle" color="gray" onClick={onClose}>
                    close
                </Button>
            </Group>
    </div>
)}

export default PatternDefaultView;