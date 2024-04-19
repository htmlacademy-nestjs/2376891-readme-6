import { TBasePost } from './base-post.type';

export type TLinkPost = TBasePost & {
  url: string;
  description?: string;
}
