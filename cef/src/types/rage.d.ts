// cef/src/types/mp.d.ts
interface Mp {
  trigger(eventName: string, ...args: any[]): void;
  events: {
    add(eventName: string, callback: (...args: any[]) => void): void;
    remove(eventName: string): void;
  };
  gui: {
    cursor: {
      show(visible: boolean, locked: boolean): void;
    };
    execute(code: string): void;
  };
}

declare const mp: Mp;