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
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        readonly SuperAdmin: "SUPER_ADMIN";
        readonly CenterAdmin: "CENTER_ADMIN";
        readonly Publisher: "PUBLISHER";
    }>>;
    centerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        readonly SuperAdmin: "SUPER_ADMIN";
        readonly CenterAdmin: "CENTER_ADMIN";
        readonly Publisher: "PUBLISHER";
    }>>;
    centerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        readonly SuperAdmin: "SUPER_ADMIN";
        readonly CenterAdmin: "CENTER_ADMIN";
        readonly Publisher: "PUBLISHER";
    }>;
    isActive: z.ZodBoolean;
    centerId: z.ZodNullable<z.ZodString>;
    center: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        acronym: z.ZodString;
        color: z.ZodString;
        status: z.ZodEnum<{
            readonly Active: "ACTIVE";
            readonly Inactive: "INACTIVE";
        }>;
        buildings: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodNullable<z.ZodString>;
            status: z.ZodEnum<{
                readonly Active: "ACTIVE";
                readonly Inactive: "INACTIVE";
            }>;
            centerId: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
        }, z.core.$strip>>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    created_at: z.ZodCoercedDate<unknown>;
    updated_at: z.ZodCoercedDate<unknown>;
    temporaryPassword: z.ZodOptional<z.ZodString>;
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

declare const UserRole: {
    readonly SuperAdmin: "SUPER_ADMIN";
    readonly CenterAdmin: "CENTER_ADMIN";
    readonly Publisher: "PUBLISHER";
};
type EnumUserRole = (typeof UserRole)[keyof typeof UserRole];

declare const createBuildingSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    centerId: z.ZodString;
}, z.core.$strip>;
declare const updateBuildingSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    centerId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>>;
}, z.core.$strip>;
declare const buildingResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>;
    centerId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const buildingIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const buildingQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    centerId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>>;
}, z.core.$strip>;

type CreateBuildingDTO = z.infer<typeof createBuildingSchema>;
type UpdateBuildingDTO = z.infer<typeof updateBuildingSchema>;
type BuildingResponseDTO = z.infer<typeof buildingResponseSchema>;
type BuildingIdDTO = z.infer<typeof buildingIdSchema>;
type BuildingQueryDTO = z.infer<typeof buildingQuerySchema>;
type PaginatedBuildingsDTO = PaginatedResultDTO<BuildingResponseDTO>;

declare const createCenterSchema: z.ZodObject<{
    name: z.ZodString;
    acronym: z.ZodString;
    color: z.ZodString;
}, z.core.$strip>;
declare const updateCenterSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    acronym: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>>;
}, z.core.$strip>;
declare const centerResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    acronym: z.ZodString;
    color: z.ZodString;
    status: z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>;
    buildings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            readonly Active: "ACTIVE";
            readonly Inactive: "INACTIVE";
        }>;
        centerId: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const centerIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const centerQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Inactive: "INACTIVE";
    }>>;
    includeBuildings: z.ZodDefault<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
}, z.core.$strip>;

type CreateCenterDTO = z.infer<typeof createCenterSchema>;
type UpdateCenterDTO = z.infer<typeof updateCenterSchema>;
type CenterResponseDTO = z.infer<typeof centerResponseSchema>;
type CenterIdDTO = z.infer<typeof centerIdSchema>;
type CenterQueryDTO = z.infer<typeof centerQuerySchema>;
type PaginatedCentersDTO = PaginatedResultDTO<CenterResponseDTO>;

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

export { AuthEnums, type BuildingIdDTO, type BuildingQueryDTO, type BuildingResponseDTO, type CenterIdDTO, type CenterQueryDTO, type CenterResponseDTO, type CreateBuildingDTO, type CreateCenterDTO, type CreateUserDTO, type EnumLoginStatus, type EnumSystemStatus, type EnumUserRole, type LoginAuthDTO, type PaginatedBuildingsDTO, type PaginatedCentersDTO, type PaginatedResultDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, SystemStatus, type TokenPayloadDTO, type UpdateBuildingDTO, type UpdateCenterDTO, type UpdateUserDTO, type UserIdDTO, type UserResponseDTO, UserRole, buildingIdSchema, buildingQuerySchema, buildingResponseSchema, centerIdSchema, centerQuerySchema, centerResponseSchema, createBuildingSchema, createCenterSchema, createPaginatedResponseSchema, createUserSchema, formatMinutesToReadable, loginSchema, minutesToDecimalHours, paginationMetaSchema, paginationSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, timeStringToMinutes, updateBuildingSchema, updateCenterSchema, updateUserSchema, userIdSchema, userResponseSchema };
