import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class UpdatedAtSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    const createdAtColumn = event.metadata.columns.find(
      c => c.propertyName === 'createdAt')

    if (createdAtColumn) {
      event.entity.createdAt = new Date()
    }
  }
}
