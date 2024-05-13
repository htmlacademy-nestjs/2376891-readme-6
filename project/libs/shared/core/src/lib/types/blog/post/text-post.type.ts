import { TBasePost } from './base-post.type';

export interface TTextPost extends TBasePost {
  name: string;
  title: string;
  text: string;
}
