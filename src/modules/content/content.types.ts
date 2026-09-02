import { z } from '../../lib/registry';
import {
  createContentSchema,
  updateContentSchema,
  updateContentStatusSchema,
  contentResponseSchema,
  contentIdSchema,
  contentQuerySchema,
} from './content.schemas';
import type { PaginatedResultDTO } from '../../common/common.types';

export * from './content.enums';
export * from './content.schemas';

export type CreateContentDTO = z.infer<typeof createContentSchema>;
export type UpdateContentDTO = z.infer<typeof updateContentSchema>;
export type UpdateContentStatusDTO = z.infer<typeof updateContentStatusSchema>;
export type ContentResponseDTO = z.infer<typeof contentResponseSchema>;
export type ContentIdDTO = z.infer<typeof contentIdSchema>;
export type ContentQueryDTO = z.infer<typeof contentQuerySchema>;
export type PaginatedContentsDTO = PaginatedResultDTO<ContentResponseDTO>;
