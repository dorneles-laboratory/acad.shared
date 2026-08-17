import { z } from '../../lib/registry';
import {
  createPlaylistItemSchema,
  updatePlaylistItemSchema,
  playlistItemResponseSchema,
  reorderPlaylistSchema,
} from './playlist.schemas';

export type CreatePlaylistItemDTO = z.infer<typeof createPlaylistItemSchema>;
export type UpdatePlaylistItemDTO = z.infer<typeof updatePlaylistItemSchema>;
export type PlaylistItemResponseDTO = z.infer<
  typeof playlistItemResponseSchema
>;
export type ReorderPlaylistDTO = z.infer<typeof reorderPlaylistSchema>;
