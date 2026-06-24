import type { Pattern } from "../types/Pattern";
import PatternCard from "./PatternCard";

type PatternGridProps = {
  patterns: Pattern[];
  cardsPerRow: number;
  onSelectPattern: (pattern: Pattern) => void;
};


function PatternGrid({ patterns, cardsPerRow, onSelectPattern }: PatternGridProps) {

    const rows = Array.from(
        { length: Math.ceil(patterns.length / cardsPerRow) },
        (_, i) => patterns.slice(i * cardsPerRow, i * cardsPerRow + cardsPerRow)
    );

    const cardWidth = `calc(${(85 - 3 + cardsPerRow) / cardsPerRow}vw)`;

return (
    <div
        style={{
            width: "100%",
            boxSizing: "border-box",
            overflow: "visible",
            marginTop: "1rem",
            marginBottom: "6rem",
        }}
        >
        {rows.map((row, rowIndex) => (
            <div
                key={rowIndex}
                style={{
                    display: "flex",
                    marginBottom: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible"
                }}
            >
                {row.map((pattern, index) => (
                    <div
                        key={pattern.id ?? index}
                        style={{
                            overflow: "visible",
                            marginLeft: index === 0 ? 0 : -20,
                            marginBottom: -index*25-40,
                            position: "relative",
                        }}
                    >
                        <PatternCard
                            pattern={pattern}
                            //index={index}
                            width={cardWidth}
                            onClick={() => onSelectPattern(pattern)}
                        />
                    </div>
                ))}
            </div>
            ))
        }
        </div>
    );
}

export default PatternGrid;