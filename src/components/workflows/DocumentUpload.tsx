import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, HardDrive, Database, Cloud } from 'lucide-react';

type StorageType = 'filesystem' | 's3' | 'azure';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [storageType, setStorageType] = useState<StorageType>('filesystem');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload progress
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, progress, status: progress === 100 ? 'completed' : 'uploading' }
                : f
            )
          );
        } else {
          clearInterval(interval);
        }
      }, 500);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const storageOptions = [
    { id: 'filesystem', label: 'File System', icon: HardDrive },
    { id: 's3', label: 'Amazon S3', icon: Database },
    { id: 'azure', label: 'Azure Drive', icon: Cloud }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Document Upload</h1>

      {/* Storage Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Storage Destination</h2>
        <div className="grid grid-cols-3 gap-4">
          {storageOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setStorageType(option.id as StorageType)}
              className={`p-4 rounded-lg border-2 transition-all ${
                storageType === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <option.icon className={`h-6 w-6 mx-auto mb-2 ${
                storageType === option.id ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                storageType === option.id ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {option.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? 'Drop files here' : 'Drag and drop files here'}
        </p>
        <p className="text-sm text-gray-500">
          or click to select files from your computer
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map(file => (
              <div
                key={file.id}
                className="bg-white rounded-lg border border-gray-200 p-4 flex items-center"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        file.status === 'error'
                          ? 'bg-red-500'
                          : file.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <span className="flex items-center text-sm">
                      {file.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600">Completed</span>
                        </>
                      ) : file.status === 'error' ? (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-600">Error</span>
                        </>
                      ) : (
                        <span className="text-blue-600">{file.progress}%</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}