import { TBasePost } from './base-post.type';

// export type TPhotoPost = TBasePost & {
//   photo: string;
// }

export interface TPhotoPost extends TBasePost {
  photo: string;
}
