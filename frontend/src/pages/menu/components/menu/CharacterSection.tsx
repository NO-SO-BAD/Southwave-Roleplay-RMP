import { Briefcase, Users, TrendingUp, Car, Home, Wallet, MapPin } from 'lucide-react';

export function CharacterSection() {
  const characterData = {
    level: 24,
    xp: 6500,
    xpNeeded: 10000,
    money: 125450,
    bank: 580000,
    job: {
      name: 'Mecánico',
      company: 'LS Customs',
      salary: 2500,
      rank: 'Senior',
    },
    family: {
      name: 'Los Santos Mechanics',
      role: 'Miembro',
      members: 12,
    },
  };

  const vehicles = [
    { id: 1, name: 'Elegy Retro Custom', plate: 'LSC 2024', location: 'Garaje Principal', status: 'guardado' },
    { id: 2, name: 'Bati 801', plate: 'MOTO 01', location: 'Garaje Principal', status: 'guardado' },
    { id: 3, name: 'Sultan RS', plate: 'DRIFT 99', location: 'En uso', status: 'activo' },
  ];

  const properties = [
    { id: 1, name: 'Apartamento Eclipse Towers', location: 'Vinewood', type: 'Residencial', price: 500000 },
    { id: 2, name: 'Garaje 10 Plazas', location: 'Centro LS', type: 'Garaje', price: 150000 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats del Personaje */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-white/70 text-sm">Nivel</p>
              <p className="text-3xl text-white">{characterData.level}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Progreso</span>
              <span className="text-white">{characterData.xp}/{characterData.xpNeeded} XP</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(characterData.xp / characterData.xpNeeded) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Wallet className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-white/70 text-sm">Efectivo</p>
              <p className="text-2xl text-white">${characterData.money.toLocaleString()}</p>
              <p className="text-xs text-white/50 mt-1">Banco: ${characterData.bank.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Briefcase className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-white/70 text-sm">Trabajo</p>
              <p className="text-lg text-white">{characterData.job.name}</p>
              <p className="text-xs text-white/50 mt-1">{characterData.job.rank} - ${characterData.job.salary}/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trabajo y Familia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2">
            <Briefcase className="text-orange-400" size={24} />
            Información de Trabajo
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-white/50 text-sm">Empresa</p>
              <p className="text-white text-lg">{characterData.job.company}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm">Posición</p>
              <p className="text-white">{characterData.job.rank}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm">Salario por hora</p>
              <p className="text-green-400 text-lg">${characterData.job.salary}</p>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              Ver Detalles del Trabajo
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2">
            <Users className="text-cyan-400" size={24} />
            Familia / Organización
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-white/50 text-sm">Nombre</p>
              <p className="text-white text-lg">{characterData.family.name}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm">Tu Rol</p>
              <p className="text-white">{characterData.family.role}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm">Miembros Activos</p>
              <p className="text-white">{characterData.family.members} miembros</p>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
              Ver Miembros
            </button>
          </div>
        </div>
      </div>

      {/* Vehículos */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Car className="text-red-400" size={24} />
          Vehículos en Propiedad
        </h3>
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Car className="text-red-400" size={20} />
                </div>
                <div>
                  <p className="text-white">{vehicle.name}</p>
                  <p className="text-sm text-white/50">Matrícula: {vehicle.plate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  {vehicle.location}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                  vehicle.status === 'activo' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Propiedades */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl text-white mb-4 flex items-center gap-2">
          <Home className="text-yellow-400" size={24} />
          Propiedades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Home className="text-yellow-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{property.name}</p>
                  <p className="text-sm text-white/50 mt-1">{property.location}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded">
                      {property.type}
                    </span>
                    <span className="text-green-400 text-sm">
                      ${property.price.toLocaleString()}
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
