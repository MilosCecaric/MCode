import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { TurtleCanvas } from './lib/turtle/TurtleCanvas';

const DEFAULT_CODE = `move 100
turn 90
move 50
turn -45
color "blue"
move 75`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [shouldExecute, setShouldExecute] = useState(false);

  const handleRun = () => {
    setShouldExecute(true);
  };

  const handleExecutionComplete = () => {
    setShouldExecute(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MCode Interpreter</h1>
          <p className="text-gray-600">MCode programming environment</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Editor 
            code={code} 
            onChange={setCode}
            onRun={handleRun}
          />
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <TurtleCanvas 
              commands={code}
              shouldExecute={shouldExecute}
              onExecutionComplete={handleExecutionComplete}
            />
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Commands Reference</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded">move &lt;distance&gt;</code>
              <span>Move turtle forward</span>
            </li>
            <li className="flex gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded">turn &lt;degrees&gt;</code>
              <span>Rotate turtle</span>
            </li>
            <li className="flex gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded">pen up/down</code>
              <span>Control drawing</span>
            </li>
            <li className="flex gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded">color "&lt;color&gt;"</code>
              <span>Change line color</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;