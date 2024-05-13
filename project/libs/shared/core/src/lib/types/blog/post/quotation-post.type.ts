import { TBasePost } from './base-post.type';

export interface IQuotationPost extends TBasePost {
  text: string;
  quotationAuthor: string;
}
