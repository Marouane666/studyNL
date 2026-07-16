export type ForumPost = {
  id: string;
  body: string;
  imageUrl: string | null;
  createdAt: string;
  author: { id: string; displayName: string };
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
  viewCount: number;
};

export type ForumComment = {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; displayName: string };
};

export type ForumMember = {
  id: string;
  displayName: string;
  joinedAt: string;
};
