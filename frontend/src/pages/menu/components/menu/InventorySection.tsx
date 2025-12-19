import { Package, Wrench, Pill, Apple, Key, Phone, CreditCard } from 'lucide-react';

export function InventorySection() {
  const inventoryItems = [
    { id: 1, name: 'Teléfono Móvil', icon: Phone, quantity: 1, category: 'items', rarity: 'common' },
    { id: 2, name: 'Llaves del Coche', icon: Key, quantity: 3, category: 'items', rarity: 'common' },
    { id: 3, name: 'Tarjeta de Crédito', icon: CreditCard, quantity: 1, category: 'items', rarity: 'uncommon' },
    { id: 4, name: 'Kit de Reparación', icon: Wrench, quantity: 5, category: 'tools', rarity: 'uncommon' },
    { id: 5, name: 'Botiquín', icon: Pill, quantity: 2, category: 'medical', rarity: 'rare' },
    { id: 6, name: 'Comida Rápida', icon: Apple, quantity: 8, category: 'food', rarity: 'common' },
    { id: 7, name: 'Agua Embotellada', icon: Package, quantity: 12, category: 'food', rarity: 'common' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/30 bg-gray-500/10';
      case 'uncommon': return 'border-green-500/30 bg-green-500/10';
      case 'rare': return 'border-blue-500/30 bg-blue-500/10';
      case 'epic': return 'border-purple-500/30 bg-purple-500/10';
      default: return 'border-white/10 bg-white/5';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      items: 'Objetos',
      tools: 'Herramientas',
      medical: 'Médico',
      food: 'Comida/Bebida',
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-white flex items-center gap-2">
            <Package className="text-indigo-400" size={24} />
            Inventario
          </h3>
          <div className="text-white/70">
            <span className="text-white">{inventoryItems.length}</span> / 50 espacios
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {inventoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`${getRarityColor(item.rarity)} border rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer relative`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="text-white" size={32} />
                  <p className="text-white text-sm text-center">{item.name}</p>
                  <span className="text-xs text-white/50">{getCategoryLabel(item.category)}</span>
                  {item.quantity > 1 && (
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-xs text-white">
                      x{item.quantity}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Espacios vacíos */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="border border-white/5 bg-white/[0.02] rounded-lg p-4 flex items-center justify-center"
            >
              <Package className="text-white/10" size={32} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg text-white mb-4">Capacidad de Peso</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Peso Total</span>
            <span className="text-white">24.5 / 50 kg</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
              style={{ width: '49%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
