import { Column, PrimaryGeneratedColumn } from "typeorm";

export interface CustomerCreatedIntegrationEvent {

  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  companyName: string;
  vatCode: string;
  taxCode: string;

}
