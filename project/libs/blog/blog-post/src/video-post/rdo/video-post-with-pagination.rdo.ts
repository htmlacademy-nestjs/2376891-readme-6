import { Expose } from 'class-transformer';

import { VideoPostRdo } from './video-post.rdo';

export class VideoPostWithPaginationRdo {
  @Expose()
  public entities: VideoPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
