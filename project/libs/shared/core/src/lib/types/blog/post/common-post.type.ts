import { TLinkPost } from './link-post.type';
import { TPhotoPost } from './photo-post.type';
import { TQuotationPost } from './quotation-post.type';
import { TTextPost } from './text-post.type';
import { TVideoPost } from './video-post.type';

export interface ICommonPost extends TLinkPost, TPhotoPost, TQuotationPost, TTextPost, TVideoPost {}
