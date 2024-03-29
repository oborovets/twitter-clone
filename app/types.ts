export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  username: string;
  avatar: string;
}

export interface Params {
  params: { id?: string; user_id?: number };
}

export interface PostInfo {
  id: number;
  content: string;
}
