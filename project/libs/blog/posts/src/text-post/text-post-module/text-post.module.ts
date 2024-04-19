import { Module } from '@nestjs/common';

import { TextPostRepository } from './text-post.repository';
import { TextPostFactory } from './text-post.factory';
import { TextPostController } from './text-post.controller';
import { TextPostService } from './text-post.service';

@Module({
  controllers: [TextPostController],
  providers: [TextPostService, TextPostRepository, TextPostFactory],
  exports: [TextPostService, TextPostRepository],
})
export class TextPostModule {}
