import { z, registry } from '../../lib/registry';

export const loginSchema = registry.register(
  'LoginRequest',
  z.object({
    email: z
      .email({
        error: ({ input }) =>
          input === undefined
            ? 'O e-mail é obrigatório.'
            : 'Formato de e-mail inválido.',
      })
      .min(1, { message: 'O e-mail é obrigatório.' })
      .transform((value) => value.toLowerCase())
      .openapi({
        description: 'E-mail do usuário',
        example: 'teste@teste.com.br',
      }),

    password: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'A senha é obrigatória.'
            : 'A senha deve ser um texto.',
      })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
      .max(64, { message: 'Senha deve ter no máximo 64 caracteres.' })
      .regex(/[A-Z]/, { message: 'Senha deve conter letra maiúscula.' })
      .regex(/[a-z]/, { message: 'Senha deve conter letra minúscula.' })
      .regex(/[0-9]/, { message: 'Senha deve conter número.' })
      .openapi({
        description: 'Senha do usuário com critérios de segurança',
        example: 'Senha@123',
      }),
  }),
);

export const refreshTokenSchema = registry.register(
  'RefreshTokenRequest',
  z.object({
    refreshToken: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O token de atualização é obrigatório.'
            : 'O token de atualização deve ser um texto.',
      })
      .openapi({
        description: 'Token de atualização obtido no login',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      }),
  }),
);

export const registerStudentSchema = registry.register(
  'RegisterStudentRequest',
  z.object({
    name: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O nome é obrigatório.'
            : 'O nome deve ser um texto.',
      })
      .min(2, { message: 'Nome deve ter no mínimo 2 caracteres.' })
      .max(100, { message: 'Nome deve ter no máximo 100 caracteres.' })
      .openapi({
        description: 'Nome completo do estudante',
        example: 'Laura Dorneles',
      }),

    email: z
      .email({
        error: ({ input }) =>
          input === undefined
            ? 'O e-mail é obrigatório.'
            : 'Formato de e-mail inválido.',
      })
      .min(1, { message: 'O e-mail é obrigatório.' })
      .transform((value) => value.toLowerCase())
      .openapi({
        description: 'E-mail institucional ou pessoal do estudante',
        example: 'estudante@universidade.edu.br',
      }),

    password: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'A senha é obrigatória.'
            : 'A senha deve ser um texto.',
      })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
      .max(64, { message: 'Senha deve ter no máximo 64 caracteres.' })
      .regex(/[A-Z]/, { message: 'Senha deve conter letra maiúscula.' })
      .regex(/[a-z]/, { message: 'Senha deve conter letra minúscula.' })
      .regex(/[0-9]/, { message: 'Senha deve conter número.' })
      .openapi({
        description: 'Senha de acesso',
        example: 'Senha@123',
      }),

    university: z
      .string()
      .min(2, {
        message: 'Instituição de ensino deve ter no mínimo 2 caracteres.',
      })
      .optional()
      .openapi({
        description: 'Universidade ou Faculdade',
        example: 'UFSM',
      }),

    campus: z.string().optional().openapi({
      description: 'Campus universitário',
      example: 'Sede - Santa Maria',
    }),

    course: z
      .string()
      .min(2, { message: 'Curso deve ter no mínimo 2 caracteres.' })
      .optional()
      .openapi({
        description: 'Curso de graduação ou pós',
        example: 'Ciência da Computação',
      }),

    currentSemester: z.number().int().min(1).max(20).optional().openapi({
      description: 'Semestre atual',
      example: 3,
    }),
  }),
);

export const userResponseSchema = registry.register(
  'UserResponse',
  z.object({
    id: z.string().uuid().openapi({
      description: 'Identificador único do usuário',
      example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    }),
    name: z.string().openapi({
      description: 'Nome completo',
      example: 'Laura Dorneles',
    }),
    email: z.string().email().openapi({
      description: 'E-mail',
      example: 'estudante@universidade.edu.br',
    }),
    role: z.enum(['STUDENT', 'ADMIN', 'ADVISOR']).openapi({
      description: 'Papel do usuário no sistema',
      example: 'STUDENT',
    }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
);
