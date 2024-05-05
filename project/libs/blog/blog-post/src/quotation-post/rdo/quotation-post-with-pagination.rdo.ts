import { Expose } from 'class-transformer';

import { QuotationPostRdo } from './quotation-post.rdo';

export class QuotationPostWithPaginationRdo {
  @Expose()
  public entities: QuotationPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
