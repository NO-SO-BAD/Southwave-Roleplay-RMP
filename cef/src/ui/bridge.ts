type UIEvent =
  | { type: 'MAIN_MENU'; open: boolean }
  | { type: 'NOTIFICATION'; message: string; level?: 'info' | 'error' | 'success' };

class UIBridge {
  private listeners: ((event: UIEvent) => void)[] = [];

  emit(event: UIEvent) {
    this.listeners.forEach(l => l(event));
  }

  subscribe(cb: (event: UIEvent) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }
}

export const uiBridge = new UIBridge();

// Exponerlo a RAGE
(window as any).ui = {
  emit: (event: UIEvent) => uiBridge.emit(event),
};
