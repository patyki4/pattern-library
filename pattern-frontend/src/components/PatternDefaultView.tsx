import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternDefaultProps = {
  pattern: Pattern;
  onEdit: () => void;
  onClose: () => void;
}

export function PatternDefaultView({
  pattern,
  onEdit,
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
            <Text style={{ whiteSpace: "pre-wrap" }}>
                {pattern.content}
            </Text> 
        </div>
        {/* footer */}
            <Group
                justify="flex-end"
                style={{
                    flexShrink: 0,
                    position: "sticky",
                    bottom: 0,

                    padding: "6px 0",
                    background: "transparent",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",

                    borderTop: "1px solid rgba(60, 96, 123, 0.08)",
                    boxShadow: "0 -6px 18px rgba(0,0,0,0.08)",

                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Button
                    color="indigo"
                    onClick={onEdit}
                >
                    edit
                </Button>
                <Button variant="subtle" color="gray" onClick={onClose}>
                    close
                </Button>
            </Group>
    </div>
)}