export const OpportunityCategory = {
  Scholarship: 'SCHOLARSHIP',
  ResearchGrant: 'RESEARCH_GRANT',
  TeachingAssistant: 'TEACHING_ASSISTANT',
  Extension: 'EXTENSION',
  Internship: 'INTERNSHIP',
  Exchange: 'EXCHANGE',
  GraduateProgram: 'GRADUATE_PROGRAM',
  Event: 'EVENT',
  Hackathon: 'HACKATHON',
} as const;

export type EnumOpportunityCategory =
  (typeof OpportunityCategory)[keyof typeof OpportunityCategory];

export const OpportunityStatus = {
  Open: 'OPEN',
  Closed: 'CLOSED',
  Archived: 'ARCHIVED',
} as const;

export type EnumOpportunityStatus =
  (typeof OpportunityStatus)[keyof typeof OpportunityStatus];

export const OpportunityModality = {
  Presential: 'PRESENTIAL',
  Remote: 'REMOTE',
  Hybrid: 'HYBRID',
} as const;

export type EnumOpportunityModality =
  (typeof OpportunityModality)[keyof typeof OpportunityModality];

export const AcademicLevel = {
  Graduation: 'GRADUATION',
  PostGraduation: 'POST_GRADUATION',
  Technical: 'TECHNICAL',
} as const;

export type EnumAcademicLevel =
  (typeof AcademicLevel)[keyof typeof AcademicLevel];

export const ApplicationStatus = {
  Draft: 'DRAFT',
  Submitted: 'SUBMITTED',
  Review: 'REVIEW',
  Accepted: 'ACCEPTED',
  Rejected: 'REJECTED',
  Withdrawn: 'WITHDRAWN',
} as const;

export type EnumApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
