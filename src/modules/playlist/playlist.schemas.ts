import { z, registry } from '../../lib/registry';
import { contentResponseSchema } from '../content';

export const createPlaylistItemSchema = registry.register(
  'CreatePlaylistItemRequest',
  z.object({
    buildingId: z.string().uuid(),
    contentId: z.string().uuid(),
    duration: z.number().int().min(1).default(10).openapi({
      description: 'Duração de exibição em segundos',
      example: 10,
    }),
    order: z.number().int().default(0).openapi({
      description: 'Ordem de exibição na playlist',
      example: 1,
    }),
  }),
);

export const updatePlaylistItemSchema = registry.register(
  'UpdatePlaylistItemRequest',
  z
    .object({
      duration: z.number().int().min(1).optional(),
      order: z.number().int().optional(),
    })
    .refine((data: Record<string, unknown>) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo (duration ou order) deve ser fornecido.',
    }),
);

// Schema para receber um array de itens reordenados
export const reorderPlaylistSchema = registry.register(
  'ReorderPlaylistRequest',
  z.object({
    buildingId: z.string().uuid(),
    items: z.array(
      z.object({
        id: z.string().uuid(),
        order: z.number().int(),
      }),
    ),
  }),
);

export const playlistItemResponseSchema = registry.register(
  'PlaylistItemResponse',
  z.object({
    id: z.string().uuid(),
    buildingId: z.string().uuid(),
    contentId: z.string().uuid(),
    duration: z.number().int(),
    order: z.number().int(),
    content: contentResponseSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const playlistItemIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'UUID inválido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const playlistBuildingQuerySchema = z.object({
  buildingId: z
    .string()
    .uuid({ message: 'UUID do prédio inválido.' })
    .openapi({
      param: { name: 'buildingId', in: 'path' },
    }),
});
