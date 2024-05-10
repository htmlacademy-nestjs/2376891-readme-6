import { TBasePost } from './base-post.type';

// export type TVideoPost = TBasePost & {
//   name: string;
//   url: string;
// }

export interface TVideoPost extends TBasePost {
  name: string;
  url: string;
}
