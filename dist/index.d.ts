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
    imageUrl: z.ZodOptional<z.ZodString>;
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
    imageUrl: z.ZodNullable<z.ZodString>;
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
            latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
declare const ipv4Schema: z.ZodString;

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
    latitude: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
declare const updateBuildingSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    centerId: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
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
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
    includeScreens: z.ZodDefault<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
}, z.core.$strip>;

type CreateCenterDTO = z.infer<typeof createCenterSchema>;
type UpdateCenterDTO = z.infer<typeof updateCenterSchema>;
type CenterResponseDTO = z.infer<typeof centerResponseSchema>;
type CenterIdDTO = z.infer<typeof centerIdSchema>;
type CenterQueryDTO = z.infer<typeof centerQuerySchema>;
type PaginatedCentersDTO = PaginatedResultDTO<CenterResponseDTO>;

declare const screenIpSchema: z.ZodNullable<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">, z.ZodNull]>>>;
declare const createScreenSchema: z.ZodObject<{
    name: z.ZodString;
    ip: z.ZodNullable<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">, z.ZodNull]>>>;
    buildingId: z.ZodString;
    isPaired: z.ZodDefault<z.ZodBoolean>;
    isPrivate: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
declare const updateScreenSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    ip: z.ZodNullable<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">, z.ZodNull]>>>;
    buildingId: z.ZodOptional<z.ZodString>;
    isPaired: z.ZodOptional<z.ZodBoolean>;
    isPrivate: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Online: "ONLINE";
        readonly Offline: "OFFLINE";
        readonly Syncing: "SYNCING";
    }>>;
    pin: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const screenResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    ip: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<{
        readonly Online: "ONLINE";
        readonly Offline: "OFFLINE";
        readonly Syncing: "SYNCING";
    }>;
    buildingId: z.ZodString;
    isPaired: z.ZodBoolean;
    isPrivate: z.ZodBoolean;
    building: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            readonly Active: "ACTIVE";
            readonly Inactive: "INACTIVE";
        }>;
        centerId: z.ZodString;
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
declare const screenIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const screenQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Online: "ONLINE";
        readonly Offline: "OFFLINE";
        readonly Syncing: "SYNCING";
    }>>;
    centerId: z.ZodOptional<z.ZodString>;
    buildingId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

declare const ScreenStatus: {
    readonly Online: "ONLINE";
    readonly Offline: "OFFLINE";
    readonly Syncing: "SYNCING";
};
type EnumScreenStatus = (typeof ScreenStatus)[keyof typeof ScreenStatus];
declare const PairingRequestStatus: {
    readonly Pending: "PENDING";
    readonly Approved: "APPROVED";
};
type EnumPairingRequestStatus = (typeof PairingRequestStatus)[keyof typeof PairingRequestStatus];

type CreateScreenDTO = z.infer<typeof createScreenSchema>;
type UpdateScreenDTO = z.infer<typeof updateScreenSchema>;
type ScreenResponseDTO = z.infer<typeof screenResponseSchema>;
type ScreenIdDTO = z.infer<typeof screenIdSchema>;
type ScreenQueryDTO = z.infer<typeof screenQuerySchema>;
type PaginatedScreensDTO = PaginatedResultDTO<ScreenResponseDTO>;

declare const createContentSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<{
        readonly Image: "IMAGE";
        readonly Video: "VIDEO";
        readonly Notice: "NOTICE";
        readonly WebUrl: "WEB_URL";
    }>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Draft: "DRAFT";
        readonly Scheduled: "SCHEDULED";
        readonly Active: "ACTIVE";
        readonly Expired: "EXPIRED";
        readonly Archived: "ARCHIVED";
    }>>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    author: z.ZodOptional<z.ZodString>;
    contentUrl: z.ZodOptional<z.ZodString>;
    mediaUrl: z.ZodOptional<z.ZodString>;
    textBody: z.ZodString;
    showTitle: z.ZodDefault<z.ZodBoolean>;
    showAuthor: z.ZodDefault<z.ZodBoolean>;
    showQrCode: z.ZodDefault<z.ZodBoolean>;
    showTime: z.ZodDefault<z.ZodBoolean>;
    showScreenName: z.ZodDefault<z.ZodBoolean>;
    showTypeBadge: z.ZodDefault<z.ZodBoolean>;
    showDeadline: z.ZodDefault<z.ZodBoolean>;
    isCarousel: z.ZodDefault<z.ZodBoolean>;
    isPrivate: z.ZodDefault<z.ZodBoolean>;
    mediaFit: z.ZodDefault<z.ZodEnum<{
        readonly Cover: "COVER";
        readonly Contain: "CONTAIN";
        readonly Fill: "FILL";
        readonly Blur: "BLUR";
    }>>;
}, z.core.$strip>;
declare const updateContentSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        readonly Image: "IMAGE";
        readonly Video: "VIDEO";
        readonly Notice: "NOTICE";
        readonly WebUrl: "WEB_URL";
    }>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        readonly Draft: "DRAFT";
        readonly Scheduled: "SCHEDULED";
        readonly Active: "ACTIVE";
        readonly Expired: "EXPIRED";
        readonly Archived: "ARCHIVED";
    }>>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    author: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    contentUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mediaUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    textBody: z.ZodOptional<z.ZodString>;
    showTitle: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showAuthor: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showQrCode: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showTime: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showScreenName: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showTypeBadge: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showDeadline: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isCarousel: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isPrivate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    mediaFit: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly Cover: "COVER";
        readonly Contain: "CONTAIN";
        readonly Fill: "FILL";
        readonly Blur: "BLUR";
    }>>>;
}, z.core.$strip>;
declare const updateContentStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        readonly Draft: "DRAFT";
        readonly Scheduled: "SCHEDULED";
        readonly Active: "ACTIVE";
        readonly Expired: "EXPIRED";
        readonly Archived: "ARCHIVED";
    }>;
}, z.core.$strip>;
declare const contentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<{
        readonly Image: "IMAGE";
        readonly Video: "VIDEO";
        readonly Notice: "NOTICE";
        readonly WebUrl: "WEB_URL";
    }>;
    status: z.ZodEnum<{
        readonly Draft: "DRAFT";
        readonly Scheduled: "SCHEDULED";
        readonly Active: "ACTIVE";
        readonly Expired: "EXPIRED";
        readonly Archived: "ARCHIVED";
    }>;
    startDate: z.ZodNullable<z.ZodDate>;
    endDate: z.ZodNullable<z.ZodDate>;
    author: z.ZodNullable<z.ZodString>;
    contentUrl: z.ZodNullable<z.ZodString>;
    mediaUrl: z.ZodNullable<z.ZodString>;
    textBody: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<{
            readonly SuperAdmin: "SUPER_ADMIN";
            readonly CenterAdmin: "CENTER_ADMIN";
            readonly Publisher: "PUBLISHER";
        }>;
        imageUrl: z.ZodNullable<z.ZodString>;
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
                latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
            }, z.core.$strip>>>;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
        }, z.core.$strip>>;
        created_at: z.ZodCoercedDate<unknown>;
        updated_at: z.ZodCoercedDate<unknown>;
        temporaryPassword: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    showTitle: z.ZodBoolean;
    showAuthor: z.ZodBoolean;
    showQrCode: z.ZodBoolean;
    showTime: z.ZodBoolean;
    showScreenName: z.ZodBoolean;
    showTypeBadge: z.ZodBoolean;
    showDeadline: z.ZodBoolean;
    isCarousel: z.ZodBoolean;
    isPrivate: z.ZodBoolean;
    mediaFit: z.ZodDefault<z.ZodEnum<{
        readonly Cover: "COVER";
        readonly Contain: "CONTAIN";
        readonly Fill: "FILL";
        readonly Blur: "BLUR";
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const contentIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const contentQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    query: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Draft: "DRAFT";
        readonly Scheduled: "SCHEDULED";
        readonly Active: "ACTIVE";
        readonly Expired: "EXPIRED";
        readonly Archived: "ARCHIVED";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        readonly Image: "IMAGE";
        readonly Video: "VIDEO";
        readonly Notice: "NOTICE";
        readonly WebUrl: "WEB_URL";
    }>>;
    onlyMyCenter: z.ZodPipe<z.ZodTransform<boolean, unknown>, z.ZodOptional<z.ZodBoolean>>;
    onlyMyContents: z.ZodPipe<z.ZodTransform<boolean, unknown>, z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;

declare const ContentType: {
    readonly Image: "IMAGE";
    readonly Video: "VIDEO";
    readonly Notice: "NOTICE";
    readonly WebUrl: "WEB_URL";
};
type EnumContentType = (typeof ContentType)[keyof typeof ContentType];
declare const ContentStatus: {
    readonly Draft: "DRAFT";
    readonly Scheduled: "SCHEDULED";
    readonly Active: "ACTIVE";
    readonly Expired: "EXPIRED";
    readonly Archived: "ARCHIVED";
};
type EnumContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];
declare const MediaFit: {
    readonly Cover: "COVER";
    readonly Contain: "CONTAIN";
    readonly Fill: "FILL";
    readonly Blur: "BLUR";
};
type EnumMediaFit = (typeof MediaFit)[keyof typeof MediaFit];

type CreateContentDTO = z.infer<typeof createContentSchema>;
type UpdateContentDTO = z.infer<typeof updateContentSchema>;
type UpdateContentStatusDTO = z.infer<typeof updateContentStatusSchema>;
type ContentResponseDTO = z.infer<typeof contentResponseSchema>;
type ContentIdDTO = z.infer<typeof contentIdSchema>;
type ContentQueryDTO = z.infer<typeof contentQuerySchema>;
type PaginatedContentsDTO = PaginatedResultDTO<ContentResponseDTO>;

declare const uploadResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;

type UploadResponseDTO = z.infer<typeof uploadResponseSchema>;

declare const createPlaylistItemSchema: z.ZodObject<{
    buildingId: z.ZodOptional<z.ZodString>;
    screenId: z.ZodOptional<z.ZodString>;
    contentId: z.ZodString;
    duration: z.ZodDefault<z.ZodNumber>;
    order: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
declare const updatePlaylistItemSchema: z.ZodObject<{
    duration: z.ZodOptional<z.ZodNumber>;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const reorderPlaylistSchema: z.ZodObject<{
    buildingId: z.ZodOptional<z.ZodString>;
    screenId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        order: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const playlistItemResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    screenId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contentId: z.ZodString;
    duration: z.ZodNumber;
    order: z.ZodNumber;
    content: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodEnum<{
            readonly Image: "IMAGE";
            readonly Video: "VIDEO";
            readonly Notice: "NOTICE";
            readonly WebUrl: "WEB_URL";
        }>;
        status: z.ZodEnum<{
            readonly Draft: "DRAFT";
            readonly Scheduled: "SCHEDULED";
            readonly Active: "ACTIVE";
            readonly Expired: "EXPIRED";
            readonly Archived: "ARCHIVED";
        }>;
        startDate: z.ZodNullable<z.ZodDate>;
        endDate: z.ZodNullable<z.ZodDate>;
        author: z.ZodNullable<z.ZodString>;
        contentUrl: z.ZodNullable<z.ZodString>;
        mediaUrl: z.ZodNullable<z.ZodString>;
        textBody: z.ZodNullable<z.ZodString>;
        ownerId: z.ZodString;
        owner: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodEnum<{
                readonly SuperAdmin: "SUPER_ADMIN";
                readonly CenterAdmin: "CENTER_ADMIN";
                readonly Publisher: "PUBLISHER";
            }>;
            imageUrl: z.ZodNullable<z.ZodString>;
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
                    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                }, z.core.$strip>>>;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
            }, z.core.$strip>>;
            created_at: z.ZodCoercedDate<unknown>;
            updated_at: z.ZodCoercedDate<unknown>;
            temporaryPassword: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        showTitle: z.ZodBoolean;
        showAuthor: z.ZodBoolean;
        showQrCode: z.ZodBoolean;
        showTime: z.ZodBoolean;
        showScreenName: z.ZodBoolean;
        showTypeBadge: z.ZodBoolean;
        showDeadline: z.ZodBoolean;
        isCarousel: z.ZodBoolean;
        isPrivate: z.ZodBoolean;
        mediaFit: z.ZodDefault<z.ZodEnum<{
            readonly Cover: "COVER";
            readonly Contain: "CONTAIN";
            readonly Fill: "FILL";
            readonly Blur: "BLUR";
        }>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const playlistItemIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const playlistQuerySchema: z.ZodObject<{
    buildingId: z.ZodOptional<z.ZodString>;
    screenId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

type CreatePlaylistItemDTO = z.infer<typeof createPlaylistItemSchema>;
type UpdatePlaylistItemDTO = z.infer<typeof updatePlaylistItemSchema>;
type PlaylistItemResponseDTO = z.infer<typeof playlistItemResponseSchema>;
type ReorderPlaylistDTO = z.infer<typeof reorderPlaylistSchema>;

declare const kioskPlaylistItemResponseSchema: z.ZodObject<{
    id: z.ZodString;
    duration: z.ZodNumber;
    order: z.ZodNumber;
    content: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodEnum<{
            readonly Image: "IMAGE";
            readonly Video: "VIDEO";
            readonly Notice: "NOTICE";
            readonly WebUrl: "WEB_URL";
        }>;
        status: z.ZodEnum<{
            readonly Draft: "DRAFT";
            readonly Scheduled: "SCHEDULED";
            readonly Active: "ACTIVE";
            readonly Expired: "EXPIRED";
            readonly Archived: "ARCHIVED";
        }>;
        startDate: z.ZodNullable<z.ZodDate>;
        endDate: z.ZodNullable<z.ZodDate>;
        author: z.ZodNullable<z.ZodString>;
        contentUrl: z.ZodNullable<z.ZodString>;
        mediaUrl: z.ZodNullable<z.ZodString>;
        textBody: z.ZodNullable<z.ZodString>;
        ownerId: z.ZodString;
        owner: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodEnum<{
                readonly SuperAdmin: "SUPER_ADMIN";
                readonly CenterAdmin: "CENTER_ADMIN";
                readonly Publisher: "PUBLISHER";
            }>;
            imageUrl: z.ZodNullable<z.ZodString>;
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
                    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                }, z.core.$strip>>>;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
            }, z.core.$strip>>;
            created_at: z.ZodCoercedDate<unknown>;
            updated_at: z.ZodCoercedDate<unknown>;
            temporaryPassword: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        showTitle: z.ZodBoolean;
        showAuthor: z.ZodBoolean;
        showQrCode: z.ZodBoolean;
        showTime: z.ZodBoolean;
        showScreenName: z.ZodBoolean;
        showTypeBadge: z.ZodBoolean;
        showDeadline: z.ZodBoolean;
        isCarousel: z.ZodBoolean;
        isPrivate: z.ZodBoolean;
        mediaFit: z.ZodDefault<z.ZodEnum<{
            readonly Cover: "COVER";
            readonly Contain: "CONTAIN";
            readonly Fill: "FILL";
            readonly Blur: "BLUR";
        }>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const kioskPlaylistResponseSchema: z.ZodObject<{
    screenName: z.ZodString;
    lastUpdated: z.ZodNullable<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        duration: z.ZodNumber;
        order: z.ZodNumber;
        content: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            type: z.ZodEnum<{
                readonly Image: "IMAGE";
                readonly Video: "VIDEO";
                readonly Notice: "NOTICE";
                readonly WebUrl: "WEB_URL";
            }>;
            status: z.ZodEnum<{
                readonly Draft: "DRAFT";
                readonly Scheduled: "SCHEDULED";
                readonly Active: "ACTIVE";
                readonly Expired: "EXPIRED";
                readonly Archived: "ARCHIVED";
            }>;
            startDate: z.ZodNullable<z.ZodDate>;
            endDate: z.ZodNullable<z.ZodDate>;
            author: z.ZodNullable<z.ZodString>;
            contentUrl: z.ZodNullable<z.ZodString>;
            mediaUrl: z.ZodNullable<z.ZodString>;
            textBody: z.ZodNullable<z.ZodString>;
            ownerId: z.ZodString;
            owner: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                email: z.ZodString;
                role: z.ZodEnum<{
                    readonly SuperAdmin: "SUPER_ADMIN";
                    readonly CenterAdmin: "CENTER_ADMIN";
                    readonly Publisher: "PUBLISHER";
                }>;
                imageUrl: z.ZodNullable<z.ZodString>;
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
                        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodDate;
                    }, z.core.$strip>>>;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                }, z.core.$strip>>;
                created_at: z.ZodCoercedDate<unknown>;
                updated_at: z.ZodCoercedDate<unknown>;
                temporaryPassword: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            showTitle: z.ZodBoolean;
            showAuthor: z.ZodBoolean;
            showQrCode: z.ZodBoolean;
            showTime: z.ZodBoolean;
            showScreenName: z.ZodBoolean;
            showTypeBadge: z.ZodBoolean;
            showDeadline: z.ZodBoolean;
            isCarousel: z.ZodBoolean;
            isPrivate: z.ZodBoolean;
            mediaFit: z.ZodDefault<z.ZodEnum<{
                readonly Cover: "COVER";
                readonly Contain: "CONTAIN";
                readonly Fill: "FILL";
                readonly Blur: "BLUR";
            }>>;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;

type KioskPlaylistResponseDTO = z.infer<typeof kioskPlaylistResponseSchema>;
type KioskPlaylistItemDTO = z.infer<typeof kioskPlaylistItemResponseSchema>;

declare const dashboardCenterInfraSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    acronym: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    buildingsCount: z.ZodNumber;
    screensCount: z.ZodOptional<z.ZodNumber>;
    onlineScreensCount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const dashboardRecentActivitySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodString;
    status: z.ZodString;
    author: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const dashboardStatsSchema: z.ZodObject<{
    totalContents: z.ZodNumber;
    activeContents: z.ZodNumber;
    pendingContents: z.ZodNumber;
    contentsByStatus: z.ZodRecord<z.ZodString, z.ZodNumber>;
    contentsByType: z.ZodRecord<z.ZodString, z.ZodNumber>;
    totalScreens: z.ZodNumber;
    onlineScreens: z.ZodNumber;
    offlineScreens: z.ZodNumber;
    screensByStatus: z.ZodRecord<z.ZodString, z.ZodNumber>;
    totalCenters: z.ZodNumber;
    totalBuildings: z.ZodNumber;
    totalUsers: z.ZodNumber;
    centersInfrastructure: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        acronym: z.ZodNullable<z.ZodString>;
        color: z.ZodNullable<z.ZodString>;
        buildingsCount: z.ZodNumber;
        screensCount: z.ZodOptional<z.ZodNumber>;
        onlineScreensCount: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    recentActivities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodString;
        status: z.ZodString;
        author: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const dashboardMapScreenSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    ip: z.ZodNullable<z.ZodString>;
    status: z.ZodString;
    isPrivate: z.ZodBoolean;
}, z.core.$strip>;
declare const dashboardMapBuildingSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    centerName: z.ZodString;
    centerAcronym: z.ZodNullable<z.ZodString>;
    centerColor: z.ZodNullable<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    screensCount: z.ZodNumber;
    onlineScreensCount: z.ZodNumber;
    offlineScreensCount: z.ZodNumber;
    coordinates: z.ZodObject<{
        ipBased: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            isFallback: z.ZodBoolean;
        }, z.core.$strip>;
        buildingBased: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            isConfigured: z.ZodBoolean;
        }, z.core.$strip>;
    }, z.core.$strip>;
    screens: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        ip: z.ZodNullable<z.ZodString>;
        status: z.ZodString;
        isPrivate: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const dashboardMapResponseSchema: z.ZodObject<{
    center: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    bounds: z.ZodObject<{
        southwest: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        northeast: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, z.core.$strip>;
    buildings: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        centerName: z.ZodString;
        centerAcronym: z.ZodNullable<z.ZodString>;
        centerColor: z.ZodNullable<z.ZodString>;
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        screensCount: z.ZodNumber;
        onlineScreensCount: z.ZodNumber;
        offlineScreensCount: z.ZodNumber;
        coordinates: z.ZodObject<{
            ipBased: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
                isFallback: z.ZodBoolean;
            }, z.core.$strip>;
            buildingBased: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
                isConfigured: z.ZodBoolean;
            }, z.core.$strip>;
        }, z.core.$strip>;
        screens: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            ip: z.ZodNullable<z.ZodString>;
            status: z.ZodString;
            isPrivate: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

type DashboardCenterInfraDTO = z.infer<typeof dashboardCenterInfraSchema>;
type DashboardRecentActivityDTO = z.infer<typeof dashboardRecentActivitySchema>;
type DashboardStatsDTO = z.infer<typeof dashboardStatsSchema>;
type DashboardMapScreenDTO = z.infer<typeof dashboardMapScreenSchema>;
type DashboardMapBuildingDTO = z.infer<typeof dashboardMapBuildingSchema>;
type DashboardMapResponseDTO = z.infer<typeof dashboardMapResponseSchema>;

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

export { AuthEnums, type BuildingIdDTO, type BuildingQueryDTO, type BuildingResponseDTO, type CenterIdDTO, type CenterQueryDTO, type CenterResponseDTO, type ContentIdDTO, type ContentQueryDTO, type ContentResponseDTO, ContentStatus, ContentType, type CreateBuildingDTO, type CreateCenterDTO, type CreateContentDTO, type CreatePlaylistItemDTO, type CreateScreenDTO, type CreateUserDTO, type DashboardCenterInfraDTO, type DashboardMapBuildingDTO, type DashboardMapResponseDTO, type DashboardMapScreenDTO, type DashboardRecentActivityDTO, type DashboardStatsDTO, type EnumContentStatus, type EnumContentType, type EnumLoginStatus, type EnumMediaFit, type EnumPairingRequestStatus, type EnumScreenStatus, type EnumSystemStatus, type EnumUserRole, type KioskPlaylistItemDTO, type KioskPlaylistResponseDTO, type LoginAuthDTO, MediaFit, type PaginatedBuildingsDTO, type PaginatedCentersDTO, type PaginatedContentsDTO, type PaginatedResultDTO, type PaginatedScreensDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, PairingRequestStatus, type PlaylistItemResponseDTO, type ProblemDetailsDTO, type ReorderPlaylistDTO, type ScreenIdDTO, type ScreenQueryDTO, type ScreenResponseDTO, ScreenStatus, SystemStatus, type TokenPayloadDTO, type UpdateBuildingDTO, type UpdateCenterDTO, type UpdateContentDTO, type UpdateContentStatusDTO, type UpdatePlaylistItemDTO, type UpdateScreenDTO, type UpdateUserDTO, type UploadResponseDTO, type UserIdDTO, type UserResponseDTO, UserRole, buildingIdSchema, buildingQuerySchema, buildingResponseSchema, centerIdSchema, centerQuerySchema, centerResponseSchema, contentIdSchema, contentQuerySchema, contentResponseSchema, createBuildingSchema, createCenterSchema, createContentSchema, createPaginatedResponseSchema, createPlaylistItemSchema, createScreenSchema, createUserSchema, dashboardCenterInfraSchema, dashboardMapBuildingSchema, dashboardMapResponseSchema, dashboardMapScreenSchema, dashboardRecentActivitySchema, dashboardStatsSchema, formatMinutesToReadable, ipv4Schema, kioskPlaylistItemResponseSchema, kioskPlaylistResponseSchema, loginSchema, minutesToDecimalHours, paginationMetaSchema, paginationSchema, playlistItemIdSchema, playlistItemResponseSchema, playlistQuerySchema, refreshTokenSchema, registry, reorderPlaylistSchema, rfc7807ErrorSchema, screenIdSchema, screenIpSchema, screenQuerySchema, screenResponseSchema, timeStringToMinutes, updateBuildingSchema, updateCenterSchema, updateContentSchema, updateContentStatusSchema, updatePlaylistItemSchema, updateScreenSchema, updateUserSchema, uploadResponseSchema, userIdSchema, userResponseSchema };
