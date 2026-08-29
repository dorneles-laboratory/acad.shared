export const ToolkitEnums = {
  Category: {
    CarrerAndResume: 'CAREER_AND_RESUME',
    ResearchAndPublication: 'RESEARCH_AND_PUBLICATION',
    AcademicPlanning: 'ACADEMIC_PLANNING',
    Opportunities: 'OPPORTUNITIES',
    Documentation: 'DOCUMENTATION',
    AcademicIntelligence: 'ACADEMIC_INTELLIGENCE',
  } as const,

  Status: {
    Available: 'AVAILABLE',
    ComingSoon: 'COMING_SOON',
  } as const,
};

export type EnumToolkitCategory =
  (typeof ToolkitEnums.Category)[keyof typeof ToolkitEnums.Category];

export type EnumToolkitStatus =
  (typeof ToolkitEnums.Status)[keyof typeof ToolkitEnums.Status];
