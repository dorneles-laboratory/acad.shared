export const ContentType = {
  Image: 'IMAGE',
  Video: 'VIDEO',
  Notice: 'NOTICE',
  WebUrl: 'WEB_URL',
} as const;

export type EnumContentType = (typeof ContentType)[keyof typeof ContentType];

export const ContentStatus = {
  Draft: 'DRAFT',
  Scheduled: 'SCHEDULED',
  Active: 'ACTIVE',
  Expired: 'EXPIRED',
  Archived: 'ARCHIVED',
} as const;

export type EnumContentStatus =
  (typeof ContentStatus)[keyof typeof ContentStatus];

export const MediaFit = {
  Cover: 'COVER',
  Contain: 'CONTAIN',
  Fill: 'FILL',
  Blur: 'BLUR',
} as const;

export type EnumMediaFit = (typeof MediaFit)[keyof typeof MediaFit];
