/**
 * Enums global object, exports all domains used within the system.
 */
export const UserEnums = {
  UserRole: {
    Admin: 'ADMIN',
    User: 'USER',
  } as const,
};

// Export the types to control values.
export type EnumUserRole =
  (typeof UserEnums.UserRole)[keyof typeof UserEnums.UserRole];
