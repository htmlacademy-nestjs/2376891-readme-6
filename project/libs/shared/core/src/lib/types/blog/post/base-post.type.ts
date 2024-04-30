import { TComment } from '../comment/comment.type';
import { TLike } from '../like/like.type';

export type TBasePost = {
  id?: string;
  originalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  userId?: string;
  originalUserId?: string;
  isRepost?: boolean;
  comments?: TComment[];
  likes?: TLike[];
};
