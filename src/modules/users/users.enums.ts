export const UserRole = {
  SuperAdmin: 'SUPER_ADMIN',
  CenterAdmin: 'CENTER_ADMIN',
  Publisher: 'PUBLISHER',
} as const;

export type EnumUserRole = (typeof UserRole)[keyof typeof UserRole];
