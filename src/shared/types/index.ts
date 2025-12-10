// index.ts (usa import type)
import type { PlayerMp } from '@ragempcommunity/types-server';

declare module '@ragempcommunity/types-server' {
  interface PlayerMp {
    accountId?: number;
    rpName?: string;
  }
}

export interface SharedEventData {
  message: string;
}