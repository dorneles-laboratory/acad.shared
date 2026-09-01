export const ScreenStatus = {
  Online: 'ONLINE',
  Offline: 'OFFLINE',
  Syncing: 'SYNCING',
} as const;

export type EnumScreenStatus = (typeof ScreenStatus)[keyof typeof ScreenStatus];

export const PairingRequestStatus = {
  Pending: 'PENDING',
  Approved: 'APPROVED',
} as const;

export type EnumPairingRequestStatus =
  (typeof PairingRequestStatus)[keyof typeof PairingRequestStatus];
