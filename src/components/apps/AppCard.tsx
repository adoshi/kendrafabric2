import React from 'react';
import { ExternalLink, GitBranch, Clock } from 'lucide-react';

interface AppCardProps {
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'deploying';
  lastDeployed: string;
  branch: string;
  url: string;
}

export default function AppCard({ name, description, status, lastDeployed, branch, url }: AppCardProps) {
  const statusColors = {
    running: 'bg-green-100 text-green-800',
    stopped: 'bg-gray-100 text-gray-800',
    deploying: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <GitBranch className="h-4 w-4 mr-1" />
          <span>{branch}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{lastDeployed}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View deployment
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
}