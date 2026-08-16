import { z } from '../../lib/registry';
import {
  createScreenSchema,
  updateScreenSchema,
  screenResponseSchema,
  screenIdSchema,
  screenQuerySchema,
} from './screens.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export * from './screens.enums';
export * from './screens.schemas';

export type CreateScreenDTO = z.infer<typeof createScreenSchema>;
export type UpdateScreenDTO = z.infer<typeof updateScreenSchema>;
export type ScreenResponseDTO = z.infer<typeof screenResponseSchema>;
export type ScreenIdDTO = z.infer<typeof screenIdSchema>;
export type ScreenQueryDTO = z.infer<typeof screenQuerySchema>;
export type PaginatedScreensDTO = PaginatedResultDTO<ScreenResponseDTO>;
