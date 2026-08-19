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
var UserRole = {
  SuperAdmin: "SUPER_ADMIN",
  CenterAdmin: "CENTER_ADMIN",
  Publisher: "PUBLISHER"
};

// src/common/common.enums.ts
var SystemStatus = {
  Active: "ACTIVE",
  Inactive: "INACTIVE"
};

// src/modules/buildings/building.schemas.ts
var createBuildingSchema = registry.register(
  "CreateBuildingRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome do pr\xE9dio",
      example: "Bloco C"
    }),
    description: z.string().max(255).trim().optional().openapi({
      description: "Descri\xE7\xE3o de localiza\xE7\xE3o ou uso do pr\xE9dio",
      example: "Salas de aula e laborat\xF3rios"
    }),
    centerId: z.string().uuid().openapi({
      description: "ID do centro ao qual o pr\xE9dio pertence",
      example: "123e4567-e89b-12d3-a456-426614174000"
    })
  })
);
var updateBuildingSchema = registry.register(
  "UpdateBuildingRequest",
  createBuildingSchema.extend({
    status: z.nativeEnum(SystemStatus).openapi({
      description: "Status do pr\xE9dio",
      example: SystemStatus.Active
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var buildingResponseSchema = registry.register(
  "BuildingResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.nativeEnum(SystemStatus),
    centerId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var buildingIdSchema = z.object({
  id: z.string().uuid({ message: "O ID do pr\xE9dio deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var buildingQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: "Busca por nome ou descri\xE7\xE3o do pr\xE9dio",
    example: "Bloco"
  }),
  centerId: z.string().uuid().optional().openapi({
    description: "Filtra os pr\xE9dios por um centro espec\xEDfico"
  }),
  status: z.nativeEnum(SystemStatus).optional().openapi({
    description: "Filtra pelo status do pr\xE9dio",
    example: SystemStatus.Active
  })
});

// src/modules/centers/center.schemas.ts
var createCenterSchema = registry.register(
  "CreateCenterRequest",
  z.object({
    name: z.string().min(2).max(150).trim().openapi({
      description: "Nome do Centro Acad\xEAmico",
      example: "Centro de Ci\xEAncias Tecnol\xF3gicas"
    }),
    acronym: z.string().min(2).max(10).trim().toUpperCase().openapi({
      description: "Sigla do Centro",
      example: "CCT"
    }),
    color: z.string().regex(
      /^#[0-9A-Fa-f]{6}$/i,
      "A cor deve ser um valor hexadecimal v\xE1lido (ex: #3b82f6)"
    ).openapi({
      description: "C\xF3digo hexadecimal da cor para a interface",
      example: "#3b82f6"
    })
  })
);
var updateCenterSchema = registry.register(
  "UpdateCenterRequest",
  createCenterSchema.extend({
    status: z.nativeEnum(SystemStatus).openapi({
      description: "Status de atividade do Centro",
      example: SystemStatus.Active
    })
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var centerResponseSchema = registry.register(
  "CenterResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    acronym: z.string(),
    color: z.string(),
    status: z.nativeEnum(SystemStatus),
    buildings: z.array(buildingResponseSchema).optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var centerIdSchema = z.object({
  id: z.string().uuid({ message: "O ID do centro deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var centerQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: "Busca por nome ou sigla do Centro",
    example: "Tecnol\xF3gicas"
  }),
  status: z.nativeEnum(SystemStatus).optional().openapi({
    description: "Filtra pelo status do Centro",
    example: SystemStatus.Active
  }),
  includeBuildings: z.coerce.boolean().optional().default(false).openapi({
    description: "Se verdadeiro, inclui os pr\xE9dios vinculados ao centro na resposta"
  }),
  includeScreens: z.coerce.boolean().optional().default(false).openapi({
    description: "Se verdadeiro, inclui as telas vinculadas ao centro na resposta"
  })
});

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
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
      description: "Senha do usu\xE1rio com crit\xE9rios de seguran\xE7a",
      example: "Senha@123"
    }),
    role: z.nativeEnum(UserRole).default(UserRole.Publisher).openapi({
      description: "Fun\xE7\xE3o do usu\xE1rio no sistema",
      example: UserRole.Publisher
    }),
    centerId: z.string().uuid().nullish().openapi({
      description: "UUID do Centro Acad\xEAmico associado ao usu\xE1rio",
      example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
    }),
    isActive: z.boolean().default(true).optional()
  })
);
var updateUserSchema = registry.register(
  "UpdateUserRequest",
  z.object({
    name: z.string({
      error: ({ input }) => "O nome deve ser um texto."
    }).min(2, { message: "Nome muito curto." }).max(120, { message: "Nome muito longo." }).trim().optional().openapi({
      description: "Nome completo do usu\xE1rio",
      example: "Usu\xE1rio de Teste Atualizado"
    }),
    email: z.email({ message: "Formato de e-mail inv\xE1lido." }).transform((v) => v.toLowerCase()).optional().openapi({
      description: "E-mail exclusivo do usu\xE1rio para login",
      example: "test_updated@example.com"
    }),
    password: z.string().min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).optional().openapi({
      description: "Nova senha do usu\xE1rio (opcional, com crit\xE9rios de seguran\xE7a)",
      example: "NovaSenha@123"
    }),
    role: z.nativeEnum(UserRole).optional().openapi({
      description: "Fun\xE7\xE3o do usu\xE1rio no sistema",
      example: UserRole.CenterAdmin
    }),
    centerId: z.string().uuid().nullish().openapi({
      description: "UUID do Centro Acad\xEAmico associado ao usu\xE1rio",
      example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
    }),
    isActive: z.boolean().optional()
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var userResponseSchema = registry.register(
  "UserResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
    isActive: z.boolean(),
    centerId: z.string().uuid().nullable(),
    center: centerResponseSchema.optional(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    temporaryPassword: z.string().optional()
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
var ipv4Schema = z.string().refine(
  (value) => {
    const parts = value.split(".");
    return parts.length === 4 && parts.every((part) => {
      if (!/^\d+$/.test(part)) return false;
      const num = Number(part);
      return num >= 0 && num <= 255;
    });
  },
  {
    message: "Endere\xE7o IPv4 inv\xE1lido."
  }
);

// src/modules/screens/screens.enums.ts
var ScreenStatus = {
  Online: "ONLINE",
  Offline: "OFFLINE",
  Syncing: "SYNCING"
};

// src/modules/screens/screens.schemas.ts
var createScreenSchema = registry.register(
  "CreateScreenRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome de identifica\xE7\xE3o da tela",
      example: "Tela Recep\xE7\xE3o Principal"
    }),
    ip: ipv4Schema.openapi({
      description: "Endere\xE7o IP do dispositivo na rede",
      example: "192.168.1.50"
    }),
    buildingId: z.string().uuid().openapi({
      description: "ID do pr\xE9dio onde a tela est\xE1 instalada",
      example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
    })
  })
);
var updateScreenSchema = registry.register(
  "UpdateScreenRequest",
  z.object({
    name: z.string().min(2).max(120).trim().optional(),
    ip: ipv4Schema.optional(),
    buildingId: z.string().uuid().optional(),
    status: z.nativeEnum(ScreenStatus).optional()
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var screenResponseSchema = registry.register(
  "ScreenResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    ip: z.string(),
    status: z.nativeEnum(ScreenStatus),
    buildingId: z.string().uuid(),
    building: buildingResponseSchema.optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  })
);
var screenIdSchema = z.object({
  id: z.string().uuid({ message: "O ID da tela deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var screenQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({ description: "Busca por nome ou IP" }),
  status: z.nativeEnum(ScreenStatus).optional(),
  centerId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional()
});

// src/modules/content/content.enums.ts
var ContentType = {
  Image: "IMAGE",
  Video: "VIDEO",
  Notice: "NOTICE",
  WebUrl: "WEB_URL"
};
var ContentStatus = {
  Draft: "DRAFT",
  Scheduled: "SCHEDULED",
  Active: "ACTIVE",
  Expired: "EXPIRED",
  Archived: "ARCHIVED"
};

// src/modules/content/content.schemas.ts
var baseContentSchema = z.object({
  title: z.string().min(2).max(120).trim().openapi({
    description: "T\xEDtulo do conte\xFAdo",
    example: "Aviso de Manuten\xE7\xE3o"
  }),
  type: z.nativeEnum(ContentType).openapi({
    description: "Tipo de m\xEDdia do conte\xFAdo",
    example: ContentType.Image
  }),
  status: z.nativeEnum(ContentStatus).optional().openapi({
    description: "Status do conte\xFAdo",
    example: ContentStatus.Draft
  }),
  startDate: z.coerce.date().optional().openapi({
    description: "Data de in\xEDcio de exibi\xE7\xE3o",
    example: "2026-08-20T08:00:00Z"
  }),
  endDate: z.coerce.date().optional().openapi({
    description: "Data de fim de exibi\xE7\xE3o",
    example: "2026-08-30T18:00:00Z"
  }),
  author: z.string().max(100).optional().openapi({
    description: "Nome do autor ou departamento respons\xE1vel",
    example: "Departamento de TI"
  }),
  contentUrl: z.string().url().optional().openapi({
    description: "URL do conte\xFAdo"
  }),
  mediaUrl: z.string().url().optional().openapi({
    description: "URL da m\xEDdia principal (imagem, v\xEDdeo ou p\xE1gina web)"
  }),
  textBody: z.string().optional().openapi({
    description: "Corpo de texto caso seja um aviso escrito"
  })
});
var createContentSchema = registry.register(
  "CreateContentRequest",
  baseContentSchema.refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    },
    {
      message: "A data de fim deve ser posterior \xE0 data de in\xEDcio.",
      path: ["endDate"]
    }
  )
);
var updateContentSchema = registry.register(
  "UpdateContentRequest",
  baseContentSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  }).refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    },
    {
      message: "A data de fim deve ser posterior \xE0 data de in\xEDcio.",
      path: ["endDate"]
    }
  )
);
var contentResponseSchema = registry.register(
  "ContentResponse",
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    type: z.nativeEnum(ContentType),
    status: z.nativeEnum(ContentStatus),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    author: z.string().nullable(),
    contentUrl: z.string().nullable(),
    mediaUrl: z.string().nullable(),
    textBody: z.string().nullable(),
    ownerId: z.string().uuid(),
    owner: userResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var contentIdSchema = z.object({
  id: z.string().uuid({ message: "O ID do conte\xFAdo deve ser um UUID v\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var contentQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: "Busca por t\xEDtulo ou autor",
    example: "Manuten\xE7\xE3o"
  }),
  status: z.nativeEnum(ContentStatus).optional().openapi({
    description: "Filtra pelo status do conte\xFAdo",
    example: ContentStatus.Active
  }),
  type: z.nativeEnum(ContentType).optional().openapi({
    description: "Filtra pelo tipo do conte\xFAdo",
    example: ContentType.Image
  })
});

// src/modules/upload/upload.schemas.ts
var uploadResponseSchema = registry.register(
  "UploadResponse",
  z.object({
    url: z.string().openapi({
      description: "URL p\xFAblica est\xE1tica do arquivo salvo no servidor",
      example: "/uploads/a1b2c3d4e5f6g7h8.jpg"
    })
  })
);

// src/modules/upload/upload.types.ts
import "zod";

// src/modules/playlist/playlist.schemas.ts
var createPlaylistItemSchema = registry.register(
  "CreatePlaylistItemRequest",
  z.object({
    buildingId: z.string().uuid(),
    contentId: z.string().uuid(),
    duration: z.number().int().min(1).default(10).openapi({
      description: "Dura\xE7\xE3o de exibi\xE7\xE3o em segundos",
      example: 10
    }),
    order: z.number().int().default(0).openapi({
      description: "Ordem de exibi\xE7\xE3o na playlist",
      example: 1
    })
  })
);
var updatePlaylistItemSchema = registry.register(
  "UpdatePlaylistItemRequest",
  z.object({
    duration: z.number().int().min(1).optional(),
    order: z.number().int().optional()
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo (duration ou order) deve ser fornecido."
  })
);
var reorderPlaylistSchema = registry.register(
  "ReorderPlaylistRequest",
  z.object({
    buildingId: z.string().uuid(),
    items: z.array(
      z.object({
        id: z.string().uuid(),
        order: z.number().int()
      })
    )
  })
);
var playlistItemResponseSchema = registry.register(
  "PlaylistItemResponse",
  z.object({
    id: z.string().uuid(),
    buildingId: z.string().uuid(),
    contentId: z.string().uuid(),
    duration: z.number().int(),
    order: z.number().int(),
    content: contentResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date()
  })
);
var playlistItemIdSchema = z.object({
  id: z.string().uuid({ message: "UUID inv\xE1lido." }).openapi({
    param: { name: "id", in: "path" }
  })
});
var playlistBuildingQuerySchema = z.object({
  buildingId: z.string().uuid({ message: "UUID do pr\xE9dio inv\xE1lido." }).openapi({
    param: { name: "buildingId", in: "path" }
  })
});

// src/modules/kiosk/kiosk.schemas.ts
var kioskPlaylistItemResponseSchema = registry.register(
  "KioskPlaylistItemResponse",
  z.object({
    id: z.string().uuid(),
    duration: z.number().int(),
    order: z.number().int(),
    content: contentResponseSchema
  })
);
var kioskPlaylistResponseSchema = registry.register(
  "KioskPlaylistResponse",
  z.object({
    screenName: z.string(),
    lastUpdated: z.string().nullable().openapi({
      description: "Timestamp ISO da \xFAltima altera\xE7\xE3o na playlist (usado para checar sincroniza\xE7\xE3o)",
      example: "2026-08-17T20:00:00.000Z"
    }),
    items: z.array(kioskPlaylistItemResponseSchema)
  })
);

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
  ContentStatus,
  ContentType,
  OpenApiGeneratorV3,
  ScreenStatus,
  SystemStatus,
  UserRole,
  buildingIdSchema,
  buildingQuerySchema,
  buildingResponseSchema,
  centerIdSchema,
  centerQuerySchema,
  centerResponseSchema,
  contentIdSchema,
  contentQuerySchema,
  contentResponseSchema,
  createBuildingSchema,
  createCenterSchema,
  createContentSchema,
  createPaginatedResponseSchema,
  createPlaylistItemSchema,
  createScreenSchema,
  createUserSchema,
  formatMinutesToReadable,
  ipv4Schema,
  kioskPlaylistItemResponseSchema,
  kioskPlaylistResponseSchema,
  loginSchema,
  minutesToDecimalHours,
  paginationMetaSchema,
  paginationSchema,
  playlistBuildingQuerySchema,
  playlistItemIdSchema,
  playlistItemResponseSchema,
  refreshTokenSchema,
  registry,
  reorderPlaylistSchema,
  rfc7807ErrorSchema,
  screenIdSchema,
  screenQuerySchema,
  screenResponseSchema,
  timeStringToMinutes,
  updateBuildingSchema,
  updateCenterSchema,
  updateContentSchema,
  updatePlaylistItemSchema,
  updateScreenSchema,
  updateUserSchema,
  uploadResponseSchema,
  userIdSchema,
  userResponseSchema,
  z
};
