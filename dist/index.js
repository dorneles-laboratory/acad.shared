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
    isActive: z.boolean().default(true).optional()
  })
);
var updateUserSchema = createUserSchema.partial().omit({ password: true }).extend({
  password: z.string().min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
    description: "Nova senha do usu\xE1rio (opcional, com crit\xE9rios de seguran\xE7a)",
    example: "NovaSenha@123"
  }),
  isActive: z.boolean().optional()
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
    isActive: z.boolean(),
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

// src/modules/property/property.enums.ts
var PropertyStatus = {
  Active: "ACTIVE",
  Configure: "CONFIGURE"
};

// src/modules/property/property.schemas.ts
var createPropertySchema = registry.register(
  "CreatePropertyRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome da propriedade",
      example: "Fazenda Rio Grande"
    }),
    location: z.string().min(2).max(120).trim().openapi({
      description: "Localiza\xE7\xE3o/Cidade da propriedade",
      example: "Santa Maria, RS"
    }),
    car: z.string().min(5).trim().optional().openapi({
      description: "Cadastro Ambiental Rural (CAR)",
      example: "RS-4316907-1A2B3C4D5E6F7G8H9I0J"
    })
  })
);
var updatePropertySchema = registry.register(
  "UpdatePropertyRequest",
  createPropertySchema.extend({
    status: z.nativeEnum(PropertyStatus).openapi({
      description: "Status de configura\xE7\xE3o da propriedade",
      example: PropertyStatus.Active
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var propertyResponseSchema = registry.register(
  "PropertyResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    car: z.string().nullable(),
    status: z.nativeEnum(PropertyStatus),
    ownerId: z.string().uuid(),
    owner: userResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var propertyIdSchema = z.object({
  id: z.string().uuid({ message: "O ID da propriedade deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var propertyQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: "Busca por nome, cidade ou CAR",
    example: "Fazenda"
  }),
  status: z.nativeEnum(PropertyStatus).optional().openapi({
    description: "Filtra pelo status da propriedade",
    example: PropertyStatus.Active
  })
});

// src/modules/field/field.enums.ts
var FieldStatus = {
  Ready: "READY",
  Processing: "PROCESSING",
  Waiting: "WAITING"
};

// src/modules/field/field.schemas.ts
var coordinateSchema = z.object({
  x: z.number(),
  y: z.number()
});
var createFieldSchema = registry.register(
  "CreateFieldRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome do talh\xE3o",
      example: "Talh\xE3o da Sede"
    }),
    soilType: z.string().optional().openapi({
      description: "Tipo de solo",
      example: "Latossolo Vermelho"
    }),
    coordinates: z.array(coordinateSchema).min(3).openapi({
      description: "V\xE9rtices do pol\xEDgono desenhado"
    }),
    propertyId: z.string().uuid().openapi({
      description: "ID da propriedade a qual este talh\xE3o pertence"
    })
  })
);
var updateFieldSchema = registry.register(
  "UpdateFieldRequest",
  createFieldSchema.omit({ propertyId: true }).extend({
    status: z.nativeEnum(FieldStatus).openapi({
      description: "Status de processamento do talh\xE3o",
      example: FieldStatus.Ready
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var fieldResponseSchema = registry.register(
  "FieldResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    soilType: z.string().nullable(),
    area: z.number().nullable(),
    perimeter: z.number().nullable(),
    coordinates: z.any().nullable(),
    status: z.nativeEnum(FieldStatus),
    propertyId: z.string().uuid(),
    property: propertyResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var fieldIdSchema = z.object({
  id: z.string().uuid({ message: "O ID do talh\xE3o deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var fieldQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  propertyId: z.string().uuid().optional().openapi({
    description: "Filtra os talh\xF5es por uma propriedade espec\xEDfica"
  }),
  query: z.string().optional().openapi({
    description: "Busca por nome ou c\xF3digo do talh\xE3o",
    example: "TAL-001"
  }),
  status: z.nativeEnum(FieldStatus).optional().openapi({
    description: "Filtra pelo status do talh\xE3o",
    example: FieldStatus.Ready
  })
});

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
  FieldStatus,
  OpenApiGeneratorV3,
  PropertyStatus,
  coordinateSchema,
  createFieldSchema,
  createPaginatedResponseSchema,
  createPropertySchema,
  createUserSchema,
  fieldIdSchema,
  fieldQuerySchema,
  fieldResponseSchema,
  formatMinutesToReadable,
  loginSchema,
  minutesToDecimalHours,
  paginationMetaSchema,
  paginationSchema,
  propertyIdSchema,
  propertyQuerySchema,
  propertyResponseSchema,
  refreshTokenSchema,
  registry,
  rfc7807ErrorSchema,
  timeStringToMinutes,
  updateFieldSchema,
  updatePropertySchema,
  updateUserSchema,
  userIdSchema,
  userResponseSchema,
  z
};
