export const SystemStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const;

export type EnumSystemStatus = (typeof SystemStatus)[keyof typeof SystemStatus];
