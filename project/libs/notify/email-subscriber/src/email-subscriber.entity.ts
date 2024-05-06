import { Entity, IStorableEntity, ISubscriber } from '@project/core';

export class EmailSubscriberEntity extends Entity implements IStorableEntity<ISubscriber> {
  public email: string;
  public name: string;

  constructor (subscriber?: ISubscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: ISubscriber): void {
    if (! subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.name = subscriber.name;
  }

  public toPOJO(): ISubscriber {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    }
  }
}
