export const MemoryFormat = {
  Text: 'TEXT',
  Audio: 'AUDIO',
  Image: 'IMAGE',
  Multimedia: 'MULTIMEDIA',
} as const;

export type EnumMemoryFormat = (typeof MemoryFormat)[keyof typeof MemoryFormat];

export const MemoryType = {
  Aprendizado: 'APRENDIZADO',
  Reflexao: 'REFLEXAO',
  Insight: 'INSIGHT',
  Conquista: 'CONQUISTA',
  Duvida: 'DUVIDA',
} as const;

export type EnumMemoryType = (typeof MemoryType)[keyof typeof MemoryType];
