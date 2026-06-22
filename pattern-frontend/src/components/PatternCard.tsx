import { Card, Image, Text } from "@mantine/core";
import type { Pattern } from "../types/Pattern";

type PatternCardProps = {
  pattern: Pattern;
  //index: number;
  width: string;
  onClick: () => void;
};

function PatternCard({ pattern, width, onClick }: PatternCardProps) {
  return (
    <Card
        p="lg"
        style={{
        width: width,
        height: "clamp(160px, 40vh, 400px)",
        
        }}
        className="hoverCard"
        // onMouseEnter={() => setHoveredId(pattern.id)}
        // onMouseLeave={() => setHoveredId(null)}
        onClick={onClick}
    >
        <Card.Section>
            <Image 
                src={pattern.thumbnailUrl}
                height={150}
                radius={5}
                fallbackSrc="https://i.pinimg.com/736x/87/ec/7f/87ec7f572db6bfba36569f5cb3b8d468.jpg"
            />
        </Card.Section>
        <Card.Section>
            <Text>
                <strong>{pattern.title}</strong>
            </Text>
        </Card.Section>
        <Card.Section>
            <Text lineClamp={4}>
                {pattern.content}
            </Text>
        </Card.Section>
    </Card>
  );
}

export default PatternCard;