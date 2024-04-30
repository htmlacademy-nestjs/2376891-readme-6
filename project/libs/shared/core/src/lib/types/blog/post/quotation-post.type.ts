import { TBasePost } from './base-post.type';

export type TQuotationPost = TBasePost & {
  text: string;
  quotationAuthor: string;
}
