import { z } from '../../lib/registry';
import {
  kioskPlaylistResponseSchema,
  kioskPlaylistItemResponseSchema,
} from './kiosk.schemas';

export type KioskPlaylistResponseDTO = z.infer<
  typeof kioskPlaylistResponseSchema
>;
export type KioskPlaylistItemDTO = z.infer<
  typeof kioskPlaylistItemResponseSchema
>;
