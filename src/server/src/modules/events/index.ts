import { logger } from '../../../../shared/utils/logger';  // FIX: Ruta desde subcarpeta modules (4 niveles arriba)

mp.events.add('playerDeath', (player: PlayerMp, reason: string, killer: PlayerMp) => {  // FIX: PlayerMp
  logger.warn(`${player.name} murió por ${reason}`);  // FIX: logger importado
});