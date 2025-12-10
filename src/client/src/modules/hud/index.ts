mp.events.add('showHud', (visible: boolean) => {
  mp.gui.chat.activate(visible);  // Muestra/oculta chat
}); 