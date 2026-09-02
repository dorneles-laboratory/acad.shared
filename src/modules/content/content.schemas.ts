import { z, registry } from '../../lib/registry';
import { userResponseSchema } from '../users';
import { ContentType, ContentStatus } from './content.enums';

const baseContentSchema = z.object({
  title: z.string().min(2).max(120).trim().openapi({
    description: 'Título do conteúdo',
    example: 'Aviso de Manutenção',
  }),
  type: z.nativeEnum(ContentType).openapi({
    description: 'Tipo de mídia do conteúdo',
    example: ContentType.Image,
  }),
  status: z.nativeEnum(ContentStatus).optional().openapi({
    description: 'Status do conteúdo',
    example: ContentStatus.Draft,
  }),
  startDate: z.coerce.date().optional().openapi({
    description: 'Data de início de exibição',
    example: '2026-08-20T08:00:00Z',
  }),
  endDate: z.coerce.date().optional().openapi({
    description: 'Data de fim de exibição',
    example: '2026-08-30T18:00:00Z',
  }),
  author: z.string().max(100).optional().openapi({
    description: 'Nome do autor ou departamento responsável',
    example: 'Departamento de TI',
  }),
  contentUrl: z.string().url().optional().openapi({
    description: 'URL do conteúdo',
  }),
  mediaUrl: z.string().url().optional().openapi({
    description: 'URL da mídia principal (imagem, vídeo ou página web)',
  }),
  textBody: z.string().openapi({
    description: 'Corpo de texto caso seja um aviso escrito',
  }),
  showTitle: z.boolean().default(true).openapi({
    description: 'Indica se o título deve ser exibido',
  }),
  showAuthor: z.boolean().default(true).openapi({
    description: 'Indica se o autor deve ser exibido',
  }),
  showQrCode: z.boolean().default(true).openapi({
    description: 'Indica se o QR Code deve ser exibido',
  }),
  showTime: z.boolean().default(true).openapi({
    description: 'Indica se a hora deve ser exibida',
  }),
  showScreenName: z.boolean().default(true).openapi({
    description: 'Indica se o nome da tela deve ser exibido',
  }),
  showTypeBadge: z.boolean().default(true).openapi({
    description: 'Indica se o badge do tipo de conteúdo deve ser exibido',
  }),
  showDeadline: z.boolean().default(true).openapi({
    description: 'Indica se o prazo de exibição deve ser exibido',
  }),
  isCarousel: z.boolean().default(false).openapi({
    description: 'Indica se o conteúdo faz parte de um carrossel',
  }),
});

export const createContentSchema = registry.register(
  'CreateContentRequest',
  baseContentSchema.refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate < data.endDate;
      }
      return true;
    },
    {
      message: 'A data de fim deve ser posterior à data de início.',
      path: ['endDate'],
    },
  ),
);

export const updateContentSchema = registry.register(
  'UpdateContentRequest',
  baseContentSchema
    .partial()
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    })
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return data.startDate < data.endDate;
        }
        return true;
      },
      {
        message: 'A data de fim deve ser posterior à data de início.',
        path: ['endDate'],
      },
    ),
);

export const contentResponseSchema = registry.register(
  'ContentResponse',
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
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const contentIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID do conteúdo deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const contentQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({
    description: 'Busca por título ou autor',
    example: 'Manutenção',
  }),
  status: z.nativeEnum(ContentStatus).optional().openapi({
    description: 'Filtra pelo status do conteúdo',
    example: ContentStatus.Active,
  }),
  type: z.nativeEnum(ContentType).optional().openapi({
    description: 'Filtra pelo tipo do conteúdo',
    example: ContentType.Image,
  }),
  // Preprocess intercepta o dado da query string antes da validação
  onlyMyCenter: z
    .preprocess((val) => val === 'true' || val === true, z.boolean().optional())
    .openapi({
      description: 'Filtra conteúdos apenas do centro do usuário',
    }),
  onlyMyContents: z
    .preprocess((val) => val === 'true' || val === true, z.boolean().optional())
    .openapi({
      description: 'Filtra conteúdos apenas do usuário logado',
    }),
});
