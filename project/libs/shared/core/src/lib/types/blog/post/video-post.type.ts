import { TBasePost } from './base-post.type';

export interface TVideoPost extends TBasePost {
  name: string;
  url: string;
}
