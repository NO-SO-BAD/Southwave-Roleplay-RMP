import { Trophy, Award, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export function ProfileSection() {
  const playerInfo = {
    name: 'Juan Rodriguez',
    id: '#45821',
    playTime: '156 horas',
    registeredDate: '15 Enero 2024',
  };

  const achievements = [
    { id: 1, name: 'Primera Compra', description: 'Compró su primer vehículo', unlocked: true, date: '20 Ene 2024' },
    { id: 2, name: 'Ciudadano Ejemplar', description: '30 días sin sanciones', unlocked: true, date: '15 Feb 2024' },
    { id: 3, name: 'Empresario', description: 'Consiguió su primer trabajo', unlocked: true, date: '22 Ene 2024' },
    { id: 4, name: 'Millonario', description: 'Acumula $1,000,000', unlocked: false, date: null },
    { id: 5, name: 'Propietario', description: 'Compra una propiedad', unlocked: false, date: null },
  ];

  const sanctions = [
    { id: 1, type: 'warn', reason: 'Conducción temeraria', admin: 'Admin_Carlos', date: '05 Feb 2024', status: 'activa' },
    { id: 2, type: 'kick', reason: 'AFK en zona activa', admin: 'Admin_Maria', date: '28 Ene 2024', status: 'expirada' },
  ];

  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Award className="text-blue-400" size={24} />
          Información de Perfil
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/50 text-sm">Nombre del Personaje</p>
            <p className="text-white">{playerInfo.name}</p>
          </div>
          <div>
            <p className="text-white/50 text-sm">ID del Jugador</p>
            <p className="text-white">{playerInfo.id}</p>
          </div>
          <div>
            <p className="text-white/50 text-sm">Tiempo de Juego</p>
            <p className="text-white">{playerInfo.playTime}</p>
          </div>
          <div>
            <p className="text-white/50 text-sm">Fecha de Registro</p>
            <p className="text-white">{playerInfo.registeredDate}</p>
          </div>
        </div>
      </div>

      {/* Logros */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Trophy className="text-yellow-400" size={24} />
          Logros ({achievements.filter(a => a.unlocked).length}/{achievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                {achievement.unlocked ? (
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                ) : (
                  <XCircle className="text-white/30 flex-shrink-0" size={20} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white">{achievement.name}</p>
                  <p className="text-sm text-white/50">{achievement.description}</p>
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-green-400 mt-1">{achievement.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sanciones */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-400" size={24} />
          Historial de Sanciones
        </h3>
        <div className="space-y-3">
          {sanctions.map((sanction) => (
            <div
              key={sanction.id}
              className={`p-4 rounded-lg border ${
                sanction.status === 'activa'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs uppercase ${
                      sanction.type === 'warn' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {sanction.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      sanction.status === 'activa' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/50'
                    }`}>
                      {sanction.status}
                    </span>
                  </div>
                  <p className="text-white">{sanction.reason}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/50">
                    <span>Admin: {sanction.admin}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {sanction.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
