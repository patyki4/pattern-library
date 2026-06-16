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

export interface NewPattern {
  title: string;
  content: string;
  definitions?: string;
  craftType?: string;
  thumbnailUrl?: string;
  difficulty?: string;
  tags: string[];
}