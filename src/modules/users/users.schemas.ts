import { z, registry } from '../../lib/registry';
import { UserRole } from './users.enums';
import { centerResponseSchema } from '../centers/center.schemas';

export const createUserSchema = registry.register(
  'CreateUserRequest',
  z.object({
    name: z
      .string({
        error: ({ input }) =>
          input === undefined
            ? 'O nome é obrigatório.'
            : 'O nome deve ser um texto.',
      })
      .min(2, { message: 'Nome muito curto.' })
      .max(120, { message: 'Nome muito longo.' })
      .trim()
      .openapi({
        description: 'Nome completo do usuário',
        example: 'Usuário de Teste',
      }),

    email: z
      .email({
        error: ({ input }) =>
          input === undefined
            ? 'O e-mail é obrigatório.'
            : 'Formato de e-mail inválido.',
      })
      .transform((v) => v.toLowerCase())
      .openapi({
        description: 'E-mail exclusivo do usuário para login',
        example: 'test@example.com',
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
      .optional()
      .openapi({
        description: 'Senha do usuário com critérios de segurança',
        example: 'Senha@123',
      }),

    role: z.nativeEnum(UserRole).default(UserRole.Publisher).openapi({
      description: 'Função do usuário no sistema',
      example: UserRole.Publisher,
    }),

    centerId: z.string().uuid().nullish().openapi({
      description: 'UUID do Centro Acadêmico associado ao usuário',
      example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
    }),

    isActive: z.boolean().default(true).optional(),
  }),
);

export const updateUserSchema = registry.register(
  'UpdateUserRequest',
  z
    .object({
      name: z
        .string({
          error: ({ input }) => 'O nome deve ser um texto.',
        })
        .min(2, { message: 'Nome muito curto.' })
        .max(120, { message: 'Nome muito longo.' })
        .trim()
        .optional()
        .openapi({
          description: 'Nome completo do usuário',
          example: 'Usuário de Teste Atualizado',
        }),

      email: z
        .email({ message: 'Formato de e-mail inválido.' })
        .transform((v) => v.toLowerCase())
        .optional()
        .openapi({
          description: 'E-mail exclusivo do usuário para login',
          example: 'test_updated@example.com',
        }),

      password: z
        .string()
        .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
        .max(64, { message: 'Senha deve ter no máximo 64 caracteres.' })
        .regex(/[A-Z]/, { message: 'Senha deve conter letra maiúscula.' })
        .regex(/[a-z]/, { message: 'Senha deve conter letra minúscula.' })
        .regex(/[0-9]/, { message: 'Senha deve conter número.' })
        .optional()
        .openapi({
          description:
            'Nova senha do usuário (opcional, com critérios de segurança)',
          example: 'NovaSenha@123',
        }),

      role: z.nativeEnum(UserRole).optional().openapi({
        description: 'Função do usuário no sistema',
        example: UserRole.CenterAdmin,
      }),

      centerId: z.string().uuid().nullish().openapi({
        description: 'UUID do Centro Acadêmico associado ao usuário',
        example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
      }),

      isActive: z.boolean().optional(),
      imageUrl: z.string().url().optional().openapi({
        description: 'URL da foto de perfil do usuário',
        example: 'https://example.com/image.jpg',
      }),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

// O Schema de Resposta
export const userResponseSchema = registry.register(
  'UserResponse',
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
    temporaryPassword: z.string().optional(),
  }),
);

export const userIdSchema = z.object({
  id: z
    .uuid({
      error: ({ input }) =>
        input === undefined
          ? 'O Id é obrigatório.'
          : 'O ID do usuário deve ser um UUID válido.',
    })
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      description: 'UUID Identificador exclusivo do usuário',
      example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
    }),
});
