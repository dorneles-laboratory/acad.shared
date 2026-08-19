import { z, registry } from '../../lib/registry';
import { contentResponseSchema } from '../content/content.schemas';

export const kioskPlaylistItemResponseSchema = registry.register(
  'KioskPlaylistItemResponse',
  z.object({
    id: z.string().uuid(),
    duration: z.number().int(),
    order: z.number().int(),
    content: contentResponseSchema,
  }),
);

export const kioskPlaylistResponseSchema = registry.register(
  'KioskPlaylistResponse',
  z.object({
    screenName: z.string(),
    lastUpdated: z.string().nullable().openapi({
      description:
        'Timestamp ISO da última alteração na playlist (usado para checar sincronização)',
      example: '2026-08-17T20:00:00.000Z',
    }),
    items: z.array(kioskPlaylistItemResponseSchema),
  }),
);
