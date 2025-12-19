import { motion, AnimatePresence } from 'motion/react';
import { X, User, UserCircle, Settings, Briefcase, Car, Home, Trophy, AlertCircle, Users, Wallet, Map, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { ProfileSection } from './menu/ProfileSection';
import { CharacterSection } from './menu/CharacterSection';
import { SettingsSection } from './menu/SettingsSection';
import { InventorySection } from './menu/InventorySection';
import { MapSection } from './menu/MapSection';

interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuSection = 'profile' | 'character' | 'inventory' | 'map' | 'settings';

export function MainMenu({ isOpen, onClose }: MainMenuProps) {
  const [activeSection, setActiveSection] = useState<MenuSection>('profile');

  const menuItems = [
    { id: 'profile' as MenuSection, label: 'Perfil', icon: User },
    { id: 'character' as MenuSection, label: 'Personaje', icon: UserCircle },
    { id: 'inventory' as MenuSection, label: 'Inventario', icon: ShoppingBag },
    { id: 'map' as MenuSection, label: 'Mapa', icon: Map },
    { id: 'settings' as MenuSection, label: 'Configuración', icon: Settings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'character':
        return <CharacterSection />;
      case 'inventory':
        return <InventorySection />;
      case 'map':
        return <MapSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[90%] h-[85%] max-w-7xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex"
          >
            {/* Sidebar */}
            <div className="w-64 bg-black/20 border-r border-white/10 p-6 flex flex-col">
              <div className="mb-8">
                <h1 className="text-2xl text-white mb-1">Menu Principal</h1>
                <p className="text-sm text-white/50">Servidor Roleplay</p>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-white/40">
                  Presiona <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/60">ESC</kbd> o <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/60">M</kbd> para cerrar
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl text-white">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-8">
                {renderSection()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
