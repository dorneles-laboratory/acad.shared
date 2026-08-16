import { z } from '../../lib/registry';
import {
  centerIdSchema,
  centerQuerySchema,
  centerResponseSchema,
  createCenterSchema,
  updateCenterSchema,
} from './center.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export type CreateCenterDTO = z.infer<typeof createCenterSchema>;
export type UpdateCenterDTO = z.infer<typeof updateCenterSchema>;
export type CenterResponseDTO = z.infer<typeof centerResponseSchema>;
export type CenterIdDTO = z.infer<typeof centerIdSchema>;
export type CenterQueryDTO = z.infer<typeof centerQuerySchema>;
export type PaginatedCentersDTO = PaginatedResultDTO<CenterResponseDTO>;
