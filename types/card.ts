export interface Card {
  id: number | string;
  status: string;
  title: string;
  description: string;
  priority: string;
  owner: string;
  assignees: string[];
  created: Date;
}
