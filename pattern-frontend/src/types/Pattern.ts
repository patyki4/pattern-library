export interface Pattern {
  id: number;
  title: string;
  content: string;
  definitions: string | null;
  craft_type: string | null;
  difficulty: string | null;

  thumbnail_url: string | null;

  created_at: string;
}