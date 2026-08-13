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
    car: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updatePropertySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    car: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>>;
}, z.core.$strip>;
declare const propertyResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    location: z.ZodString;
    car: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>;
    ownerId: z.ZodString;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        isActive: z.ZodBoolean;
        created_at: z.ZodCoercedDate<unknown>;
        updated_at: z.ZodCoercedDate<unknown>;
    }, z.core.$strip>>;
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
    status: z.ZodOptional<z.ZodEnum<{
        readonly Active: "ACTIVE";
        readonly Configure: "CONFIGURE";
    }>>;
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

declare const coordinateSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, z.core.$strip>;
declare const createFieldSchema: z.ZodObject<{
    name: z.ZodString;
    soilType: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strip>>;
    propertyId: z.ZodString;
}, z.core.$strip>;
declare const updateFieldSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    soilType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, z.core.$strip>>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>>;
}, z.core.$strip>;
declare const fieldResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    soilType: z.ZodNullable<z.ZodString>;
    area: z.ZodNullable<z.ZodNumber>;
    perimeter: z.ZodNullable<z.ZodNumber>;
    coordinates: z.ZodNullable<z.ZodAny>;
    status: z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>;
    propertyId: z.ZodString;
    property: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        location: z.ZodString;
        car: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            readonly Active: "ACTIVE";
            readonly Configure: "CONFIGURE";
        }>;
        ownerId: z.ZodString;
        owner: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            isActive: z.ZodBoolean;
            created_at: z.ZodCoercedDate<unknown>;
            updated_at: z.ZodCoercedDate<unknown>;
        }, z.core.$strip>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const fieldIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const fieldQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    propertyId: z.ZodOptional<z.ZodString>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Ready: "READY";
        readonly Processing: "PROCESSING";
        readonly Waiting: "WAITING";
    }>>;
}, z.core.$strip>;

declare const FieldStatus: {
    readonly Ready: "READY";
    readonly Processing: "PROCESSING";
    readonly Waiting: "WAITING";
};
type EnumFieldStatus = (typeof FieldStatus)[keyof typeof FieldStatus];

type CreateFieldDTO = z.infer<typeof createFieldSchema>;
type UpdateFieldDTO = z.infer<typeof updateFieldSchema>;
type FieldResponseDTO = z.infer<typeof fieldResponseSchema>;
type FieldIdDTO = z.infer<typeof fieldIdSchema>;
type FieldQueryDTO = z.infer<typeof fieldQuerySchema>;
type PaginatedFieldsDTO = PaginatedResultDTO<FieldResponseDTO>;

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

export { AuthEnums, type CreateFieldDTO, type CreatePropertyDTO, type CreateUserDTO, type EnumFieldStatus, type EnumLoginStatus, type EnumPropertyStatus, type FieldIdDTO, type FieldQueryDTO, type FieldResponseDTO, FieldStatus, type LoginAuthDTO, type PaginatedFieldsDTO, type PaginatedPropertiesDTO, type PaginatedResultDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type PropertyIdDTO, type PropertyQueryDTO, type PropertyResponseDTO, PropertyStatus, type TokenPayloadDTO, type UpdateFieldDTO, type UpdatePropertyDTO, type UpdateUserDTO, type UserIdDTO, type UserResponseDTO, coordinateSchema, createFieldSchema, createPaginatedResponseSchema, createPropertySchema, createUserSchema, fieldIdSchema, fieldQuerySchema, fieldResponseSchema, formatMinutesToReadable, loginSchema, minutesToDecimalHours, paginationMetaSchema, paginationSchema, propertyIdSchema, propertyQuerySchema, propertyResponseSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, timeStringToMinutes, updateFieldSchema, updatePropertySchema, updateUserSchema, userIdSchema, userResponseSchema };
