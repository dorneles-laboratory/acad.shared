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
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>>;
    password: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    isActive: z.ZodBoolean;
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

declare const createPropertySchema: z.ZodObject<{
    name: z.ZodString;
    location: z.ZodString;
    car: z.ZodString;
}, z.core.$strip>;
declare const updatePropertySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    car: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>>;
}, z.core.$strip>;
declare const propertyResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    location: z.ZodString;
    car: z.ZodString;
    status: z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>;
    ownerId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const propertyIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const propertyQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>, z.ZodLiteral<"all">]>>>;
}, z.core.$strip>;

declare const PropertyStatus: {
    readonly Active: "ACTIVE";
    readonly Configure: "CONFIGURE";
};
type EnumPropertyStatus = (typeof PropertyStatus)[keyof typeof PropertyStatus];

type CreatePropertyDTO = z.infer<typeof createPropertySchema>;
type UpdatePropertyDTO = z.infer<typeof updatePropertySchema>;
type PropertyResponseDTO = z.infer<typeof propertyResponseSchema>;
type PropertyIdDTO = z.infer<typeof propertyIdSchema>;
type PropertyQueryDTO = z.infer<typeof propertyQuerySchema>;
type PaginatedPropertiesDTO = PaginatedResultDTO<PropertyResponseDTO>;

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

export { AuthEnums, type CreatePropertyDTO, type CreateUserDTO, type EnumLoginStatus, type EnumPropertyStatus, type LoginAuthDTO, type PaginatedPropertiesDTO, type PaginatedResultDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type PropertyIdDTO, type PropertyQueryDTO, type PropertyResponseDTO, PropertyStatus, type TokenPayloadDTO, type UpdatePropertyDTO, type UpdateUserDTO, type UserIdDTO, type UserResponseDTO, createPaginatedResponseSchema, createPropertySchema, createUserSchema, formatMinutesToReadable, loginSchema, minutesToDecimalHours, paginationMetaSchema, paginationSchema, propertyIdSchema, propertyQuerySchema, propertyResponseSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, timeStringToMinutes, updatePropertySchema, updateUserSchema, userIdSchema, userResponseSchema };
