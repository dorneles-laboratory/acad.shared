export const FieldStatus = {
  Ready: 'READY',
  Processing: 'PROCESSING',
  Waiting: 'WAITING',
} as const;

export type EnumFieldStatus = (typeof FieldStatus)[keyof typeof FieldStatus];
