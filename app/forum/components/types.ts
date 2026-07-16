export type Role = "member" | "moderator" | "admin";

export type ContentStatus = "visible" | "hidden";

export type ForumPost = {
  id: string;
  body: string;
  imageUrl: string | null;
  status: ContentStatus;
  createdAt: string;
  author: { id: string; displayName: string; role: Role };
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
  viewCount: number;
};

export type ForumComment = {
  id: string;
  body: string;
  status: ContentStatus;
  createdAt: string;
  author: { id: string; displayName: string; role: Role };
};

export type ForumMember = {
  id: string;
  displayName: string;
  role: Role;
  joinedAt: string;
};
