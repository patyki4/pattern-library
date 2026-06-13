export interface Tag {
  name: string;
}

export interface Pattern {
  id: number;
  title: string;
  content: string;
  definitions: string | null;
  craftType: string
  difficulty: string | null;
  thumbnailUrl: string | null;
  createdAt: string;

  tags: string[];
}