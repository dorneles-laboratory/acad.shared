export const ExperienceType = {
  Project: 'PROJECT',
  Internship: 'INTERNSHIP',
  Research: 'RESEARCH',
  Extension: 'EXTENSION',
  Teaching: 'TEACHING',
  Competition: 'COMPETITION',
  Event: 'EVENT',
} as const;

export type EnumExperienceType =
  (typeof ExperienceType)[keyof typeof ExperienceType];

export const ExperienceStatus = {
  InProgress: 'IN_PROGRESS',
  Completed: 'COMPLETED',
  Paused: 'PAUSED',
} as const;

export type EnumExperienceStatus =
  (typeof ExperienceStatus)[keyof typeof ExperienceStatus];
