export const PropertyStatus = {
  Active: 'ACTIVE',
  Configure: 'CONFIGURE',
} as const;

export type EnumPropertyStatus =
  (typeof PropertyStatus)[keyof typeof PropertyStatus];
