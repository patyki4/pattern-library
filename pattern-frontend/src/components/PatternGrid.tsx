import { Card, Image, Text } from "@mantine/core";
import type { Pattern } from "../types/Pattern";
import PatternCard from "./PatternCard";

type PatternGridProps = {
  patterns: Pattern[];
  onSelectPattern: (pattern: Pattern) => void;
};

function PatternGrid({ patterns, onSelectPattern }: PatternGridProps) {
    const numCols = 3;

    const rows = Array.from(
        { length: Math.ceil(patterns.length / numCols) },
        (_, i) => patterns.slice(i * numCols, i * numCols + numCols)
    );

return (
    <div style={{ width: "95vw", overflow: "visible", marginTop: 50,  marginBottom: "5rem"  }}>
        {rows.map((row, rowIndex) => (
            <div
                key={rowIndex}
                style={{
                display: "flex",
                marginBottom: 20,
                alignItems: "center",
                
                }}
            >
                {row.map((pattern, index) => (
                    <PatternCard
                        key={pattern.id ?? index}
                        pattern={pattern}
                        index={index}
                        onClick={() => onSelectPattern(pattern)}
                    />
                ))}
            </div>
            ))
        }
        </div>
    );
}

export default PatternGrid;