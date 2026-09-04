import { z } from 'zod';
export { z } from 'zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
export { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

declare const registry: OpenAPIRegistry;

declare const loginSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
}, z.core.$strip>;
declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
declare const registerStudentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
    university: z.ZodOptional<z.ZodString>;
    campus: z.ZodOptional<z.ZodString>;
    course: z.ZodOptional<z.ZodString>;
    currentSemester: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        STUDENT: "STUDENT";
        ADMIN: "ADMIN";
        ADVISOR: "ADVISOR";
    }>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

/**
 * Enums global object, exports all domains used within the system.
 */
declare const AuthEnums: {
    LoginStatus: {
        readonly Pending: "PENDING";
        readonly Authenticated: "AUTHENTICATED";
        readonly Unauthenticated: "UNAUTHENTICATED";
    };
};
declare const UserRole: {
    readonly Student: "STUDENT";
    readonly Admin: "ADMIN";
    readonly Advisor: "ADVISOR";
};
type EnumLoginStatus = (typeof AuthEnums.LoginStatus)[keyof typeof AuthEnums.LoginStatus];
type EnumUserRole = (typeof UserRole)[keyof typeof UserRole];

interface TokenPayloadDTO {
    sub: string;
    role: string;
}
type LoginAuthDTO = z.infer<typeof loginSchema>;
type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;
type RegisterStudentDTO = z.infer<typeof registerStudentSchema>;
type UserResponseDTO = z.infer<typeof userResponseSchema>;

declare const StudentEnums: {
    Shift: {
        readonly Morning: "MANHA";
        readonly Afternoon: "TARDE";
        readonly Night: "NOITE";
        readonly FullTime: "INTEGRAL";
    };
};
type EnumStudentShift = (typeof StudentEnums.Shift)[keyof typeof StudentEnums.Shift];

declare const studentProfileSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    university: z.ZodString;
    campus: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    course: z.ZodString;
    currentSemester: z.ZodNumber;
    registrationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shift: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        MANHA: "MANHA";
        TARDE: "TARDE";
        NOITE: "NOITE";
        INTEGRAL: "INTEGRAL";
    }>>>;
    expectedGraduationYear: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    interests: z.ZodDefault<z.ZodArray<z.ZodString>>;
    academicGoals: z.ZodDefault<z.ZodArray<z.ZodString>>;
    lattesUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedinUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateStudentProfileSchema: z.ZodObject<{
    shift: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        MANHA: "MANHA";
        TARDE: "TARDE";
        NOITE: "NOITE";
        INTEGRAL: "INTEGRAL";
    }>>>>;
    university: z.ZodOptional<z.ZodString>;
    campus: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    course: z.ZodOptional<z.ZodString>;
    currentSemester: z.ZodOptional<z.ZodNumber>;
    registrationId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    expectedGraduationYear: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    interests: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    academicGoals: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    lattesUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    linkedinUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    githubUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;

type StudentProfileDTO = z.infer<typeof studentProfileSchema>;
type UpdateStudentProfileDTO = z.infer<typeof updateStudentProfileSchema>;

declare const OpportunityCategory: {
    readonly Scholarship: "SCHOLARSHIP";
    readonly ResearchGrant: "RESEARCH_GRANT";
    readonly TeachingAssistant: "TEACHING_ASSISTANT";
    readonly Extension: "EXTENSION";
    readonly Internship: "INTERNSHIP";
    readonly Exchange: "EXCHANGE";
    readonly GraduateProgram: "GRADUATE_PROGRAM";
    readonly Event: "EVENT";
    readonly Hackathon: "HACKATHON";
};
type EnumOpportunityCategory = (typeof OpportunityCategory)[keyof typeof OpportunityCategory];
declare const OpportunityStatus: {
    readonly Open: "OPEN";
    readonly Closed: "CLOSED";
    readonly Archived: "ARCHIVED";
};
type EnumOpportunityStatus = (typeof OpportunityStatus)[keyof typeof OpportunityStatus];
declare const OpportunityModality: {
    readonly Presential: "PRESENTIAL";
    readonly Remote: "REMOTE";
    readonly Hybrid: "HYBRID";
};
type EnumOpportunityModality = (typeof OpportunityModality)[keyof typeof OpportunityModality];
declare const AcademicLevel: {
    readonly Graduation: "GRADUATION";
    readonly PostGraduation: "POST_GRADUATION";
    readonly Technical: "TECHNICAL";
};
type EnumAcademicLevel = (typeof AcademicLevel)[keyof typeof AcademicLevel];
declare const ApplicationStatus: {
    readonly Draft: "DRAFT";
    readonly Submitted: "SUBMITTED";
    readonly Review: "REVIEW";
    readonly Accepted: "ACCEPTED";
    readonly Rejected: "REJECTED";
    readonly Withdrawn: "WITHDRAWN";
};
type EnumApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

declare const opportunitySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    institution: z.ZodString;
    institutionLogo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodString;
    category: z.ZodEnum<{
        SCHOLARSHIP: "SCHOLARSHIP";
        RESEARCH_GRANT: "RESEARCH_GRANT";
        TEACHING_ASSISTANT: "TEACHING_ASSISTANT";
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EXCHANGE: "EXCHANGE";
        GRADUATE_PROGRAM: "GRADUATE_PROGRAM";
        EVENT: "EVENT";
        HACKATHON: "HACKATHON";
    }>;
    modality: z.ZodDefault<z.ZodEnum<{
        PRESENTIAL: "PRESENTIAL";
        REMOTE: "REMOTE";
        HYBRID: "HYBRID";
    }>>;
    level: z.ZodDefault<z.ZodEnum<{
        GRADUATION: "GRADUATION";
        POST_GRADUATION: "POST_GRADUATION";
        TECHNICAL: "TECHNICAL";
    }>>;
    value: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    benefits: z.ZodDefault<z.ZodArray<z.ZodString>>;
    requirements: z.ZodDefault<z.ZodArray<z.ZodString>>;
    targetCourses: z.ZodDefault<z.ZodArray<z.ZodString>>;
    deadline: z.ZodString;
    publishedAt: z.ZodString;
    matchScore: z.ZodDefault<z.ZodNumber>;
    externalUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        OPEN: "OPEN";
        CLOSED: "CLOSED";
        ARCHIVED: "ARCHIVED";
    }>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const createOpportunitySchema: z.ZodObject<{
    value: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    description: z.ZodString;
    institution: z.ZodString;
    institutionLogo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodEnum<{
        SCHOLARSHIP: "SCHOLARSHIP";
        RESEARCH_GRANT: "RESEARCH_GRANT";
        TEACHING_ASSISTANT: "TEACHING_ASSISTANT";
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EXCHANGE: "EXCHANGE";
        GRADUATE_PROGRAM: "GRADUATE_PROGRAM";
        EVENT: "EVENT";
        HACKATHON: "HACKATHON";
    }>;
    modality: z.ZodDefault<z.ZodEnum<{
        PRESENTIAL: "PRESENTIAL";
        REMOTE: "REMOTE";
        HYBRID: "HYBRID";
    }>>;
    level: z.ZodDefault<z.ZodEnum<{
        GRADUATION: "GRADUATION";
        POST_GRADUATION: "POST_GRADUATION";
        TECHNICAL: "TECHNICAL";
    }>>;
    benefits: z.ZodDefault<z.ZodArray<z.ZodString>>;
    requirements: z.ZodDefault<z.ZodArray<z.ZodString>>;
    targetCourses: z.ZodDefault<z.ZodArray<z.ZodString>>;
    deadline: z.ZodString;
    publishedAt: z.ZodString;
    externalUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        OPEN: "OPEN";
        CLOSED: "CLOSED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
declare const updateOpportunitySchema: z.ZodObject<{
    value: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    institution: z.ZodOptional<z.ZodString>;
    institutionLogo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    category: z.ZodOptional<z.ZodEnum<{
        SCHOLARSHIP: "SCHOLARSHIP";
        RESEARCH_GRANT: "RESEARCH_GRANT";
        TEACHING_ASSISTANT: "TEACHING_ASSISTANT";
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EXCHANGE: "EXCHANGE";
        GRADUATE_PROGRAM: "GRADUATE_PROGRAM";
        EVENT: "EVENT";
        HACKATHON: "HACKATHON";
    }>>;
    modality: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        PRESENTIAL: "PRESENTIAL";
        REMOTE: "REMOTE";
        HYBRID: "HYBRID";
    }>>>;
    level: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        GRADUATION: "GRADUATION";
        POST_GRADUATION: "POST_GRADUATION";
        TECHNICAL: "TECHNICAL";
    }>>>;
    benefits: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    requirements: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    targetCourses: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    deadline: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    externalUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        OPEN: "OPEN";
        CLOSED: "CLOSED";
        ARCHIVED: "ARCHIVED";
    }>>>;
}, z.core.$strip>;
declare const applicationSchema: z.ZodObject<{
    id: z.ZodString;
    studentId: z.ZodString;
    opportunityId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        REVIEW: "REVIEW";
        ACCEPTED: "ACCEPTED";
        REJECTED: "REJECTED";
        WITHDRAWN: "WITHDRAWN";
    }>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    appliedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    opportunity: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        institution: z.ZodString;
        institutionLogo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodString;
        category: z.ZodEnum<{
            SCHOLARSHIP: "SCHOLARSHIP";
            RESEARCH_GRANT: "RESEARCH_GRANT";
            TEACHING_ASSISTANT: "TEACHING_ASSISTANT";
            EXTENSION: "EXTENSION";
            INTERNSHIP: "INTERNSHIP";
            EXCHANGE: "EXCHANGE";
            GRADUATE_PROGRAM: "GRADUATE_PROGRAM";
            EVENT: "EVENT";
            HACKATHON: "HACKATHON";
        }>;
        modality: z.ZodDefault<z.ZodEnum<{
            PRESENTIAL: "PRESENTIAL";
            REMOTE: "REMOTE";
            HYBRID: "HYBRID";
        }>>;
        level: z.ZodDefault<z.ZodEnum<{
            GRADUATION: "GRADUATION";
            POST_GRADUATION: "POST_GRADUATION";
            TECHNICAL: "TECHNICAL";
        }>>;
        value: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        benefits: z.ZodDefault<z.ZodArray<z.ZodString>>;
        requirements: z.ZodDefault<z.ZodArray<z.ZodString>>;
        targetCourses: z.ZodDefault<z.ZodArray<z.ZodString>>;
        deadline: z.ZodString;
        publishedAt: z.ZodString;
        matchScore: z.ZodDefault<z.ZodNumber>;
        externalUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodDefault<z.ZodEnum<{
            OPEN: "OPEN";
            CLOSED: "CLOSED";
            ARCHIVED: "ARCHIVED";
        }>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const createApplicationSchema: z.ZodObject<{
    opportunityId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        REVIEW: "REVIEW";
        ACCEPTED: "ACCEPTED";
        REJECTED: "REJECTED";
        WITHDRAWN: "WITHDRAWN";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateApplicationStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        DRAFT: "DRAFT";
        SUBMITTED: "SUBMITTED";
        REVIEW: "REVIEW";
        ACCEPTED: "ACCEPTED";
        REJECTED: "REJECTED";
        WITHDRAWN: "WITHDRAWN";
    }>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const opportunityFilterQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    modality: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodString>;
    minMatch: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;

type OpportunityDTO = z.infer<typeof opportunitySchema>;
type CreateOpportunityDTO = z.infer<typeof createOpportunitySchema>;
type UpdateOpportunityDTO = z.infer<typeof updateOpportunitySchema>;
type ApplicationDTO = z.infer<typeof applicationSchema>;
type CreateApplicationDTO = z.infer<typeof createApplicationSchema>;
type UpdateApplicationStatusDTO = z.infer<typeof updateApplicationStatusSchema>;
type OpportunityFilterQueryDTO = z.infer<typeof opportunityFilterQuerySchema>;

declare const ExperienceType: {
    readonly Project: "PROJECT";
    readonly Internship: "INTERNSHIP";
    readonly Research: "RESEARCH";
    readonly Extension: "EXTENSION";
    readonly Teaching: "TEACHING";
    readonly Competition: "COMPETITION";
    readonly Event: "EVENT";
};
type EnumExperienceType = (typeof ExperienceType)[keyof typeof ExperienceType];
declare const ExperienceStatus: {
    readonly InProgress: "IN_PROGRESS";
    readonly Completed: "COMPLETED";
    readonly Paused: "PAUSED";
};
type EnumExperienceStatus = (typeof ExperienceStatus)[keyof typeof ExperienceStatus];

declare const experienceSchema: z.ZodObject<{
    id: z.ZodString;
    studentId: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<{
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EVENT: "EVENT";
        PROJECT: "PROJECT";
        RESEARCH: "RESEARCH";
        TEACHING: "TEACHING";
        COMPETITION: "COMPETITION";
    }>;
    status: z.ZodDefault<z.ZodEnum<{
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        PAUSED: "PAUSED";
    }>>;
    role: z.ZodString;
    institution: z.ZodString;
    advisor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    weeklyHours: z.ZodDefault<z.ZodNumber>;
    totalHours: z.ZodDefault<z.ZodNumber>;
    description: z.ZodString;
    skills: z.ZodDefault<z.ZodArray<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const createExperienceSchema: z.ZodObject<{
    type: z.ZodEnum<{
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EVENT: "EVENT";
        PROJECT: "PROJECT";
        RESEARCH: "RESEARCH";
        TEACHING: "TEACHING";
        COMPETITION: "COMPETITION";
    }>;
    title: z.ZodString;
    description: z.ZodString;
    role: z.ZodString;
    institution: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        PAUSED: "PAUSED";
    }>>;
    advisor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    weeklyHours: z.ZodDefault<z.ZodNumber>;
    skills: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
declare const updateExperienceSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        EXTENSION: "EXTENSION";
        INTERNSHIP: "INTERNSHIP";
        EVENT: "EVENT";
        PROJECT: "PROJECT";
        RESEARCH: "RESEARCH";
        TEACHING: "TEACHING";
        COMPETITION: "COMPETITION";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    institution: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        PAUSED: "PAUSED";
    }>>>;
    advisor: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    weeklyHours: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    skills: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;

type ExperienceDTO = z.infer<typeof experienceSchema>;
type CreateExperienceDTO = z.infer<typeof createExperienceSchema>;
type UpdateExperienceDTO = z.infer<typeof updateExperienceSchema>;

declare const MemoryFormat: {
    readonly Text: "TEXT";
    readonly Audio: "AUDIO";
    readonly Image: "IMAGE";
    readonly Multimedia: "MULTIMEDIA";
};
type EnumMemoryFormat = (typeof MemoryFormat)[keyof typeof MemoryFormat];
declare const MemoryType: {
    readonly Aprendizado: "APRENDIZADO";
    readonly Reflexao: "REFLEXAO";
    readonly Insight: "INSIGHT";
    readonly Conquista: "CONQUISTA";
    readonly Duvida: "DUVIDA";
};
type EnumMemoryType = (typeof MemoryType)[keyof typeof MemoryType];

declare const memorySchema: z.ZodObject<{
    id: z.ZodString;
    studentId: z.ZodString;
    title: z.ZodDefault<z.ZodString>;
    content: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<{
        APRENDIZADO: "APRENDIZADO";
        REFLEXAO: "REFLEXAO";
        INSIGHT: "INSIGHT";
        CONQUISTA: "CONQUISTA";
        DUVIDA: "DUVIDA";
    }>>;
    format: z.ZodDefault<z.ZodEnum<{
        TEXT: "TEXT";
        AUDIO: "AUDIO";
        IMAGE: "IMAGE";
        MULTIMEDIA: "MULTIMEDIA";
    }>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    course: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    experienceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audioUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audioDuration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    date: z.ZodString;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const createMemorySchema: z.ZodObject<{
    date: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<{
        APRENDIZADO: "APRENDIZADO";
        REFLEXAO: "REFLEXAO";
        INSIGHT: "INSIGHT";
        CONQUISTA: "CONQUISTA";
        DUVIDA: "DUVIDA";
    }>>;
    format: z.ZodDefault<z.ZodEnum<{
        TEXT: "TEXT";
        AUDIO: "AUDIO";
        IMAGE: "IMAGE";
        MULTIMEDIA: "MULTIMEDIA";
    }>>;
    title: z.ZodDefault<z.ZodString>;
    content: z.ZodString;
    course: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    experienceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audioUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    audioDuration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
declare const updateMemorySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        APRENDIZADO: "APRENDIZADO";
        REFLEXAO: "REFLEXAO";
        INSIGHT: "INSIGHT";
        CONQUISTA: "CONQUISTA";
        DUVIDA: "DUVIDA";
    }>>>;
    format: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        TEXT: "TEXT";
        AUDIO: "AUDIO";
        IMAGE: "IMAGE";
        MULTIMEDIA: "MULTIMEDIA";
    }>>>;
    title: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    course: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    experienceId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    audioUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    audioDuration: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
}, z.core.$strip>;

type AcademicMemoryDTO = z.infer<typeof memorySchema>;
type CreateMemoryDTO = z.infer<typeof createMemorySchema>;
type UpdateMemoryDTO = z.infer<typeof updateMemorySchema>;

declare const TransactionType: {
    readonly StripePurchase: "STRIPE_PURCHASE";
    readonly AiUsage: "AI_USAGE";
    readonly CommunityDonationOut: "COMMUNITY_DONATION_OUT";
    readonly CommunityDonationIn: "COMMUNITY_DONATION_IN";
    readonly WelcomeBonus: "WELCOME_BONUS";
    readonly AdminGrant: "ADMIN_GRANT";
};
type EnumTransactionType = (typeof TransactionType)[keyof typeof TransactionType];
declare const SolidaryStatus: {
    readonly None: "NONE";
    readonly Pending: "PENDING";
    readonly Approved: "APPROVED";
    readonly Rejected: "REJECTED";
};
type EnumSolidaryStatus = (typeof SolidaryStatus)[keyof typeof SolidaryStatus];

declare const userWalletSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    tokenBalance: z.ZodDefault<z.ZodNumber>;
    isSolidaryBeneficiary: z.ZodDefault<z.ZodBoolean>;
    solidaryStatus: z.ZodDefault<z.ZodEnum<{
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        NONE: "NONE";
        APPROVED: "APPROVED";
    }>>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const tokenTransactionSchema: z.ZodObject<{
    id: z.ZodString;
    walletId: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<{
        STRIPE_PURCHASE: "STRIPE_PURCHASE";
        AI_USAGE: "AI_USAGE";
        COMMUNITY_DONATION_OUT: "COMMUNITY_DONATION_OUT";
        COMMUNITY_DONATION_IN: "COMMUNITY_DONATION_IN";
        WELCOME_BONUS: "WELCOME_BONUS";
        ADMIN_GRANT: "ADMIN_GRANT";
    }>;
    description: z.ZodString;
    createdAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const simulateRechargeSchema: z.ZodObject<{
    amountReals: z.ZodNumber;
}, z.core.$strip>;
declare const rechargeSimulationResultSchema: z.ZodObject<{
    amountReals: z.ZodNumber;
    netAmountAfterFees: z.ZodNumber;
    tokensGenerated: z.ZodNumber;
    bonusTokens: z.ZodNumber;
    totalTokens: z.ZodNumber;
    purchasingPower: z.ZodObject<{
        opportunitiesSearches: z.ZodNumber;
        aiChatQuestions: z.ZodNumber;
        lattesAudits: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const createCheckoutSessionSchema: z.ZodObject<{
    amountReals: z.ZodNumber;
    menuItemName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

type UserWalletDTO = z.infer<typeof userWalletSchema>;
type TokenTransactionDTO = z.infer<typeof tokenTransactionSchema>;
type SimulateRechargeDTO = z.infer<typeof simulateRechargeSchema>;
type RechargeSimulationResultDTO = z.infer<typeof rechargeSimulationResultSchema>;
type CreateCheckoutSessionDTO = z.infer<typeof createCheckoutSessionSchema>;

declare const uploadResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;

type UploadResponseDTO = z.infer<typeof uploadResponseSchema>;

declare const rfc7807ErrorSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    status: z.ZodNumber;
    detail: z.ZodOptional<z.ZodString>;
    instance: z.ZodOptional<z.ZodString>;
    errors: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
declare const paginationMetaSchema: z.ZodObject<{
    totalItems: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    itemsPerPage: z.ZodNumber;
}, z.core.$strip>;
declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
declare function createPaginatedResponseSchema(schema: z.ZodTypeAny, schemaName: string): z.ZodObject<{
    data: z.ZodArray<z.ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>>;
    meta: z.ZodObject<{
        totalItems: z.ZodNumber;
        totalPages: z.ZodNumber;
        currentPage: z.ZodNumber;
        itemsPerPage: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const ipv4Schema: z.ZodString;

type ProblemDetailsDTO = z.infer<typeof rfc7807ErrorSchema>;
type PaginationMetaDTO = z.infer<typeof paginationMetaSchema>;
type PaginationQueryDTO = z.infer<typeof paginationSchema>;
interface PaginatedResultDTO<T> {
    data: T[];
    meta: PaginationMetaDTO;
}

declare const SystemStatus: {
    readonly Active: "ACTIVE";
    readonly Inactive: "INACTIVE";
};
type EnumSystemStatus = (typeof SystemStatus)[keyof typeof SystemStatus];

/**
 * Converte string "HH:mm" em minutos totais desde a meia-noite.
 */
declare function timeStringToMinutes(timeString: string): number | null;
/**
 * Converte minutos totais para decimal (ex: 90min -> 1.5).
 */
declare function minutesToDecimalHours(minutes: number): number;
/**
 * Formata minutos para exibição legível "Xh Ym".
 */
declare function formatMinutesToReadable(minutes: number): string;

export { AcademicLevel, type AcademicMemoryDTO, type ApplicationDTO, ApplicationStatus, AuthEnums, type CreateApplicationDTO, type CreateCheckoutSessionDTO, type CreateExperienceDTO, type CreateMemoryDTO, type CreateOpportunityDTO, type EnumAcademicLevel, type EnumApplicationStatus, type EnumExperienceStatus, type EnumExperienceType, type EnumLoginStatus, type EnumMemoryFormat, type EnumMemoryType, type EnumOpportunityCategory, type EnumOpportunityModality, type EnumOpportunityStatus, type EnumSolidaryStatus, type EnumStudentShift, type EnumSystemStatus, type EnumTransactionType, type EnumUserRole, type ExperienceDTO, ExperienceStatus, ExperienceType, type LoginAuthDTO, MemoryFormat, MemoryType, OpportunityCategory, type OpportunityDTO, type OpportunityFilterQueryDTO, OpportunityModality, OpportunityStatus, type PaginatedResultDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type RechargeSimulationResultDTO, type RefreshTokenDTO, type RegisterStudentDTO, type SimulateRechargeDTO, SolidaryStatus, StudentEnums, type StudentProfileDTO, SystemStatus, type TokenPayloadDTO, type TokenTransactionDTO, TransactionType, type UpdateApplicationStatusDTO, type UpdateExperienceDTO, type UpdateMemoryDTO, type UpdateOpportunityDTO, type UpdateStudentProfileDTO, type UploadResponseDTO, type UserResponseDTO, UserRole, type UserWalletDTO, applicationSchema, createApplicationSchema, createCheckoutSessionSchema, createExperienceSchema, createMemorySchema, createOpportunitySchema, createPaginatedResponseSchema, experienceSchema, formatMinutesToReadable, ipv4Schema, loginSchema, memorySchema, minutesToDecimalHours, opportunityFilterQuerySchema, opportunitySchema, paginationMetaSchema, paginationSchema, rechargeSimulationResultSchema, refreshTokenSchema, registerStudentSchema, registry, rfc7807ErrorSchema, simulateRechargeSchema, studentProfileSchema, timeStringToMinutes, tokenTransactionSchema, updateApplicationStatusSchema, updateExperienceSchema, updateMemorySchema, updateOpportunitySchema, updateStudentProfileSchema, uploadResponseSchema, userResponseSchema, userWalletSchema };
