import { useState, useEffect} from "react";
import { Box, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternWorkingProps = {
  pattern: Pattern;
  onExit: () => void;
}

export function PatternWorkingView({
  pattern,
  onExit
}: PatternWorkingProps) {


const [workingRow, setWorkingRow] = useState(1);

const advanceRow = () => {
    setWorkingRow(workingRow+1);
  };

const patternLines = pattern.content
  .split(/\r?\n/)
  .filter((line) => line.trim() !== "");

return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
        <div style={{ display: "flex", height: "80vh", overflow: "hidden", flexDirection: "row"}}>
            <div style={{flex: 6, marginRight: "1rem", overflowY: "auto"}}>
                {patternLines.map((line, index) => (
                    <Text
                        key={index}
                        onDoubleClick={() => setWorkingRow(index)}
                        style={{
                            userSelect: index === workingRow ? "text" : "none",
                            fontWeight: index === workingRow ? 700 : 400,
                            backgroundColor:
                                index === workingRow ? "var(--mantine-primary-color-light)" : "transparent",
                            padding: "4px 8px",
                            borderRadius: 4,
                        }}
                    >
                        {line}
                    </Text>
                    ))}
                </div>
            <div style={{flex: 4}}>
                <Box style={{width: "100%"}}>
                    {pattern.thumbnailUrl && (
                        <img
                        src={pattern.thumbnailUrl}
                        alt=""
                        style={{
                            //float: "right",
                            width: "100%",
                            objectFit: "contain",
                            // height: "50%",
                            flexShrink: 0,
                            //borderRadius: "8px",
                            //marginBottom: "1rem",
                        }}
                        />
                        
                    )}
                </Box>
                <Title order={2}>{pattern.title}</Title>
                <Text>
                    {pattern.difficulty} difficulty, {pattern.craftType}
                </Text>
                <Text>
                    tags: {pattern.tags?.length ? pattern.tags.join(", ") : "none"}
                </Text>
                <Text>
                    definitions: 
                </Text>
                <Text style={{marginLeft:"1rem"}}>
                    {pattern.definitions?.length ? pattern.definitions : ""}
                </Text>
            </div>
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
                <Button
                    onClick={advanceRow}
                >
                    next row
                </Button>
                <Button variant="subtle" color="gray" onClick={onExit}>
                    exit working mode
                </Button>
            </Group>
    </div>
)}

export default PatternWorkingView;