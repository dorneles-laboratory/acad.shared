import { z, registry } from '../../lib/registry';
import { ToolkitEnums } from './toolkit.enums';

// Criação de uma ferramenta (Admin apenas)
export const createToolSchema = registry.register(
  'CreateToolRequest',
  z.object({
    slug: z.string().min(2).max(50).trim().openapi({
      description: 'Identificador único amigável para URLs (kebab-case)',
      example: 'resume-builder',
    }),
    name: z.string().min(2).max(100).trim().openapi({
      description: 'Nome de exibição da ferramenta',
      example: 'Resume Builder',
    }),
    tagline: z.string().min(5).max(150).trim().openapi({
      description: 'Frase de efeito curta',
      example: 'Gerador inteligente de curriculo academico',
    }),
    description: z.string().min(10).max(500).trim().openapi({
      description: 'Descrição detalhada do funcionamento',
      example:
        'Transforme experiencias e projetos em curriculos profissionais.',
    }),
    category: z.nativeEnum(ToolkitEnums.Category).openapi({
      description: 'Categoria organizacional da ferramenta',
      example: ToolkitEnums.Category.CarrerAndResume,
    }),
    status: z.nativeEnum(ToolkitEnums.Status).openapi({
      description: 'Status atual de disponibilidade',
      example: ToolkitEnums.Status.Available,
    }),
    iconName: z.string().min(2).max(50).trim().openapi({
      description: 'Nome do ícone da biblioteca Lucide React',
      example: 'FileText',
    }),
    isNew: z.boolean().default(false).optional(),
  }),
);

export const updateToolSchema = createToolSchema.partial().refine(
  (data) => {
    return Object.values(data).some((value) => value !== undefined);
  },
  {
    message: 'Pelo menos um campo deve ser fornecido para atualização.',
  },
);

export const toolIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da ferramenta deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
      description: 'UUID Identificador da ferramenta',
      example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    }),
});

// Resposta do Servidor para o Frontend
export const toolResponseSchema = registry.register(
  'ToolResponse',
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
    updatedAt: z.coerce.date(),
  }),
);
