import { TComment } from '../comment/comment.type';
import { PostType } from './post-type.type';
// import { TLike } from '../like/like.type';
// import { PostType } from '@prisma/client';

// export type TBasePost = {
//   id?: string;
//   originalId?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   tags: string[];
//   userId: string;
//   originalUserId?: string;
//   isRepost: boolean;
//   comments: TComment[];
//   // likes?: TLike[];
// };

export interface TBasePost {
  id?: string;
  originalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  type?: PostType;
  tags?: string[];
  userId?: string;
  originalUserId?: string;
  isRepost?: boolean;
  comments?: TComment[];
  // likes?: TLike[];
  // likes?: [];
}
