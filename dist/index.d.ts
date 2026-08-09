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
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodEmail, z.ZodTransform<string, string>>>;
    password: z.ZodOptional<z.ZodString>;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    is_active: z.ZodBoolean;
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

declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    projectId: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        readonly Low: "LOW";
        readonly Medium: "MEDIUM";
        readonly High: "HIGH";
        readonly Urgent: "URGENT";
    }>>;
    dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    projectId: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly Low: "LOW";
        readonly Medium: "MEDIUM";
        readonly High: "HIGH";
        readonly Urgent: "URGENT";
    }>>>;
    dueDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    totalMinutes: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly Backlog: "BACKLOG";
        readonly Pending: "PENDING";
        readonly InProgress: "IN_PROGRESS";
        readonly InReview: "IN_REVIEW";
        readonly Completed: "COMPLETED";
        readonly Archived: "ARCHIVED";
    }>>;
    memberIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    ownerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
declare const taskResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    projectId: z.ZodString;
    status: z.ZodEnum<{
        readonly Backlog: "BACKLOG";
        readonly Pending: "PENDING";
        readonly InProgress: "IN_PROGRESS";
        readonly InReview: "IN_REVIEW";
        readonly Completed: "COMPLETED";
        readonly Archived: "ARCHIVED";
    }>;
    priority: z.ZodEnum<{
        readonly Low: "LOW";
        readonly Medium: "MEDIUM";
        readonly High: "HIGH";
        readonly Urgent: "URGENT";
    }>;
    dueDate: z.ZodNullable<z.ZodDate>;
    totalMinutes: z.ZodDefault<z.ZodNumber>;
    isTimerActive: z.ZodBoolean;
    hasPendingSessions: z.ZodOptional<z.ZodBoolean>;
    ownerId: z.ZodString;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodString;
        joinedAt: z.ZodDate;
    }, z.core.$strip>>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const taskIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;

declare const TaskStatus: {
    readonly Backlog: "BACKLOG";
    readonly Pending: "PENDING";
    readonly InProgress: "IN_PROGRESS";
    readonly InReview: "IN_REVIEW";
    readonly Completed: "COMPLETED";
    readonly Archived: "ARCHIVED";
};
type EnumTaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
declare const TaskPriority: {
    readonly Low: "LOW";
    readonly Medium: "MEDIUM";
    readonly High: "HIGH";
    readonly Urgent: "URGENT";
};
type EnumTaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
declare const TaskRole: {
    readonly Owner: "OWNER";
    readonly Admin: "ADMIN";
    readonly Member: "MEMBER";
    readonly Viewer: "VIEWER";
};
type EnumTaskRole = (typeof TaskRole)[keyof typeof TaskRole];

type CreateTaskDTO = z.infer<typeof createTaskSchema>;
type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
type TaskResponseDTO = z.infer<typeof taskResponseSchema>;
type TaskIdDTO = z.infer<typeof taskIdSchema>;
type PaginatedTasksDTO = PaginatedResultDTO<TaskResponseDTO>;

declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    memberIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    ownerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
declare const projectResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    ownerId: z.ZodString;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodString;
        joinedAt: z.ZodDate;
    }, z.core.$strip>>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const projectIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;

declare const ProjectStatus: {
    readonly Draft: "DRAFT";
    readonly Active: "ACTIVE";
    readonly OnHold: "ON_HOLD";
    readonly Completed: "COMPLETED";
    readonly Canceled: "CANCELLED";
};
type EnumProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
declare const ProjectPriority: {
    readonly Low: "LOW";
    readonly Medium: "MEDIUM";
    readonly High: "HIGH";
    readonly Critical: "CRITICAL";
};
type EnumProjectPriority = (typeof ProjectPriority)[keyof typeof ProjectPriority];
declare const ProjectRole: {
    readonly Owner: "OWNER";
    readonly Admin: "ADMIN";
    readonly Member: "MEMBER";
    readonly Viewer: "VIEWER";
};
type EnumProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole];

type CreateProjectDTO = z.infer<typeof createProjectSchema>;
type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
type ProjectResponseDTO = z.infer<typeof projectResponseSchema>;
type ProjectIdDTO = z.infer<typeof projectIdSchema>;
type PaginatedProjectsDTO = PaginatedResultDTO<ProjectResponseDTO>;

declare const createTimeLogSchema: z.ZodObject<{
    taskId: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    nature: z.ZodEnum<{
        readonly DEV: "DEV";
        readonly MEETING: "MEETING";
        readonly TESTING: "TESTING";
        readonly DOCUMENTATION: "DOCUMENTATION";
        readonly CODE_REVIEW: "CODE_REVIEW";
        readonly OTHER: "OTHER";
    }>;
    description: z.ZodString;
}, z.core.$strip>;
declare const updateTimeLogSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    description: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    nature: z.ZodOptional<z.ZodEnum<{
        readonly DEV: "DEV";
        readonly MEETING: "MEETING";
        readonly TESTING: "TESTING";
        readonly DOCUMENTATION: "DOCUMENTATION";
        readonly CODE_REVIEW: "CODE_REVIEW";
        readonly OTHER: "OTHER";
    }>>;
}, z.core.$strip>;
declare const timeLogResponseSchema: z.ZodObject<{
    id: z.ZodString;
    taskId: z.ZodString;
    userId: z.ZodString;
    date: z.ZodDate;
    startTime: z.ZodString;
    endTime: z.ZodString;
    loggedMinutes: z.ZodDefault<z.ZodNumber>;
    nature: z.ZodEnum<{
        readonly DEV: "DEV";
        readonly MEETING: "MEETING";
        readonly TESTING: "TESTING";
        readonly DOCUMENTATION: "DOCUMENTATION";
        readonly CODE_REVIEW: "CODE_REVIEW";
        readonly OTHER: "OTHER";
    }>;
    description: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const paginatedTimeLogsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        taskId: z.ZodString;
        userId: z.ZodString;
        date: z.ZodDate;
        startTime: z.ZodString;
        endTime: z.ZodString;
        loggedMinutes: z.ZodDefault<z.ZodNumber>;
        nature: z.ZodEnum<{
            readonly DEV: "DEV";
            readonly MEETING: "MEETING";
            readonly TESTING: "TESTING";
            readonly DOCUMENTATION: "DOCUMENTATION";
            readonly CODE_REVIEW: "CODE_REVIEW";
            readonly OTHER: "OTHER";
        }>;
        description: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>>;
    meta: z.ZodObject<{
        totalItems: z.ZodNumber;
        totalPages: z.ZodNumber;
        currentPage: z.ZodNumber;
        itemsPerPage: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const toggleTimerResponseSchema: z.ZodObject<{
    isTimerActive: z.ZodBoolean;
}, z.core.$strip>;
declare const pendingTimeResponseSchema: z.ZodObject<{
    totalMinutes: z.ZodNumber;
    firstStart: z.ZodNullable<z.ZodDate>;
    lastEnd: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;

declare const TimeLogNature: {
    readonly DEV: "DEV";
    readonly MEETING: "MEETING";
    readonly TESTING: "TESTING";
    readonly DOCUMENTATION: "DOCUMENTATION";
    readonly CODE_REVIEW: "CODE_REVIEW";
    readonly OTHER: "OTHER";
};
type EnumTimeLogNature = (typeof TimeLogNature)[keyof typeof TimeLogNature];

type CreateTimeLogDTO = z.infer<typeof createTimeLogSchema>;
type TimeLogResponseDTO = z.infer<typeof timeLogResponseSchema>;
type UpdateTimeLogDTO = z.infer<typeof updateTimeLogSchema>;
type PaginatedTimeLogsDTO = z.infer<typeof paginatedTimeLogsResponseSchema>;

declare const dashboardResponseSchema: z.ZodObject<{
    kpis: z.ZodObject<{
        totalTasks: z.ZodNumber;
        totalHours: z.ZodNumber;
        completedTasks: z.ZodNumber;
        delayedTasks: z.ZodNumber;
        dailyGoalPercent: z.ZodNumber;
        totalProjects: z.ZodNumber;
        urgentTasks: z.ZodNumber;
        todayMinutes: z.ZodNumber;
    }, z.core.$strip>;
    hoursPerNature: z.ZodArray<z.ZodObject<{
        natureza: z.ZodString;
        horas: z.ZodNumber;
    }, z.core.$strip>>;
    appointmentsPerProject: z.ZodArray<z.ZodObject<{
        projeto: z.ZodString;
        horas: z.ZodNumber;
    }, z.core.$strip>>;
    recentActivity: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        userName: z.ZodString;
        taskTitle: z.ZodString;
        loggedMinutes: z.ZodNumber;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;

type DashboardResponseDTO = z.infer<typeof dashboardResponseSchema>;

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

export { AuthEnums, type CreateProjectDTO, type CreateTaskDTO, type CreateTimeLogDTO, type CreateUserDTO, type DashboardResponseDTO, type EnumLoginStatus, type EnumProjectPriority, type EnumProjectRole, type EnumProjectStatus, type EnumTaskPriority, type EnumTaskRole, type EnumTaskStatus, type EnumTimeLogNature, type LoginAuthDTO, type PaginatedProjectsDTO, type PaginatedResultDTO, type PaginatedTasksDTO, type PaginatedTimeLogsDTO, type PaginatedUsersDTO, type PaginationMetaDTO, type PaginationQueryDTO, type ProblemDetailsDTO, type ProjectIdDTO, ProjectPriority, type ProjectResponseDTO, ProjectRole, ProjectStatus, type TaskIdDTO, TaskPriority, type TaskResponseDTO, TaskRole, TaskStatus, TimeLogNature, type TimeLogResponseDTO, type TokenPayloadDTO, type UpdateProjectDTO, type UpdateTaskDTO, type UpdateTimeLogDTO, type UpdateUserDTO, type UserIdDTO, type UserResponseDTO, createPaginatedResponseSchema, createProjectSchema, createTaskSchema, createTimeLogSchema, createUserSchema, dashboardResponseSchema, formatMinutesToReadable, loginSchema, minutesToDecimalHours, paginatedTimeLogsResponseSchema, paginationMetaSchema, paginationSchema, pendingTimeResponseSchema, projectIdSchema, projectResponseSchema, refreshTokenSchema, registry, rfc7807ErrorSchema, taskIdSchema, taskResponseSchema, timeLogResponseSchema, timeStringToMinutes, toggleTimerResponseSchema, updateProjectSchema, updateTaskSchema, updateTimeLogSchema, updateUserSchema, userIdSchema, userResponseSchema };
