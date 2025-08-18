export type Note = {
  id: number;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type Folder = {
  id: number;
  user_id: string;
  name: string;
  created_at: string;
};
