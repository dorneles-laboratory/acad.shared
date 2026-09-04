/**
 * Enums global object, exports all domains used within the system.
 */
export const AuthEnums = {
  LoginStatus: {
    Pending: 'PENDING',
    Authenticated: 'AUTHENTICATED',
    Unauthenticated: 'UNAUTHENTICATED',
  } as const,
};

export const UserRole = {
  Student: 'STUDENT',
  Admin: 'ADMIN',
  Advisor: 'ADVISOR',
} as const;

// Export the types to control values.
export type EnumLoginStatus =
  (typeof AuthEnums.LoginStatus)[keyof typeof AuthEnums.LoginStatus];

export type EnumUserRole = (typeof UserRole)[keyof typeof UserRole];
