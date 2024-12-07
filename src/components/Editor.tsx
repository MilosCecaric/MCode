import React from 'react';
import { PenTool, Play } from 'lucide-react';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
}

export const Editor: React.FC<EditorProps> = ({ code, onChange, onRun }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">MCode Editor</h2>
        </div>
        <button
          onClick={onRun}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Run Code
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your MCode here..."
      />
    </div>
  );
};