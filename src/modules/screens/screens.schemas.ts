import { ipv4Schema } from '../../common';
import { z, registry } from '../../lib/registry';
import { buildingResponseSchema } from '../buildings';
import { ScreenStatus } from './screens.enums';

export const createScreenSchema = registry.register(
  'CreateScreenRequest',
  z.object({
    name: z.string().min(2).max(120).trim().openapi({
      description: 'Nome de identificação da tela',
      example: 'Tela Recepção Principal',
    }),
    ip: ipv4Schema.openapi({
      description: 'Endereço IP do dispositivo na rede',
      example: '192.168.1.50',
    }),
    buildingId: z.string().uuid().openapi({
      description: 'ID do prédio onde a tela está instalada',
      example: 'd3b07384-d113-49cd-a5d6-80d00d542fba',
    }),
  }),
);

export const updateScreenSchema = registry.register(
  'UpdateScreenRequest',
  z
    .object({
      name: z.string().min(2).max(120).trim().optional(),
      ip: ipv4Schema.optional(),
      buildingId: z.string().uuid().optional(),
      status: z.nativeEnum(ScreenStatus).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Pelo menos um campo deve ser fornecido para atualização.',
    }),
);

export const screenResponseSchema = registry.register(
  'ScreenResponse',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    ip: z.string(),
    status: z.nativeEnum(ScreenStatus),
    buildingId: z.string().uuid(),
    building: buildingResponseSchema.optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
);

export const screenIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'O ID da tela deve ser um UUID válido.' })
    .openapi({
      param: { name: 'id', in: 'path' },
    }),
});

export const screenQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  query: z.string().optional().openapi({ description: 'Busca por nome ou IP' }),
  status: z.nativeEnum(ScreenStatus).optional(),
  centerId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
});
