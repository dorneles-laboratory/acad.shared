export const ProjectStatus = {
  Draft: 'DRAFT',
  Active: 'ACTIVE',
  OnHold: 'ON_HOLD',
  Completed: 'COMPLETED',
  Canceled: 'CANCELLED',
} as const;

export type EnumProjectStatus =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectPriority = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  Critical: 'CRITICAL',
} as const;

export type EnumProjectPriority =
  (typeof ProjectPriority)[keyof typeof ProjectPriority];

export const ProjectRole = {
  Owner: 'OWNER',
  Admin: 'ADMIN',
  Member: 'MEMBER',
  Viewer: 'VIEWER',
} as const;

export type EnumProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole];
