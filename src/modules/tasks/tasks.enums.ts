export const TaskStatus = {
  Backlog: 'BACKLOG',
  Pending: 'PENDING',
  InProgress: 'IN_PROGRESS',
  InReview: 'IN_REVIEW',
  Completed: 'COMPLETED',
  Archived: 'ARCHIVED',
} as const;

export type EnumTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  Urgent: 'URGENT',
} as const;

export type EnumTaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const TaskRole = {
  Owner: 'OWNER',
  Admin: 'ADMIN',
  Member: 'MEMBER',
  Viewer: 'VIEWER',
} as const;

export type EnumTaskRole = (typeof TaskRole)[keyof typeof TaskRole];
