// src/server/src/modules/chat/index.ts
const CHAT_RANGE = 20.0; // Rango normal
const ME_DO_RANGE = 20.0;

mp.events.addCommand("me", (player: PlayerMp, fullText: string, ...args: string[]) => {
  const action = args.join(" ");
  if (!action) return player.outputChatBox("Uso: /me [acción]");

  mp.players.forEachInRange(player.position, ME_DO_RANGE, (nearPlayer: PlayerMp) => {
    nearPlayer.outputChatBox(`!{c8a2c8}* ${player.name} ${action}`);
  });
});

mp.events.addCommand("do", (player: PlayerMp, fullText: string, ...args: string[]) => {
  const action = args.join(" ");
  if (!action) return player.outputChatBox("Uso: /do [acción]");

  mp.players.forEachInRange(player.position, ME_DO_RANGE, (nearPlayer: PlayerMp) => {
    nearPlayer.outputChatBox(`!{a8c8a2}* ${action} (( ${player.name} ))`);
  });
});

mp.events.addCommand("ooc", (player: PlayerMp, fullText: string, ...args: string[]) => {
  const text = args.join(" ");
  if (!text) return player.outputChatBox("Uso: /ooc [mensaje]");

  mp.players.broadcast(`!{aaaaaa}(( OOC ${player.name}: ${text} ))`);
});

mp.events.add("playerChat", (player: PlayerMp, message: string) => {
  if (!message || message.trim() === "") return;

  message = message.trim();

  mp.players.forEachInRange(player.position, CHAT_RANGE, (nearPlayer: PlayerMp) => {
    nearPlayer.outputChatBox(`${player.name}: ${message}`);
  });

  console.log(`[CHAT] ${player.name}: ${message}`);
});