export const ScreenStatus = {
  Online: 'ONLINE',
  Offline: 'OFFLINE',
  Syncing: 'SYNCING',
} as const;

export type EnumScreenStatus = (typeof ScreenStatus)[keyof typeof ScreenStatus];
