import { MapPin, Navigation, Building2, Briefcase, Home, Car } from 'lucide-react';

export function MapSection() {
  const locations = [
    { id: 1, name: 'Mi Casa', type: 'home', icon: Home, coords: 'X: 234, Y: -1054', color: 'text-green-400' },
    { id: 2, name: 'Trabajo (LS Customs)', type: 'work', icon: Briefcase, coords: 'X: -362, Y: -132', color: 'text-orange-400' },
    { id: 3, name: 'Garaje Principal', type: 'garage', icon: Car, coords: 'X: 213, Y: -998', color: 'text-blue-400' },
    { id: 4, name: 'Banco Central', type: 'bank', icon: Building2, coords: 'X: 150, Y: -1040', color: 'text-yellow-400' },
  ];

  const waypoints = [
    { id: 1, name: 'Waypoint Actual', distance: '1.2 km', coords: 'X: 450, Y: -890' },
  ];

  return (
    <div className="space-y-6">
      {/* Mapa placeholder */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <MapPin className="text-red-400" size={24} />
          Vista de Mapa
        </h3>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-video flex items-center justify-center border border-white/10">
          <div className="text-center">
            <Navigation className="text-white/30 mx-auto mb-3" size={48} />
            <p className="text-white/50">Vista del mapa del servidor</p>
            <p className="text-sm text-white/30 mt-1">Integración con mapa del juego</p>
          </div>
        </div>
      </div>

      {/* Waypoint Actual */}
      {waypoints.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg text-white mb-4 flex items-center gap-2">
            <Navigation className="text-red-400" size={20} />
            Destino Marcado
          </h3>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-white">{waypoints[0].name}</p>
              <p className="text-sm text-white/50 mt-1">{waypoints[0].coords}</p>
            </div>
            <div className="text-right">
              <p className="text-red-400">{waypoints[0].distance}</p>
              <button className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ubicaciones Guardadas */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg text-white mb-4">Ubicaciones Guardadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {locations.map((location) => {
            const Icon = location.icon;
            return (
              <div
                key={location.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-black/30 rounded-lg">
                      <Icon className={location.color} size={20} />
                    </div>
                    <div>
                      <p className="text-white">{location.name}</p>
                      <p className="text-sm text-white/50 mt-1">{location.coords}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded transition-colors">
                    <Navigation className="text-white/70" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-blue-400 flex-shrink-0" size={20} />
          <div>
            <p className="text-white text-sm">
              Haz clic en cualquier ubicación guardada para establecer un waypoint en el mapa del juego.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
