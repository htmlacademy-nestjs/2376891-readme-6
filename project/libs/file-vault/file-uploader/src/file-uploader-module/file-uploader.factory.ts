import { Injectable } from '@nestjs/common';

import { IFile, IEntityFactory } from '@project/core';
import { FileUploaderEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements IEntityFactory<FileUploaderEntity> {
  public create(entityPlainData: IFile): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
