import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class CreatedAtSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    const updatedAtColumn = event.metadata.columns.find(
      c => c.propertyName === 'updatedAt')

    if (updatedAtColumn) {
      event.entity.updatedAt = new Date()
    }
  }
}

