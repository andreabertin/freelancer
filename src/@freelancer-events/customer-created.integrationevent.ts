export const EVENT_NAME: string = 'customer.created';

export interface CustomerCreatedIntegrationEvent {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  companyName: string;
  vatCode: string;
  taxCode: string;
  countryCode: string;
}
