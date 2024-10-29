import React, { useState } from 'react';
import AppsHeader from './apps/AppsHeader';
import AppsGrid from './apps/AppsGrid';

const SAMPLE_APPS = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Main shopping platform with product catalog and cart functionality',
    status: 'running' as const,
    lastDeployed: '2h ago',
    branch: 'main',
    url: 'https://example.com'
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    description: 'Internal admin tools and analytics dashboard',
    status: 'deploying' as const,
    lastDeployed: '30m ago',
    branch: 'develop',
    url: 'https://admin.example.com'
  },
  {
    id: '3',
    name: 'Customer Support Portal',
    description: 'Customer ticket management and support system',
    status: 'stopped' as const,
    lastDeployed: '1d ago',
    branch: 'feature/support',
    url: 'https://support.example.com'
  }
];

interface MainContentProps {
  activeItem: string;
}

export default function MainContent({ activeItem }: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [apps] = useState(SAMPLE_APPS);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewApp = () => {
    // Implement new app creation logic
    console.log('Creating new app...');
  };

  if (activeItem === 'apps') {
    return (
      <div className="ml-64 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
          <AppsHeader onNewApp={handleNewApp} onSearch={setSearchQuery} />
          <AppsGrid apps={filteredApps} />
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
          {activeItem}
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">
            {activeItem === 'agents' ? (
              'Configure and monitor your AI agents'
            ) : activeItem === 'data' ? (
              'Manage and explore your data sources'
            ) : activeItem === 'workspaces' ? (
              'Access your project workspaces'
            ) : activeItem === 'models' ? (
              'View and configure your models'
            ) : activeItem === 'workbench' ? (
              'Access your development environment'
            ) : activeItem === 'stacks' ? (
              'Manage your technology stacks'
            ) : activeItem === 'platforms' ? (
              'Configure your platform settings'
            ) : activeItem === 'settings' ? (
              'Customize your application settings and preferences'
            ) : (
              'Select a menu item to get started'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}