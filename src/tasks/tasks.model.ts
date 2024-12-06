export enum TaskStatus {
  'OPEN',
  'PENDING',
  'COMPLETED',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
