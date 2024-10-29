import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface CreateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appData: AppData) => void;
}

interface AppData {
  name: string;
  type: string;
  stack: string;
  model: string;
}

const stackOptions = ['App', 'Inference', 'Agent', 'Data App', 'Flow'];
const modelOptions = ['GPT-4', 'GPT-3.5', 'Claude', 'DALL-E', 'Stable Diffusion', 'Custom'];

export default function CreateAppModal({ isOpen, onClose, onSubmit }: CreateAppModalProps) {
  const [formData, setFormData] = useState<AppData>({
    name: '',
    type: '',
    stack: '',
    model: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Create an App by selecting the type of App you would like to build
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* App Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name of App
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter app name"
              required
            />
          </div>

          {/* App Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              App Type
            </label>
            <input
              id="type"
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter app type"
              required
            />
          </div>

          {/* Stack Selection */}
          <div>
            <label htmlFor="stack" className="block text-sm font-medium text-gray-700 mb-2">
              Stack
            </label>
            <div className="relative">
              <select
                id="stack"
                value={formData.stack}
                onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a stack</option>
                {stackOptions.map((stack) => (
                  <option key={stack} value={stack}>
                    {stack}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <div className="relative">
              <select
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a model</option>
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}