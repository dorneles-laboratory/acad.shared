// src/lib/registry.ts
import { z } from "zod";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
var registry = new OpenAPIRegistry();

// src/modules/auth/auth.schemas.ts
var loginSchema = registry.register(
  "LoginRequest",
  z.object({
    email: z.email({
      error: ({ input }) => input === void 0 ? "O e-mail \xE9 obrigat\xF3rio." : "Formato de e-mail inv\xE1lido."
    }).min(1, { message: "O e-mail \xE9 obrigat\xF3rio." }).transform((value) => value.toLowerCase()).openapi({
      description: "E-mail do usu\xE1rio",
      example: "teste@teste.com.br"
    }),
    password: z.string({
      error: ({ input }) => input === void 0 ? "A senha \xE9 obrigat\xF3ria." : "A senha deve ser um texto."
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).openapi({
      description: "Senha do usu\xE1rio com crit\xE9rios de seguran\xE7a",
      example: "Senha@123"
    })
  })
);
var refreshTokenSchema = registry.register(
  "RefreshTokenRequest",
  z.object({
    refreshToken: z.string({
      error: ({ input }) => input === void 0 ? "O token de atualiza\xE7\xE3o \xE9 obrigat\xF3rio." : "O token de atualiza\xE7\xE3o deve ser um texto."
    }).openapi({
      description: "Token de atualiza\xE7\xE3o obtido no login",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    })
  })
);

// src/modules/auth/auth.enums.ts
var AuthEnums = {
  LoginStatus: {
    Pending: "PENDING",
    Authenticated: "AUTHENTICATED",
    Unauthenticated: "UNAUTHENTICATED"
  }
};

// src/modules/users/users.schemas.ts
var createUserSchema = registry.register(
  "CreateUserRequest",
  z.object({
    name: z.string({
      error: ({ input }) => input === void 0 ? "O nome \xE9 obrigat\xF3rio." : "O nome deve ser um texto."
    }).min(2, { message: "Nome muito curto." }).max(120, { message: "Nome muito longo." }).trim().openapi({
      description: "Nome completo do usu\xE1rio",
      example: "Usu\xE1rio de Teste"
    }),
    email: z.email({
      error: ({ input }) => input === void 0 ? "O e-mail \xE9 obrigat\xF3rio." : "Formato de e-mail inv\xE1lido."
    }).transform((v) => v.toLowerCase()).openapi({
      description: "E-mail exclusivo do usu\xE1rio para login",
      example: "test@example.com"
    }),
    password: z.string({
      error: ({ input }) => input === void 0 ? "A senha \xE9 obrigat\xF3ria." : "A senha deve ser um texto."
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).openapi({
      description: "Senha do usu\xE1rio com crit\xE9rios de seguran\xE7a",
      example: "Senha@123"
    }),
    // cellphone: z.string().trim().optional().openapi({
    //   description: 'Número de celular do usuário',
    //   example: '(55) 99999-9999',
    // }),
    // birth_date: z.coerce
    //   .date({
    //     message: 'A data de nascimento deve ser válida.',
    //   })
    //   .optional()
    //   .openapi({
    //     description: 'Data de nascimento do usuário (YYYY-MM-DD)',
    //     example: '1990-01-01',
    //   }),
    // address: z.string().trim().optional().openapi({
    //   description: 'Endereço do usuário',
    //   example: 'Rua Exemplo, 123 - Cidade/UF',
    // }),
    is_active: z.boolean().default(true).optional()
  })
);
var updateUserSchema = createUserSchema.partial().omit({ password: true }).extend({
  password: z.string().min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
    description: "Nova senha do usu\xE1rio (opcional, com crit\xE9rios de seguran\xE7a)",
    example: "NovaSenha@123"
  }),
  is_active: z.boolean().optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
});
var userResponseSchema = registry.register(
  "UserResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    // cellphone: z.string().nullable(),
    // birth_date: z.coerce.date().nullable(),
    // address: z.string().nullable(),
    is_active: z.boolean(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
    // deletedAt: z.coerce.date().nullable(),
  })
);
var userIdSchema = z.object({
  id: z.uuid({
    error: ({ input }) => input === void 0 ? "O Id \xE9 obrigat\xF3rio." : "O ID do usu\xE1rio deve ser um UUID v\xE1lido."
  }).openapi({
    param: {
      name: "id",
      in: "path"
    },
    description: "UUID Identificador exclusivo do usu\xE1rio",
    example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
  })
});

// src/modules/tasks/tasks.enums.ts
var TaskStatus = {
  Backlog: "BACKLOG",
  Pending: "PENDING",
  InProgress: "IN_PROGRESS",
  InReview: "IN_REVIEW",
  Completed: "COMPLETED",
  Archived: "ARCHIVED"
};
var TaskPriority = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
  Urgent: "URGENT"
};
var TaskRole = {
  Owner: "OWNER",
  Admin: "ADMIN",
  Member: "MEMBER",
  Viewer: "VIEWER"
};

// src/modules/tasks/tasks.schemas.ts
var createTaskSchema = registry.register(
  "CreateTaskRequest",
  z.object({
    title: z.string().min(2).max(120).trim().openapi({
      description: "T\xEDtulo da tarefa",
      example: "Implementar nova funcionalidade X"
    }),
    description: z.string().max(2e3).trim().optional().openapi({
      description: "Descri\xE7\xE3o detalhada",
      example: "Descri\xE7\xE3o detalhada da tarefa"
    }),
    projectId: z.string().uuid().openapi({
      description: "ID do projeto ao qual a tarefa pertence",
      example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    priority: z.nativeEnum(TaskPriority).default(TaskPriority.Low).openapi({
      description: "Prioridade da tarefa",
      example: TaskPriority.High
    }),
    dueDate: z.coerce.date().optional().openapi({
      description: "Prazo limite da tarefa",
      example: "2024-12-31T23:59:59Z"
    })
  })
);
var updateTaskSchema = registry.register(
  "UpdateTaskRequest",
  createTaskSchema.extend({
    totalMinutes: z.number().int().openapi({
      description: "horas gastas na tarefa",
      example: 523
    }),
    status: z.nativeEnum(TaskStatus).openapi({
      description: "S\xF3 atualizamos o status depois de criada",
      example: TaskStatus.InProgress
    }),
    memberIds: z.array(z.string().uuid()).optional().openapi({
      description: "Membros do projeto (IDs de usu\xE1rios)",
      example: [
        "123e4567-e89b-12d3-a456-426614174000",
        "123e4567-e89b-12d3-a456-426614174001"
      ]
    }),
    ownerId: z.string().uuid().optional().openapi({
      description: "ID do usu\xE1rio respons\xE1vel",
      example: "123e4567-e89b-12d3-a456-426614174000"
    })
    // estimatedHours: z.number().positive().optional().openapi({
    //   description: 'Estimativa em horas',
    //   example: 8,
    // }),
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var taskResponseSchema = registry.register(
  "TaskResponse",
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    projectId: z.string().uuid(),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    dueDate: z.date().nullable(),
    totalMinutes: z.number().int().default(0),
    isTimerActive: z.boolean(),
    hasPendingSessions: z.boolean().optional(),
    ownerId: z.string().uuid(),
    members: z.array(
      z.object({
        userId: z.string().uuid(),
        role: z.string(),
        joinedAt: z.date()
      })
    ).optional(),
    // estimatedHours: z.number().nullable(),
    // createdById: z.string().uuid(),
    // closedById: z.string().uuid().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var taskIdSchema = z.object({
  id: z.string().uuid({ message: "O ID da tarefa deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});

// src/modules/projects/projects.enums.ts
var ProjectStatus = {
  Draft: "DRAFT",
  Active: "ACTIVE",
  OnHold: "ON_HOLD",
  Completed: "COMPLETED",
  Canceled: "CANCELLED"
};
var ProjectPriority = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
  Critical: "CRITICAL"
};
var ProjectRole = {
  Owner: "OWNER",
  Admin: "ADMIN",
  Member: "MEMBER",
  Viewer: "VIEWER"
};

// src/modules/projects/projects.schemas.ts
var createProjectSchema = registry.register(
  "CreateProjectRequest",
  z.object({
    name: z.string({
      error: ({ input }) => input === void 0 ? "O nome do projeto \xE9 obrigat\xF3rio." : "O nome do projeto deve ser um texto."
    }).min(3, { message: "Nome do projeto muito curto." }).max(120, { message: "Nome do projeto muito longo." }).trim().openapi({
      description: "Nome do projeto",
      example: "PGI-PROA V2"
    })
    // description: z
    //   .string()
    //   .max(2000, { message: 'Descrição muito longa.' })
    //   .trim()
    //   .optional()
    //   .openapi({
    //     description: 'Descrição detalhada do projeto e seus objetivos',
    //   }),
    // status: z.nativeEnum(ProjectStatus).default(ProjectStatus.Draft).openapi({
    //   description: 'Status inicial do projeto',
    //   example: 'draft',
    // }),
    // priority: z
    //   .nativeEnum(ProjectPriority)
    //   .default(ProjectPriority.Medium)
    //   .openapi({
    //     description: 'Prioridade estratégica do projeto',
    //     example: 'medium',
    //   }),
    // startDate: z.coerce.date().optional().openapi({
    //   description: 'Data de início oficial do projeto',
    // }),
    // endDate: z.coerce.date().optional().openapi({
    //   description: 'Data de término estimada ou prazo final',
    // }),
  })
);
var updateProjectSchema = registry.register(
  "UpdateProjectRequest",
  createProjectSchema.extend({
    memberIds: z.array(z.string().uuid()).optional().openapi({
      description: "Membros do projeto (IDs de usu\xE1rios)",
      example: [
        "123e4567-e89b-12d3-a456-426614174000",
        "123e4567-e89b-12d3-a456-426614174001"
      ]
    }),
    ownerId: z.string().uuid().optional().openapi({
      description: "ID do usu\xE1rio respons\xE1vel",
      example: "123e4567-e89b-12d3-a456-426614174000"
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var projectResponseSchema = registry.register(
  "ProjectResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    // description: z.string().nullable(),
    // status: z.nativeEnum(ProjectStatus),
    // priority: z.nativeEnum(ProjectPriority),
    // startDate: z.date().nullable(),
    // endDate: z.date().nullable(),
    ownerId: z.string().uuid(),
    members: z.array(
      z.object({
        userId: z.string().uuid(),
        role: z.string(),
        joinedAt: z.date()
      })
    ).optional(),
    // createdById: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var projectIdSchema = z.object({
  id: z.string().uuid({
    error: ({ input }) => input === void 0 ? "O Id \xE9 obrigat\xF3rio." : "O ID do projeto deve ser um UUID v\xE1lido."
  }).openapi({
    param: {
      name: "id",
      in: "path"
    },
    description: "UUID Identificador exclusivo do projeto"
  })
});

// src/modules/time-log/time-log.enums.ts
var TimeLogNature = {
  DEV: "DEV",
  MEETING: "MEETING",
  TESTING: "TESTING",
  DOCUMENTATION: "DOCUMENTATION",
  CODE_REVIEW: "CODE_REVIEW",
  OTHER: "OTHER"
};

// src/modules/time-log/time-log.schemas.ts
var createTimeLogSchema = registry.register(
  "CreateTimeLogRequest",
  z.object({
    taskId: z.string().uuid().openapi({
      description: "ID da tarefa relacionada",
      example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    date: z.coerce.date().openapi({
      description: "Data em que o trabalho foi realizado",
      example: "2023-10-10"
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato deve ser HH:MM").openapi({
      description: "Hora de in\xEDcio",
      example: "14:00"
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato deve ser HH:MM").openapi({
      description: "Hora de fim",
      example: "16:30"
    }),
    nature: z.nativeEnum(TimeLogNature).openapi({
      description: "Natureza da atividade",
      example: TimeLogNature.DEV
    }),
    description: z.string().min(10).max(2e3).openapi({
      description: "Relato detalhado do que foi feito",
      example: "Refatora\xE7\xE3o da camada de autentica\xE7\xE3o e ajuste de tipagens no shared."
    })
  })
);
var updateTimeLogSchema = registry.register(
  "UpdateTimeLogRequest",
  createTimeLogSchema.omit({ taskId: true }).partial()
);
var timeLogResponseSchema = registry.register(
  "TimeLogResponse",
  z.object({
    id: z.string().uuid(),
    taskId: z.string().uuid(),
    userId: z.string().uuid(),
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    loggedMinutes: z.number().int().default(0),
    nature: z.nativeEnum(TimeLogNature),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var paginatedTimeLogsResponseSchema = registry.register(
  "PaginatedTimeLogsResponse",
  z.object({
    data: z.array(timeLogResponseSchema),
    meta: z.object({
      totalItems: z.number().int(),
      totalPages: z.number().int(),
      currentPage: z.number().int(),
      itemsPerPage: z.number().int()
    })
  })
);
var toggleTimerResponseSchema = registry.register(
  "ToggleTimerResponse",
  z.object({
    isTimerActive: z.boolean().openapi({
      description: "Indica se o cron\xF4metro passou a rodar (Play) ou pausou (Pause)",
      example: true
    })
  })
);
var pendingTimeResponseSchema = registry.register(
  "PendingTimeResponse",
  z.object({
    totalMinutes: z.number().openapi({
      description: "Total de minutos acumulados nas sess\xF5es abertas",
      example: 120
    }),
    firstStart: z.date().nullable().openapi({
      description: "Data e hora do primeiro Play acionado"
    }),
    lastEnd: z.date().nullable().openapi({
      description: "Data e hora do \xFAltimo Pause acionado (ou data atual se estiver rodando)"
    })
  })
);

// src/modules/dashboard/dashboard.schemas.ts
var dashboardResponseSchema = registry.register(
  "DashboardResponse",
  z.object({
    kpis: z.object({
      totalTasks: z.number(),
      totalHours: z.number(),
      completedTasks: z.number(),
      delayedTasks: z.number(),
      dailyGoalPercent: z.number(),
      totalProjects: z.number(),
      urgentTasks: z.number(),
      todayMinutes: z.number()
    }),
    hoursPerNature: z.array(
      z.object({
        natureza: z.string(),
        // Ex: 'DEV', 'MEETING'
        horas: z.number()
      })
    ),
    appointmentsPerProject: z.array(
      z.object({
        projeto: z.string(),
        horas: z.number()
      })
    ),
    recentActivity: z.array(
      z.object({
        type: z.string(),
        userName: z.string(),
        taskTitle: z.string(),
        loggedMinutes: z.number(),
        createdAt: z.string()
      })
    )
  })
);

// src/common/common.schemas.ts
var rfc7807ErrorSchema = registry.register(
  "ProblemDetails",
  z.object({
    type: z.string().url().optional().openapi({
      description: "URI que identifica o tipo do erro",
      example: "https://api.dorneles.dev/errors/validation-error"
    }),
    title: z.string().openapi({
      description: "Um resumo curto e leg\xEDvel para humanos do problema",
      example: "Erro de valida\xE7\xE3o nos dados enviados."
    }),
    status: z.number().openapi({
      description: "O c\xF3digo de status HTTP correspondente",
      example: 400
    }),
    detail: z.string().optional().openapi({
      description: "Uma explica\xE7\xE3o espec\xEDfica para esta ocorr\xEAncia do problema",
      example: "O campo email n\xE3o possui um formato v\xE1lido."
    }),
    instance: z.string().optional().openapi({
      description: "URI que identifica a ocorr\xEAncia espec\xEDfica deste problema",
      example: "/tasks/123e4567-e89b-12d3-a456-426614174000"
    }),
    errors: z.record(z.string(), z.array(z.string())).optional().openapi({
      description: "Detalhes de valida\xE7\xE3o campo a campo (opcional)",
      example: {
        dueDate: ["A data de vencimento deve estar no futuro."]
      }
    })
  })
);
var paginationMetaSchema = registry.register(
  "PaginationMeta",
  z.object({
    totalItems: z.number().openapi({ example: 150 }),
    totalPages: z.number().openapi({ example: 15 }),
    currentPage: z.number().openapi({ example: 1 }),
    itemsPerPage: z.number().openapi({ example: 10 })
  })
);
var paginationSchema = registry.register(
  "PaginationQuery",
  z.object({
    page: z.coerce.number({ message: "A p\xE1gina deve ser um n\xFAmero." }).int("A p\xE1gina deve ser um n\xFAmero inteiro.").min(1, "A p\xE1gina deve ser no m\xEDnimo 1.").optional().default(1),
    limit: z.coerce.number({ message: "O limite deve ser um n\xFAmero." }).int("O limite deve ser um n\xFAmero inteiro.").min(1, "O limite deve ser no m\xEDnimo 1.").optional().default(10)
  })
);
function createPaginatedResponseSchema(schema, schemaName) {
  return registry.register(
    schemaName,
    z.object({
      data: z.array(schema),
      meta: paginationMetaSchema
    })
  );
}

// src/utils/date-time.ts
function timeStringToMinutes(timeString) {
  const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
  if (!timeRegex.test(timeString)) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours ? hours * 60 : 0) + (minutes ? minutes : 0);
}
function minutesToDecimalHours(minutes) {
  if (minutes < 0) return 0;
  return Math.round(minutes / 60 * 100) / 100;
}
function formatMinutesToReadable(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}` : `${m}m`;
}
export {
  AuthEnums,
  OpenApiGeneratorV3,
  ProjectPriority,
  ProjectRole,
  ProjectStatus,
  TaskPriority,
  TaskRole,
  TaskStatus,
  TimeLogNature,
  createPaginatedResponseSchema,
  createProjectSchema,
  createTaskSchema,
  createTimeLogSchema,
  createUserSchema,
  dashboardResponseSchema,
  formatMinutesToReadable,
  loginSchema,
  minutesToDecimalHours,
  paginatedTimeLogsResponseSchema,
  paginationMetaSchema,
  paginationSchema,
  pendingTimeResponseSchema,
  projectIdSchema,
  projectResponseSchema,
  refreshTokenSchema,
  registry,
  rfc7807ErrorSchema,
  taskIdSchema,
  taskResponseSchema,
  timeLogResponseSchema,
  timeStringToMinutes,
  toggleTimerResponseSchema,
  updateProjectSchema,
  updateTaskSchema,
  updateTimeLogSchema,
  updateUserSchema,
  userIdSchema,
  userResponseSchema,
  z
};
