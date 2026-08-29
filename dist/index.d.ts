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
type EnumLoginStatus = (typeof AuthEnums.LoginStatus)[keyof typeof AuthEnums.LoginStatus];

interface TokenPayloadDTO {
    sub: string;
}
type LoginAuthDTO = z.infer<typeof loginSchema>;

declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>;
    password: z.ZodString;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly Admin: "ADMIN";
        readonly User: "USER";
    }>>>;
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>>;
    password: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    role: z.ZodOptional<z.ZodEnum<{
        readonly Admin: "ADMIN";
        readonly User: "USER";
    }>>;
    imageUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    isActive: z.ZodBoolean;
    imageUrl: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<{
        readonly Admin: "ADMIN";
        readonly User: "USER";
    }>;
    created_at: z.ZodCoercedDate<unknown>;
    updated_at: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
declare const userIdSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;

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

type ProblemDetailsDTO = z.infer<typeof rfc7807ErrorSchema>;
type PaginationMetaDTO = z.infer<typeof paginationMetaSchema>;
type PaginationQueryDTO = z.infer<typeof paginationSchema>;
interface PaginatedResultDTO<T> {
    data: T[];
    meta: PaginationMetaDTO;
}

type CreateUserDTO = z.infer<typeof createUserSchema>;
type UpdateUserDTO = z.infer<typeof updateUserSchema>;
type UserIdDTO = z.infer<typeof userIdSchema>;
type UserResponseDTO = z.infer<typeof userResponseSchema>;
type PaginatedUsersDTO = PaginatedResultDTO<UserResponseDTO>;

/**
 * Enums global object, exports all domains used within the system.
 */
declare const UserEnums: {
    UserRole: {
        readonly Admin: "ADMIN";
        readonly User: "USER";
    };
};
type EnumUserRole = (typeof UserEnums.UserRole)[keyof typeof UserEnums.UserRole];

declare const createToolSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    tagline: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<{
        readonly CarrerAndResume: "CAREER_AND_RESUME";
        readonly ResearchAndPublication: "RESEARCH_AND_PUBLICATION";
        readonly AcademicPlanning: "ACADEMIC_PLANNING";
        readonly Opportunities: "OPPORTUNITIES";
        readonly Documentation: "DOCUMENTATION";
        readonly AcademicIntelligence: "ACADEMIC_INTELLIGENCE";
    }>;
    status: z.ZodEnum<{
        readonly Available: "AVAILABLE";
        readonly ComingSoon: "COMING_SOON";
    }>;
    iconName: z.ZodString;
    isNew: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
declare const updateToolSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    tagline: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<{
        readonly CarrerAndResume: "CAREER_AND_RESUME";
        readonly ResearchAndPublication: "RESEARCH_AND_PUBLICATION";
        readonly AcademicPlanning: "ACADEMIC_PLANNING";
        readonly Opportunities: "OPPORTUNITIES";
        readonly Documentation: "DOCUMENTATION";
        readonly AcademicIntelligence: "ACADEMIC_INTELLIGENCE";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Available: "AVAILABLE";
        readonly ComingSoon: "COMING_SOON";
    }>>;
    iconName: z.ZodOptional<z.ZodString>;
    isNew: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>;
}, z.core.$strip>;
declare const toolIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const toolResponseSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    tagline: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<{
        readonly CarrerAndResume: "CAREER_AND_RESUME";
        readonly ResearchAndPublication: "RESEARCH_AND_PUBLICATION";
        readonly AcademicPlanning: "ACADEMIC_PLANNING";
        readonly Opportunities: "OPPORTUNITIES";
        readonly Documentation: "DOCUMENTATION";
        readonly AcademicIntelligence: "ACADEMIC_INTELLIGENCE";
    }>;
    status: z.ZodEnum<{
        readonly Available: "AVAILABLE";
        readonly ComingSoon: "COMING_SOON";
    }>;
    iconName: z.ZodString;
    isNew: z.ZodBoolean;
    uses: z.ZodOptional<z.ZodNumber>;
    interested: z.ZodOptional<z.ZodNumber>;
    lastUsed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pinned: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;

declare const ToolkitEnums: {
    Category: {
        readonly CarrerAndResume: "CAREER_AND_RESUME";
        readonly ResearchAndPublication: "RESEARCH_AND_PUBLICATION";
        readonly AcademicPlanning: "ACADEMIC_PLANNING";
        readonly Opportunities: "OPPORTUNITIES";
        readonly Documentation: "DOCUMENTATION";
        readonly AcademicIntelligence: "ACADEMIC_INTELLIGENCE";
    };
    Status: {
        readonly Available: "AVAILABLE";
        readonly ComingSoon: "COMING_SOON";
    };
};
type EnumToolkitCategory = (typeof ToolkitEnums.Category)[keyof typeof ToolkitEnums.Category];
type EnumToolkitStatus = (typeof ToolkitEnums.Status)[keyof typeof ToolkitEnums.Status];

type CreateToolDTO = z.infer<typeof createToolSchema>;
type UpdateToolDTO = z.infer<typeof updateToolSchema>;
type ToolIdDTO = z.infer<typeof toolIdSchema>;
type ToolResponseDTO = z.infer<typeof toolResponseSchema>;
type PaginatedToolsDTO = PaginatedResultDTO<ToolResponseDTO>;

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

export { AuthEnums, type CreateToolDTO, type CreateUserDTO, type EnumLoginStatus, type EnumToolkitCategory, type EnumToolkitStatus, type EnumUserRole, type LoginAuthDTO, type PaginatedResultDTO, type PaginatedToolsDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type TokenPayloadDTO, type ToolIdDTO, type ToolResponseDTO, ToolkitEnums, type UpdateToolDTO, type UpdateUserDTO, UserEnums, type UserIdDTO, type UserResponseDTO, createPaginatedResponseSchema, createToolSchema, createUserSchema, formatMinutesToReadable, loginSchema, minutesToDecimalHours, paginationMetaSchema, paginationSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, timeStringToMinutes, toolIdSchema, toolResponseSchema, updateToolSchema, updateUserSchema, userIdSchema, userResponseSchema };
