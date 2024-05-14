import { TBasePost } from './base-post.type';

export interface TLinkPost extends TBasePost {
  url: string;
  text: string;
}
