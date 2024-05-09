import { TBasePost } from './base-post.type';

// export type TLinkPost = TBasePost & {
//   url: string;
//   description?: string;
// }

export interface TLinkPost extends TBasePost {
  url: string;
  text: string;
}
