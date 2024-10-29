import React from 'react';
import { Database, Briefcase, Code, Layers, Box, Globe, Settings, AppWindow, Bot } from 'lucide-react';
import MenuItem from './MenuItem';

export type MenuItemType = {
  id: string;
  icon: React.ElementType;
  label: string;
};

const menuItems: MenuItemType[] = [
  { id: 'apps', icon: AppWindow, label: 'Apps' },
  { id: 'agents', icon: Bot, label: 'Agents' },
  { id: 'data', icon: Database, label: 'Data' },
  { id: 'workspaces', icon: Briefcase, label: 'Workspaces' },
  { id: 'models', icon: Code, label: 'Models' },
  { id: 'workbench', icon: Layers, label: 'Workbench' },
  { id: 'stacks', icon: Box, label: 'Stacks' },
  { id: 'platforms', icon: Globe, label: 'Platforms' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const mainMenuItems = menuItems.slice(0, -1);
  const settingsItem = menuItems[menuItems.length - 1];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-4 flex-1">
        <h1 className="text-xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-2">
          {mainMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <MenuItem
          item={settingsItem}
          isActive={activeItem === settingsItem.id}
          onClick={() => onItemClick(settingsItem.id)}
        />
      </div>
    </div>
  );
}