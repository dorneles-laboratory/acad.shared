import { z, registry } from '../../lib/registry';
import { AuthEnums } from '../auth';
import { UserEnums } from './users.enums';

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
      .openapi({
        description: 'Senha do usuário com critérios de segurança',
        example: 'Senha@123',
      }),
    isActive: z.boolean().default(true).optional(),
    role: z
      .nativeEnum(UserEnums.UserRole)
      .default(UserEnums.UserRole.User)
      .optional()
      .openapi({
        description: 'Função do usuário no sistema',
        example: UserEnums.UserRole.User,
      }),
  }),
);

export const updateUserSchema = createUserSchema
  .partial()
  .omit({ password: true })
  .extend({
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
    isActive: z.boolean().optional(),
    role: z.nativeEnum(UserEnums.UserRole).optional().openapi({
      description: 'Nova função do usuário no sistema (opcional)',
      example: UserEnums.UserRole.Admin,
    }),
    imageUrl: z.string().url().optional().openapi({
      description: 'URL da imagem de perfil do usuário',
      example: 'https://example.com/profile.jpg',
    }),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    },
  );

// O Schema de Resposta
export const userResponseSchema = registry.register(
  'UserResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    isActive: z.boolean(),
    imageUrl: z.string().url().nullable(),
    role: z.nativeEnum(UserEnums.UserRole),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
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
