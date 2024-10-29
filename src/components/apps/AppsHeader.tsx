import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import CreateAppModal from './CreateAppModal';
import DocumentUpload from '../workflows/DocumentUpload';

interface AppsHeaderProps {
  onNewApp: () => void;
  onSearch: (query: string) => void;
}

export default function AppsHeader({ onNewApp, onSearch }: AppsHeaderProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleCreateApp = (appData: any) => {
    console.log('Creating new app:', appData);
    onNewApp();
  };

  const handleTemplateClick = (templateId: number) => {
    if (templateId === 3) { // Full Stack App template
      setShowDocumentUpload(true);
    }
  };

  if (showDocumentUpload) {
    return <DocumentUpload />;
  }

  return (
    <div className="space-y-8">
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create App
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center">
          <Pencil className="h-5 w-5 mr-2" />
          Change App
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center">
          <Trash2 className="h-5 w-5 mr-2" />
          Delete App
        </button>
      </div>

      {/* Create App Modal */}
      <CreateAppModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateApp}
      />

      {/* Search and Templates Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates</h3>
        <div className="max-w-md mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className="p-4 border border-gray-100 rounded-lg hover:border-blue-500 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3 mb-2">
                <template.icon className="h-5 w-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">{template.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const templates = [
  {
    id: 1,
    name: 'React Web App',
    description: 'Modern React application with TypeScript and Tailwind CSS',
    icon: Plus
  },
  {
    id: 2,
    name: 'API Service',
    description: 'RESTful API service with Express and MongoDB',
    icon: Plus
  },
  {
    id: 3,
    name: 'Full Stack App',
    description: 'Complete stack with React frontend and Node.js backend',
    icon: Plus
  },
  {
    id: 4,
    name: 'Static Website',
    description: 'Simple static website with HTML, CSS, and JavaScript',
    icon: Plus
  },
  {
    id: 5,
    name: 'Database Service',
    description: 'Database service with PostgreSQL and TypeORM',
    icon: Plus
  },
  {
    id: 6,
    name: 'Microservice',
    description: 'Lightweight microservice with Node.js and Redis',
    icon: Plus
  }
];