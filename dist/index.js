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
var registerStudentSchema = registry.register(
  "RegisterStudentRequest",
  z.object({
    name: z.string({
      error: ({ input }) => input === void 0 ? "O nome \xE9 obrigat\xF3rio." : "O nome deve ser um texto."
    }).min(2, { message: "Nome deve ter no m\xEDnimo 2 caracteres." }).max(100, { message: "Nome deve ter no m\xE1ximo 100 caracteres." }).openapi({
      description: "Nome completo do estudante",
      example: "Laura Dorneles"
    }),
    email: z.email({
      error: ({ input }) => input === void 0 ? "O e-mail \xE9 obrigat\xF3rio." : "Formato de e-mail inv\xE1lido."
    }).min(1, { message: "O e-mail \xE9 obrigat\xF3rio." }).transform((value) => value.toLowerCase()).openapi({
      description: "E-mail institucional ou pessoal do estudante",
      example: "estudante@universidade.edu.br"
    }),
    password: z.string({
      error: ({ input }) => input === void 0 ? "A senha \xE9 obrigat\xF3ria." : "A senha deve ser um texto."
    }).min(8, { message: "Senha deve ter no m\xEDnimo 8 caracteres." }).max(64, { message: "Senha deve ter no m\xE1ximo 64 caracteres." }).regex(/[A-Z]/, { message: "Senha deve conter letra mai\xFAscula." }).regex(/[a-z]/, { message: "Senha deve conter letra min\xFAscula." }).regex(/[0-9]/, { message: "Senha deve conter n\xFAmero." }).openapi({
      description: "Senha de acesso",
      example: "Senha@123"
    }),
    university: z.string().min(2, { message: "Institui\xE7\xE3o de ensino deve ter no m\xEDnimo 2 caracteres." }).optional().openapi({
      description: "Universidade ou Faculdade",
      example: "UFSM"
    }),
    campus: z.string().optional().openapi({
      description: "Campus universit\xE1rio",
      example: "Sede - Santa Maria"
    }),
    course: z.string().min(2, { message: "Curso deve ter no m\xEDnimo 2 caracteres." }).optional().openapi({
      description: "Curso de gradua\xE7\xE3o ou p\xF3s",
      example: "Ci\xEAncia da Computa\xE7\xE3o"
    }),
    currentSemester: z.number().int().min(1).max(20).optional().openapi({
      description: "Semestre atual",
      example: 3
    })
  })
);
var userResponseSchema = registry.register(
  "UserResponse",
  z.object({
    id: z.string().uuid().openapi({
      description: "Identificador \xFAnico do usu\xE1rio",
      example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
    }),
    name: z.string().openapi({
      description: "Nome completo",
      example: "Laura Dorneles"
    }),
    email: z.string().email().openapi({
      description: "E-mail",
      example: "estudante@universidade.edu.br"
    }),
    role: z.enum(["STUDENT", "ADMIN", "ADVISOR"]).openapi({
      description: "Papel do usu\xE1rio no sistema",
      example: "STUDENT"
    }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
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
var UserRole = {
  Student: "STUDENT",
  Admin: "ADMIN",
  Advisor: "ADVISOR"
};

// src/modules/student/student.enums.ts
var StudentEnums = {
  Shift: {
    Morning: "MANHA",
    Afternoon: "TARDE",
    Night: "NOITE",
    FullTime: "INTEGRAL"
  }
};

// src/modules/student/student.schemas.ts
var studentProfileSchema = registry.register(
  "StudentProfile",
  z.object({
    id: z.string().uuid().openapi({ description: "ID do perfil acad\xEAmico" }),
    userId: z.string().uuid().openapi({ description: "ID do usu\xE1rio associado" }),
    university: z.string().openapi({ description: "Institui\xE7\xE3o de ensino superior", example: "UFSM" }),
    campus: z.string().nullable().optional().openapi({ description: "Campus universit\xE1rio", example: "Sede" }),
    course: z.string().openapi({ description: "Curso de gradua\xE7\xE3o", example: "Ci\xEAncia da Computa\xE7\xE3o" }),
    currentSemester: z.number().int().min(1).max(20).openapi({ description: "Semestre atual", example: 4 }),
    registrationId: z.string().nullable().optional().openapi({ description: "N\xFAmero de matr\xEDcula acad\xEAmica", example: "202310123" }),
    shift: z.enum(["MANHA", "TARDE", "NOITE", "INTEGRAL"]).nullable().optional().openapi({ description: "Turno do curso" }),
    expectedGraduationYear: z.number().int().nullable().optional().openapi({ description: "Ano previsto de formatura", example: 2027 }),
    bio: z.string().nullable().optional().openapi({ description: "Biografia acad\xEAmica / apresenta\xE7\xE3o pessoal" }),
    interests: z.array(z.string()).default([]).openapi({ description: "T\xF3picos de interesse e pesquisa", example: ["Intelig\xEAncia Artificial", "Web Dev"] }),
    academicGoals: z.array(z.string()).default([]).openapi({ description: "Metas acad\xEAmicas do ciclo atual" }),
    lattesUrl: z.string().url().nullable().optional().openapi({ description: "Link do curr\xEDculo Lattes" }),
    linkedinUrl: z.string().url().nullable().optional().openapi({ description: "Link do perfil no LinkedIn" }),
    githubUrl: z.string().url().nullable().optional().openapi({ description: "Link do perfil no GitHub" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
);
var updateStudentProfileSchema = registry.register(
  "UpdateStudentProfileRequest",
  studentProfileSchema.omit({ id: true, userId: true, createdAt: true, updatedAt: true }).partial()
);

// src/modules/opportunity/opportunity.enums.ts
var OpportunityCategory = {
  Scholarship: "SCHOLARSHIP",
  ResearchGrant: "RESEARCH_GRANT",
  TeachingAssistant: "TEACHING_ASSISTANT",
  Extension: "EXTENSION",
  Internship: "INTERNSHIP",
  Exchange: "EXCHANGE",
  GraduateProgram: "GRADUATE_PROGRAM",
  Event: "EVENT",
  Hackathon: "HACKATHON"
};
var OpportunityStatus = {
  Open: "OPEN",
  Closed: "CLOSED",
  Archived: "ARCHIVED"
};
var OpportunityModality = {
  Presential: "PRESENTIAL",
  Remote: "REMOTE",
  Hybrid: "HYBRID"
};
var AcademicLevel = {
  Graduation: "GRADUATION",
  PostGraduation: "POST_GRADUATION",
  Technical: "TECHNICAL"
};
var ApplicationStatus = {
  Draft: "DRAFT",
  Submitted: "SUBMITTED",
  Review: "REVIEW",
  Accepted: "ACCEPTED",
  Rejected: "REJECTED",
  Withdrawn: "WITHDRAWN"
};

// src/modules/opportunity/opportunity.schemas.ts
var opportunitySchema = registry.register(
  "Opportunity",
  z.object({
    id: z.string().uuid().openapi({ description: "ID da oportunidade/edital" }),
    title: z.string().min(2).openapi({ description: "T\xEDtulo do edital ou vaga", example: "Bolsa FAPERGS Inicia\xE7\xE3o Cient\xEDfica 2026" }),
    institution: z.string().min(2).openapi({ description: "Institui\xE7\xE3o ou \xF3rg\xE3o fomentador", example: "UFSM / FAPERGS" }),
    institutionLogo: z.string().nullable().optional().openapi({ description: "Logo ou sigla da institui\xE7\xE3o" }),
    description: z.string().openapi({ description: "Descri\xE7\xE3o detalhada do edital e objetivos" }),
    category: z.enum([
      "SCHOLARSHIP",
      "RESEARCH_GRANT",
      "TEACHING_ASSISTANT",
      "EXTENSION",
      "INTERNSHIP",
      "EXCHANGE",
      "GRADUATE_PROGRAM",
      "EVENT",
      "HACKATHON"
    ]).openapi({ description: "Categoria da oportunidade" }),
    modality: z.enum(["PRESENTIAL", "REMOTE", "HYBRID"]).default("PRESENTIAL").openapi({ description: "Modalidade de atua\xE7\xE3o" }),
    level: z.enum(["GRADUATION", "POST_GRADUATION", "TECHNICAL"]).default("GRADUATION").openapi({ description: "N\xEDvel de forma\xE7\xE3o exigido" }),
    value: z.string().nullable().optional().openapi({ description: "Remunera\xE7\xE3o ou valor da bolsa", example: "R$ 700,00/m\xEAs" }),
    benefits: z.array(z.string()).default([]).openapi({ description: "Benef\xEDcios adicionais da vaga" }),
    requirements: z.array(z.string()).default([]).openapi({ description: "Requisitos m\xEDnimos obrigat\xF3rios" }),
    targetCourses: z.array(z.string()).default([]).openapi({ description: "Cursos eleg\xEDveis" }),
    deadline: z.string().openapi({ description: "Data limite para inscri\xE7\xE3o (ISO)", example: "2026-10-15T23:59:59Z" }),
    publishedAt: z.string().openapi({ description: "Data de publica\xE7\xE3o" }),
    matchScore: z.number().int().min(0).max(100).default(0).openapi({ description: "Grau de compatibilidade com o perfil do estudante (0-100)", example: 88 }),
    externalUrl: z.string().url().nullable().optional().openapi({ description: "Link oficial do edital/inscri\xE7\xE3o" }),
    status: z.enum(["OPEN", "CLOSED", "ARCHIVED"]).default("OPEN").openapi({ description: "Situa\xE7\xE3o do edital" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
);
var createOpportunitySchema = registry.register(
  "CreateOpportunityRequest",
  opportunitySchema.omit({ id: true, matchScore: true, createdAt: true, updatedAt: true })
);
var updateOpportunitySchema = registry.register(
  "UpdateOpportunityRequest",
  createOpportunitySchema.partial()
);
var applicationSchema = registry.register(
  "Application",
  z.object({
    id: z.string().uuid().openapi({ description: "ID da candidatura no Kanban" }),
    studentId: z.string().uuid().openapi({ description: "ID do estudante" }),
    opportunityId: z.string().uuid().openapi({ description: "ID da oportunidade" }),
    status: z.enum(["DRAFT", "SUBMITTED", "REVIEW", "ACCEPTED", "REJECTED", "WITHDRAWN"]).default("DRAFT").openapi({ description: "Coluna no Kanban de candidaturas" }),
    notes: z.string().nullable().optional().openapi({ description: "Anota\xE7\xF5es pessoais do estudante" }),
    appliedAt: z.string().nullable().optional().openapi({ description: "Data de envio da candidatura" }),
    opportunity: opportunitySchema.optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
);
var createApplicationSchema = registry.register(
  "CreateApplicationRequest",
  z.object({
    opportunityId: z.string().uuid().openapi({ description: "ID da oportunidade a se candidatar" }),
    status: z.enum(["DRAFT", "SUBMITTED", "REVIEW", "ACCEPTED", "REJECTED", "WITHDRAWN"]).default("DRAFT"),
    notes: z.string().optional()
  })
);
var updateApplicationStatusSchema = registry.register(
  "UpdateApplicationStatusRequest",
  z.object({
    status: z.enum(["DRAFT", "SUBMITTED", "REVIEW", "ACCEPTED", "REJECTED", "WITHDRAWN"]).openapi({ description: "Novo status / coluna" }),
    notes: z.string().optional()
  })
);
var opportunityFilterQuerySchema = registry.register(
  "OpportunityFilterQuery",
  z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    modality: z.string().optional(),
    level: z.string().optional(),
    minMatch: z.coerce.number().int().min(0).max(100).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12)
  })
);

// src/modules/experience/experience.enums.ts
var ExperienceType = {
  Project: "PROJECT",
  Internship: "INTERNSHIP",
  Research: "RESEARCH",
  Extension: "EXTENSION",
  Teaching: "TEACHING",
  Competition: "COMPETITION",
  Event: "EVENT"
};
var ExperienceStatus = {
  InProgress: "IN_PROGRESS",
  Completed: "COMPLETED",
  Paused: "PAUSED"
};

// src/modules/experience/experience.schemas.ts
var experienceSchema = registry.register(
  "Experience",
  z.object({
    id: z.string().uuid().openapi({ description: "ID da viv\xEAncia pr\xE1tica" }),
    studentId: z.string().uuid().openapi({ description: "ID do estudante" }),
    title: z.string().min(2).openapi({ description: "T\xEDtulo da atividade ou projeto", example: "Inicia\xE7\xE3o Cient\xEDfica em Redes Neurais" }),
    type: z.enum([
      "PROJECT",
      "INTERNSHIP",
      "RESEARCH",
      "EXTENSION",
      "TEACHING",
      "COMPETITION",
      "EVENT"
    ]).openapi({ description: "Tipo fundamental de viv\xEAncia pr\xE1tica" }),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "PAUSED"]).default("IN_PROGRESS").openapi({ description: "Estado da experi\xEAncia" }),
    role: z.string().min(2).openapi({ description: "Papel exercido", example: "Pesquisador Bolsista PIBIC" }),
    institution: z.string().min(2).openapi({ description: "Institui\xE7\xE3o ou organiza\xE7\xE3o vinculada", example: "Laborat\xF3rio de Intelig\xEAncia Artificial / UFSM" }),
    advisor: z.string().nullable().optional().openapi({ description: "Orientador ou supervisor", example: "Prof. Dr. Dorneles" }),
    startDate: z.string().openapi({ description: "Data de in\xEDcio (ISO)", example: "2025-03-01T00:00:00Z" }),
    endDate: z.string().nullable().optional().openapi({ description: "Data de t\xE9rmino (ISO)" }),
    weeklyHours: z.number().int().min(1).max(60).default(20).openapi({ description: "Carga hor\xE1ria semanal dedicada", example: 20 }),
    totalHours: z.number().int().min(0).default(0).openapi({ description: "Total de horas acumuladas", example: 160 }),
    description: z.string().openapi({ description: "Resumo das atividades desenvolvidas e resultados" }),
    skills: z.array(z.string()).default([]).openapi({ description: "Compet\xEAncias e tecnologias aplicadas", example: ["Python", "PyTorch", "Metodologia Cient\xEDfica"] }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
);
var createExperienceSchema = registry.register(
  "CreateExperienceRequest",
  experienceSchema.omit({ id: true, studentId: true, totalHours: true, createdAt: true, updatedAt: true })
);
var updateExperienceSchema = registry.register(
  "UpdateExperienceRequest",
  createExperienceSchema.partial()
);

// src/modules/memory/memory.enums.ts
var MemoryFormat = {
  Text: "TEXT",
  Audio: "AUDIO",
  Image: "IMAGE",
  Multimedia: "MULTIMEDIA"
};
var MemoryType = {
  Aprendizado: "APRENDIZADO",
  Reflexao: "REFLEXAO",
  Insight: "INSIGHT",
  Conquista: "CONQUISTA",
  Duvida: "DUVIDA"
};

// src/modules/memory/memory.schemas.ts
var memorySchema = registry.register(
  "AcademicMemory",
  z.object({
    id: z.string().uuid().openapi({ description: "ID do registro de mem\xF3ria" }),
    studentId: z.string().uuid().openapi({ description: "ID do estudante autor" }),
    title: z.string().min(1).default("Anota\xE7\xE3o").openapi({ description: "T\xEDtulo ou resumo do registro" }),
    content: z.string().min(1).openapi({ description: "Conte\xFAdo textual ou transcri\xE7\xE3o do \xE1udio" }),
    type: z.enum(["APRENDIZADO", "REFLEXAO", "INSIGHT", "CONQUISTA", "DUVIDA"]).default("APRENDIZADO").openapi({ description: "Natureza da reflex\xE3o" }),
    format: z.enum(["TEXT", "AUDIO", "IMAGE", "MULTIMEDIA"]).default("TEXT").openapi({ description: "Formato da mem\xF3ria" }),
    tags: z.array(z.string()).default([]).openapi({ description: "Etiquetas tem\xE1ticas", example: ["Banco de Dados", "Normaliza\xE7\xE3o"] }),
    course: z.string().nullable().optional().openapi({ description: "Disciplina ou projeto associado", example: "Banco de Dados II" }),
    experienceId: z.string().uuid().nullable().optional().openapi({ description: "V\xEDnculo opcional a uma experi\xEAncia pr\xE1tica" }),
    audioUrl: z.string().url().nullable().optional().openapi({ description: "URL do arquivo de \xE1udio gravado" }),
    audioDuration: z.number().int().nullable().optional().openapi({ description: "Dura\xE7\xE3o do \xE1udio em segundos" }),
    date: z.string().openapi({ description: "Data do fato relatado (ISO)" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
  })
);
var createMemorySchema = registry.register(
  "CreateMemoryRequest",
  memorySchema.omit({ id: true, studentId: true, createdAt: true, updatedAt: true })
);
var updateMemorySchema = registry.register(
  "UpdateMemoryRequest",
  createMemorySchema.partial()
);

// src/modules/wallet/wallet.enums.ts
var TransactionType = {
  StripePurchase: "STRIPE_PURCHASE",
  AiUsage: "AI_USAGE",
  CommunityDonationOut: "COMMUNITY_DONATION_OUT",
  CommunityDonationIn: "COMMUNITY_DONATION_IN",
  WelcomeBonus: "WELCOME_BONUS",
  AdminGrant: "ADMIN_GRANT"
};
var SolidaryStatus = {
  None: "NONE",
  Pending: "PENDING",
  Approved: "APPROVED",
  Rejected: "REJECTED"
};

// src/modules/wallet/wallet.schemas.ts
var userWalletSchema = registry.register(
  "UserWallet",
  z.object({
    id: z.string().uuid().openapi({ description: "ID da carteira de tokens" }),
    userId: z.string().uuid().openapi({ description: "ID do usu\xE1rio" }),
    tokenBalance: z.number().int().min(0).default(50).openapi({ description: "Saldo dispon\xEDvel em Tokens (Tk)", example: 250 }),
    isSolidaryBeneficiary: z.boolean().default(false).openapi({ description: "Indica se recebe tokens do Banco Comunit\xE1rio" }),
    solidaryStatus: z.enum(["NONE", "PENDING", "APPROVED", "REJECTED"]).default("NONE"),
    updatedAt: z.string().optional()
  })
);
var tokenTransactionSchema = registry.register(
  "TokenTransaction",
  z.object({
    id: z.string().uuid().openapi({ description: "ID da transa\xE7\xE3o" }),
    walletId: z.string().uuid().openapi({ description: "ID da carteira" }),
    amount: z.number().int().openapi({ description: "Quantidade de tokens debitados ou creditados (+/-)", example: 120 }),
    type: z.enum([
      "STRIPE_PURCHASE",
      "AI_USAGE",
      "COMMUNITY_DONATION_OUT",
      "COMMUNITY_DONATION_IN",
      "WELCOME_BONUS",
      "ADMIN_GRANT"
    ]).openapi({ description: "Tipo da transa\xE7\xE3o" }),
    description: z.string().openapi({ description: "Descri\xE7\xE3o da movimenta\xE7\xE3o", example: "Recarga Card\xE1pio Universit\xE1rio" }),
    createdAt: z.string().optional()
  })
);
var simulateRechargeSchema = registry.register(
  "SimulateRechargeRequest",
  z.object({
    amountReals: z.number().min(2.5, { message: "O valor m\xEDnimo de apoio \xE9 de R$ 2,50." }).openapi({ description: "Valor da contribui\xE7\xE3o em Reais (m\xEDnimo R$ 2,50)", example: 5 })
  })
);
var rechargeSimulationResultSchema = registry.register(
  "RechargeSimulationResult",
  z.object({
    amountReals: z.number(),
    netAmountAfterFees: z.number(),
    tokensGenerated: z.number().int(),
    bonusTokens: z.number().int(),
    totalTokens: z.number().int(),
    purchasingPower: z.object({
      opportunitiesSearches: z.number().int(),
      aiChatQuestions: z.number().int(),
      lattesAudits: z.number().int()
    })
  })
);
var createCheckoutSessionSchema = registry.register(
  "CreateCheckoutSessionRequest",
  z.object({
    amountReals: z.number().min(2.5, { message: "O valor m\xEDnimo de recarga \xE9 de R$ 2,50." }),
    menuItemName: z.string().optional()
  })
);

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

// src/common/common.enums.ts
var SystemStatus = {
  Active: "ACTIVE",
  Inactive: "INACTIVE"
};

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
  AcademicLevel,
  ApplicationStatus,
  AuthEnums,
  ExperienceStatus,
  ExperienceType,
  MemoryFormat,
  MemoryType,
  OpenApiGeneratorV3,
  OpportunityCategory,
  OpportunityModality,
  OpportunityStatus,
  SolidaryStatus,
  StudentEnums,
  SystemStatus,
  TransactionType,
  UserRole,
  applicationSchema,
  createApplicationSchema,
  createCheckoutSessionSchema,
  createExperienceSchema,
  createMemorySchema,
  createOpportunitySchema,
  createPaginatedResponseSchema,
  experienceSchema,
  formatMinutesToReadable,
  ipv4Schema,
  loginSchema,
  memorySchema,
  minutesToDecimalHours,
  opportunityFilterQuerySchema,
  opportunitySchema,
  paginationMetaSchema,
  paginationSchema,
  rechargeSimulationResultSchema,
  refreshTokenSchema,
  registerStudentSchema,
  registry,
  rfc7807ErrorSchema,
  simulateRechargeSchema,
  studentProfileSchema,
  timeStringToMinutes,
  tokenTransactionSchema,
  updateApplicationStatusSchema,
  updateExperienceSchema,
  updateMemorySchema,
  updateOpportunitySchema,
  updateStudentProfileSchema,
  uploadResponseSchema,
  userResponseSchema,
  userWalletSchema,
  z
};
