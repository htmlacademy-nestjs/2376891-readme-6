import { Expose } from 'class-transformer';

import { TextPostRdo } from './text-post.rdo';

export class TextPostWithPaginationRdo {
  @Expose()
  public entities: TextPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
