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
    }),
    latitude: z.number().min(-90).max(90).optional().nullable().openapi({
      description: "Latitude geogr\xE1fica do pr\xE9dio (opcional)",
      example: -29.7139
    }),
    longitude: z.number().min(-180).max(180).optional().nullable().openapi({
      description: "Longitude geogr\xE1fica do pr\xE9dio (opcional)",
      example: -53.7165
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
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
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
      error: () => "O nome deve ser um texto."
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
    isActive: z.boolean().optional(),
    imageUrl: z.string().url().optional().openapi({
      description: "URL da foto de perfil do usu\xE1rio",
      example: "https://example.com/image.jpg"
    })
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
    imageUrl: z.string().url().nullable(),
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
var PairingRequestStatus = {
  Pending: "PENDING",
  Approved: "APPROVED"
};

// src/modules/screens/screens.schemas.ts
var screenIpSchema = z.union([ipv4Schema, z.literal(""), z.null()]).optional().nullable();
var createScreenSchema = registry.register(
  "CreateScreenRequest",
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: "Nome de identifica\xE7\xE3o da tela",
      example: "Tela Recep\xE7\xE3o Principal"
    }),
    ip: screenIpSchema.openapi({
      description: "Endere\xE7o IP do dispositivo na rede",
      example: "192.168.1.50"
    }),
    buildingId: z.string().uuid().openapi({
      description: "ID do pr\xE9dio onde a tela est\xE1 instalada",
      example: "d3b07384-d113-49cd-a5d6-80d00d542fba"
    }),
    isPaired: z.boolean().default(false).openapi({
      description: "Indica se a tela est\xE1 pareada com o servidor",
      example: true
    }),
    isPrivate: z.boolean().default(false).openapi({
      description: "Indica se a tela \xE9 restrita apenas a administradores",
      example: false
    })
  })
);
var updateScreenSchema = registry.register(
  "UpdateScreenRequest",
  z.object({
    name: z.string().min(2).max(120).trim().optional(),
    ip: screenIpSchema,
    buildingId: z.string().uuid().optional(),
    isPaired: z.boolean().optional(),
    isPrivate: z.boolean().optional(),
    status: z.nativeEnum(ScreenStatus).optional(),
    pin: z.string().length(6).optional().openapi({
      description: "PIN de pareamento da tela",
      example: "A1B2C3"
    })
  }).refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualiza\xE7\xE3o."
  })
);
var screenResponseSchema = registry.register(
  "ScreenResponse",
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    ip: z.string().nullable().optional(),
    status: z.nativeEnum(ScreenStatus),
    buildingId: z.string().uuid(),
    isPaired: z.boolean(),
    isPrivate: z.boolean(),
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
var MediaFit = {
  Cover: "COVER",
  Contain: "CONTAIN",
  Fill: "FILL",
  Blur: "BLUR"
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
  textBody: z.string().openapi({
    description: "Corpo de texto caso seja um aviso escrito"
  }),
  showTitle: z.boolean().default(true).openapi({
    description: "Indica se o t\xEDtulo deve ser exibido"
  }),
  showAuthor: z.boolean().default(true).openapi({
    description: "Indica se o autor deve ser exibido"
  }),
  showQrCode: z.boolean().default(true).openapi({
    description: "Indica se o QR Code deve ser exibido"
  }),
  showTime: z.boolean().default(true).openapi({
    description: "Indica se a hora deve ser exibida"
  }),
  showScreenName: z.boolean().default(true).openapi({
    description: "Indica se o nome da tela deve ser exibido"
  }),
  showTypeBadge: z.boolean().default(true).openapi({
    description: "Indica se o badge do tipo de conte\xFAdo deve ser exibido"
  }),
  showDeadline: z.boolean().default(true).openapi({
    description: "Indica se o prazo de exibi\xE7\xE3o deve ser exibido"
  }),
  isCarousel: z.boolean().default(false).openapi({
    description: "Indica se o conte\xFAdo faz parte de um carrossel"
  }),
  isPrivate: z.boolean().default(false).openapi({
    description: "Indica se o conte\xFAdo \xE9 privado (apenas administradores podem visualizar e editar)"
  }),
  mediaFit: z.nativeEnum(MediaFit).default(MediaFit.Cover).openapi({
    description: "Modo de ajuste da m\xEDdia na tela (COVER, CONTAIN, FILL, BLUR)",
    example: MediaFit.Cover
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
var updateContentStatusSchema = registry.register(
  "UpdateContentStatusRequest",
  z.object({
    status: z.nativeEnum(ContentStatus).openapi({
      description: "Novo status do conte\xFAdo",
      example: ContentStatus.Active
    })
  })
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
    showTitle: z.boolean(),
    showAuthor: z.boolean(),
    showQrCode: z.boolean(),
    showTime: z.boolean(),
    showScreenName: z.boolean(),
    showTypeBadge: z.boolean(),
    showDeadline: z.boolean(),
    isCarousel: z.boolean(),
    isPrivate: z.boolean(),
    mediaFit: z.nativeEnum(MediaFit).default(MediaFit.Cover),
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
  }),
  // Preprocess intercepta o dado da query string antes da validação
  onlyMyCenter: z.preprocess((val) => val === "true" || val === true, z.boolean().optional()).openapi({
    description: "Filtra conte\xFAdos apenas do centro do usu\xE1rio"
  }),
  onlyMyContents: z.preprocess((val) => val === "true" || val === true, z.boolean().optional()).openapi({
    description: "Filtra conte\xFAdos apenas do usu\xE1rio logado"
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
    buildingId: z.string().uuid().optional(),
    screenId: z.string().uuid().optional(),
    contentId: z.string().uuid(),
    duration: z.number().int().min(1).default(10).openapi({
      description: "Dura\xE7\xE3o de exibi\xE7\xE3o em segundos",
      example: 10
    }),
    order: z.number().int().default(0).openapi({
      description: "Ordem de exibi\xE7\xE3o na playlist",
      example: 1
    })
  }).refine((data) => data.buildingId || data.screenId, {
    message: "\xC9 necess\xE1rio fornecer um buildingId ou um screenId."
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
    buildingId: z.string().uuid().optional(),
    screenId: z.string().uuid().optional(),
    items: z.array(
      z.object({
        id: z.string().uuid(),
        order: z.number().int()
      })
    )
  }).refine((data) => data.buildingId || data.screenId, {
    message: "\xC9 necess\xE1rio fornecer um buildingId ou um screenId."
  })
);
var playlistItemResponseSchema = registry.register(
  "PlaylistItemResponse",
  z.object({
    id: z.string().uuid(),
    buildingId: z.string().uuid().nullable().optional(),
    screenId: z.string().uuid().nullable().optional(),
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
var playlistQuerySchema = z.object({
  buildingId: z.string().uuid({ message: "UUID do pr\xE9dio inv\xE1lido." }).optional().openapi({
    param: { name: "buildingId", in: "query" }
  }),
  screenId: z.string().uuid({ message: "UUID da tela inv\xE1lido." }).optional().openapi({
    param: { name: "screenId", in: "query" }
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

// src/modules/dashboard/dashboard.schemas.ts
var dashboardCenterInfraSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  acronym: z.string().nullable(),
  color: z.string().nullable(),
  buildingsCount: z.number(),
  screensCount: z.number().optional(),
  onlineScreensCount: z.number().optional()
});
var dashboardRecentActivitySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: z.string(),
  status: z.string(),
  author: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});
var dashboardStatsSchema = registry.register(
  "DashboardStatsResponse",
  z.object({
    totalContents: z.number().openapi({ description: "Total de conte\xFAdos cadastrados", example: 42 }),
    activeContents: z.number().openapi({ description: "Conte\xFAdos em exibi\xE7\xE3o ativa", example: 12 }),
    pendingContents: z.number().openapi({
      description: "Conte\xFAdos agendados ou em rascunho",
      example: 5
    }),
    contentsByStatus: z.record(z.string(), z.number()),
    contentsByType: z.record(z.string(), z.number()),
    totalScreens: z.number().openapi({ description: "Total de telas cadastradas", example: 15 }),
    onlineScreens: z.number().openapi({ description: "Telas conectadas online", example: 10 }),
    offlineScreens: z.number().openapi({ description: "Telas desconectadas offline", example: 5 }),
    screensByStatus: z.record(z.string(), z.number()),
    totalCenters: z.number().openapi({ description: "Total de centros acad\xEAmicos", example: 4 }),
    totalBuildings: z.number().openapi({ description: "Total de pr\xE9dios mapeados", example: 18 }),
    totalUsers: z.number().openapi({ description: "Total de usu\xE1rios", example: 8 }),
    centersInfrastructure: z.array(dashboardCenterInfraSchema),
    recentActivities: z.array(dashboardRecentActivitySchema)
  })
);
var dashboardMapScreenSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  ip: z.string().nullable(),
  status: z.string(),
  isPrivate: z.boolean()
});
var dashboardMapBuildingSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  centerName: z.string(),
  centerAcronym: z.string().nullable(),
  centerColor: z.string().nullable(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  screensCount: z.number(),
  onlineScreensCount: z.number(),
  offlineScreensCount: z.number(),
  coordinates: z.object({
    ipBased: z.object({
      latitude: z.number(),
      longitude: z.number(),
      isFallback: z.boolean()
    }),
    buildingBased: z.object({
      latitude: z.number(),
      longitude: z.number(),
      isConfigured: z.boolean()
    })
  }),
  screens: z.array(dashboardMapScreenSchema)
});
var dashboardMapResponseSchema = registry.register(
  "DashboardMapResponse",
  z.object({
    center: z.object({
      latitude: z.number(),
      longitude: z.number()
    }),
    bounds: z.object({
      southwest: z.tuple([z.number(), z.number()]),
      northeast: z.tuple([z.number(), z.number()])
    }),
    buildings: z.array(dashboardMapBuildingSchema)
  })
);

// src/modules/dashboard/dashboard.types.ts
import "zod";

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
  MediaFit,
  OpenApiGeneratorV3,
  PairingRequestStatus,
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
  dashboardCenterInfraSchema,
  dashboardMapBuildingSchema,
  dashboardMapResponseSchema,
  dashboardMapScreenSchema,
  dashboardRecentActivitySchema,
  dashboardStatsSchema,
  formatMinutesToReadable,
  ipv4Schema,
  kioskPlaylistItemResponseSchema,
  kioskPlaylistResponseSchema,
  loginSchema,
  minutesToDecimalHours,
  paginationMetaSchema,
  paginationSchema,
  playlistItemIdSchema,
  playlistItemResponseSchema,
  playlistQuerySchema,
  refreshTokenSchema,
  registry,
  reorderPlaylistSchema,
  rfc7807ErrorSchema,
  screenIdSchema,
  screenIpSchema,
  screenQuerySchema,
  screenResponseSchema,
  timeStringToMinutes,
  updateBuildingSchema,
  updateCenterSchema,
  updateContentSchema,
  updateContentStatusSchema,
  updatePlaylistItemSchema,
  updateScreenSchema,
  updateUserSchema,
  uploadResponseSchema,
  userIdSchema,
  userResponseSchema,
  z
};
