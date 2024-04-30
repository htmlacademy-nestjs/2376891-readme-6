import { TBasePost } from './base-post.type';

export type TTextPost = TBasePost & {
  name: string;
  title: string;
  text: string;
}
