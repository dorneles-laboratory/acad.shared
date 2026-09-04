export const StudentEnums = {
  Shift: {
    Morning: 'MANHA',
    Afternoon: 'TARDE',
    Night: 'NOITE',
    FullTime: 'INTEGRAL',
  } as const,
};

export type EnumStudentShift =
  (typeof StudentEnums.Shift)[keyof typeof StudentEnums.Shift];
