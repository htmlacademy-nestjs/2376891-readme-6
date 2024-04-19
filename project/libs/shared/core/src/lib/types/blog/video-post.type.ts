import { TBasePost } from './base-post.type';

export type TVideoPost = TBasePost & {
  name: string;
  url: string;
}
