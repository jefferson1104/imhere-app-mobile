export type IEventStatus = 'OPEN' | 'CLOSED';

export interface IEvent {
  id: number;
  name: string;
  date: string;
  status: IEventStatus;
};
