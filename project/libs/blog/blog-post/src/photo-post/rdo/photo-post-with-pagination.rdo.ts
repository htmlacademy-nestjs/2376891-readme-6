import { Expose } from 'class-transformer';

import { PhotoPostRdo } from './photo-post.rdo';

export class PhotoPostWithPaginationRdo {
  @Expose()
  public entities: PhotoPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
