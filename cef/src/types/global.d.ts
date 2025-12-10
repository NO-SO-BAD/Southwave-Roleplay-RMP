// global.d.ts (declara mp para browser/CEF)
import * as rage from '@ragempcommunity/types-client';

declare global {
  const mp: typeof rage.mp;
}
export {};