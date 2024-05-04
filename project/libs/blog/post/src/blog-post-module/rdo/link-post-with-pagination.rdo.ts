import { Expose } from 'class-transformer';

import { LinkPostRdo } from './link-post.rdo';

export class LinkPostWithPaginationRdo {
  @Expose()
  public entities: LinkPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
