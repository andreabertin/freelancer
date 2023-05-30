import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class AutoGenIdClearSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    const autoGenId = event.metadata.columns.find(
      c => c.propertyName === 'id' && c.isGenerated && c.generationStrategy === 'uuid');

    if (autoGenId && event.entity.id === null) {
      event.entity.id = undefined;
    }
  }
}
