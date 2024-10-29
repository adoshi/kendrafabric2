import React from 'react';
import { MenuItemType } from './Sidebar';

interface MenuItemProps {
  item: MenuItemType;
  isActive: boolean;
  onClick: () => void;
}

export default function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-800'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </button>
  );
}