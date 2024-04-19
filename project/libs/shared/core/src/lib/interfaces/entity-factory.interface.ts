import { IStorableEntity } from './storable-entity.interface';

export interface IEntityFactory<T extends IStorableEntity<ReturnType<T['toPOJO']>>> {
  create(entityPlainData: ReturnType<T['toPOJO']>): T;
}
