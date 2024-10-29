import React from 'react';
import AppCard from './AppCard';

interface App {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'deploying';
  lastDeployed: string;
  branch: string;
  url: string;
}

interface AppsGridProps {
  apps: App[];
}

export default function AppsGrid({ apps }: AppsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <AppCard key={app.id} {...app} />
      ))}
    </div>
  );
}