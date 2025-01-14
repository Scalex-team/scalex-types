import { IBaseModel } from "../../generic";


export enum JobStatus {
  initiated = 'initiated',
  pending = 'pending',
  completed = 'completed',
  failed = 'failed'
}

export enum JobTask {
  kyc = 'kyc',
  kyb = 'kyb'
}

export enum JobClientType {
  merchant = 'merchant',
  customer = 'customer',
  business = 'business',
  businessDirector = 'business-director',
  admin = 'admin',
  system = 'system'
}

export interface IJob<T = unknown> extends IBaseModel {
  status: JobStatus;
  client: {
    type: JobClientType;
    id?: string;
  }
  reports: Array<string>;
  description: string;
  task: JobTask;
  metadata: T;
}
