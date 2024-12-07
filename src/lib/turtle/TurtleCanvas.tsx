import React, { useRef, useEffect } from 'react';
import { tokenize } from '../interpreter/tokenizer';
import { parse } from '../interpreter/parser';
import { executeCommands } from '../interpreter/executor';
import { createInitialState } from './TurtleState';

interface TurtleCanvasProps {
  commands: string;
  width?: number;
  height?: number;
  shouldExecute: boolean;
  onExecutionComplete: () => void;
}

export const TurtleCanvas: React.FC<TurtleCanvasProps> = ({ 
  commands, 
  width = 600, 
  height = 400,
  shouldExecute,
  onExecutionComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    contextRef.current = context;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    
    // Set initial state
    context.beginPath();
    context.moveTo(0, 0);
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    
  }, [width, height]);

  useEffect(() => {
    if (shouldExecute && contextRef.current) {
      const tokens = tokenize(commands);
      const parsedCommands = parse(tokens);
      const state = createInitialState();
      
      // Clear canvas before execution
      const context = contextRef.current;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, width, height);
      context.translate(width / 2, height / 2);
      
      executeCommands(parsedCommands, context, state);
      onExecutionComplete();
    }
  }, [commands, shouldExecute, width, height, onExecutionComplete]);

  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-white"
      />
    </div>
  );
};