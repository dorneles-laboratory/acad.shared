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

// src/modules/users/users.enums.ts
var UserEnums = {
  UserRole: {
    Admin: "ADMIN",
    User: "USER"
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
    isActive: z.boolean().default(true).optional(),
    role: z.nativeEnum(UserEnums.UserRole).default(UserEnums.UserRole.User).optional().openapi({
      description: "Fun\xE7\xE3o do usu\xE1rio no sistema",
      example: UserEnums.UserRole.User
    })
  })
);
var updateUserSchema = createUserSchema.partial().omit({ password: true }).extend({
  password: z.string().min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
    description: "Nova senha do usu\xE1rio (opcional, com crit\xE9rios de seguran\xE7a)",
    example: "NovaSenha@123"
  }),
  isActive: z.boolean().optional(),
  role: z.nativeEnum(UserEnums.UserRole).optional().openapi({
    description: "Nova fun\xE7\xE3o do usu\xE1rio no sistema (opcional)",
    example: UserEnums.UserRole.Admin
  }),
  imageUrl: z.string().url().optional().openapi({
    description: "URL da imagem de perfil do usu\xE1rio",
    example: "https://example.com/profile.jpg"
  })
}).refine(
  (data) => {
    return Object.values(data).some((value) => value !== void 0);
  },
  {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  }
);
var userResponseSchema = registry.register(
  "UserResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    isActive: z.boolean(),
    imageUrl: z.string().url().nullable(),
    role: z.nativeEnum(UserEnums.UserRole),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
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

// src/modules/toolkit/toolkit.enums.ts
var ToolkitEnums = {
  Category: {
    CarrerAndResume: "CAREER_AND_RESUME",
    ResearchAndPublication: "RESEARCH_AND_PUBLICATION",
    AcademicPlanning: "ACADEMIC_PLANNING",
    Opportunities: "OPPORTUNITIES",
    Documentation: "DOCUMENTATION",
    AcademicIntelligence: "ACADEMIC_INTELLIGENCE"
  },
  Status: {
    Available: "AVAILABLE",
    ComingSoon: "COMING_SOON"
  }
};

// src/modules/toolkit/toolkit.schemas.ts
var createToolSchema = registry.register(
  "CreateToolRequest",
  z.object({
    slug: z.string().min(2).max(50).trim().openapi({
      description: "Identificador \xFAnico amig\xE1vel para URLs (kebab-case)",
      example: "resume-builder"
    }),
    name: z.string().min(2).max(100).trim().openapi({
      description: "Nome de exibi\xE7\xE3o da ferramenta",
      example: "Resume Builder"
    }),
    tagline: z.string().min(5).max(150).trim().openapi({
      description: "Frase de efeito curta",
      example: "Gerador inteligente de curriculo academico"
    }),
    description: z.string().min(10).max(500).trim().openapi({
      description: "Descri\xE7\xE3o detalhada do funcionamento",
      example: "Transforme experiencias e projetos em curriculos profissionais."
    }),
    category: z.nativeEnum(ToolkitEnums.Category).openapi({
      description: "Categoria organizacional da ferramenta",
      example: ToolkitEnums.Category.CarrerAndResume
    }),
    status: z.nativeEnum(ToolkitEnums.Status).openapi({
      description: "Status atual de disponibilidade",
      example: ToolkitEnums.Status.Available
    }),
    iconName: z.string().min(2).max(50).trim().openapi({
      description: "Nome do \xEDcone da biblioteca Lucide React",
      example: "FileText"
    }),
    isNew: z.boolean().default(false).optional()
  })
);
var updateToolSchema = createToolSchema.partial().refine(
  (data) => {
    return Object.values(data).some((value) => value !== void 0);
  },
  {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  }
);
var toolIdSchema = z.object({
  id: z.string().uuid({ message: "O ID da ferramenta deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" },
    description: "UUID Identificador da ferramenta",
    example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
  })
});
var toolResponseSchema = registry.register(
  "ToolResponse",
  z.object({
    id: z.string().uuid(),
    slug: z.string(),
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.nativeEnum(ToolkitEnums.Category),
    status: z.nativeEnum(ToolkitEnums.Status),
    iconName: z.string(),
    isNew: z.boolean(),
    uses: z.number().optional(),
    interested: z.number().optional(),
    lastUsed: z.string().nullable().optional(),
    pinned: z.boolean().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  })
);

// src/modules/toolkit/toolkit.types.ts
import "zod";

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
  ToolkitEnums,
  UserEnums,
  createPaginatedResponseSchema,
  createToolSchema,
  createUserSchema,
  formatMinutesToReadable,
  loginSchema,
  minutesToDecimalHours,
  paginationMetaSchema,
  paginationSchema,
  refreshTokenSchema,
  registry,
  rfc7807ErrorSchema,
  timeStringToMinutes,
  toolIdSchema,
  toolResponseSchema,
  updateToolSchema,
  updateUserSchema,
  userIdSchema,
  userResponseSchema,
  z
};
