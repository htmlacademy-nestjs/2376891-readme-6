import { TBasePost } from './base-post.type';

export type TPhotoPost = TBasePost & {
  photo: string;
}
