import { Settings, Volume2, Bell, Eye, Keyboard } from 'lucide-react';

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Settings className="text-gray-400" size={24} />
          Configuración del HUD
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Mostrar HUD</p>
              <p className="text-sm text-white/50">Activar/desactivar la interfaz principal</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Volume2 className="text-purple-400" size={24} />
          Audio
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white">Volumen General</span>
              <span className="text-white/70">80%</span>
            </div>
            <input type="range" className="w-full" defaultValue={80} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white">Efectos de Sonido</span>
              <span className="text-white/70">70%</span>
            </div>
            <input type="range" className="w-full" defaultValue={70} />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Bell className="text-yellow-400" size={24} />
          Notificaciones
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Notificaciones de Sistema</p>
              <p className="text-sm text-white/50">Alertas del servidor</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Keyboard className="text-blue-400 flex-shrink-0" size={20} />
          <div>
            <p className="text-white text-sm">
              Más opciones de configuración estarán disponibles próximamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
