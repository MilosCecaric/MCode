import { Command } from './parser';
import { TurtleState } from '../turtle/TurtleState';

export function executeCommands(
  commands: Command[], 
  ctx: CanvasRenderingContext2D, 
  state: TurtleState
): void {
  commands.forEach(command => {
    switch (command.type) {
      case 'MOVE':
        const distance = command.args[0] as number;
        const radians = (state.angle * Math.PI) / 180;
        const newX = state.x + distance * Math.cos(radians);
        const newY = state.y + distance * Math.sin(radians);
        
        if (state.penDown) {
          ctx.beginPath();
          ctx.moveTo(state.x, state.y);
          ctx.lineTo(newX, newY);
          ctx.strokeStyle = state.color;
          ctx.stroke();
        }
        
        state.x = newX;
        state.y = newY;
        break;

      case 'TURN':
        const degrees = command.args[0] as number;
        state.angle += degrees;
        break;

      case 'PEN':
        const penAction = command.args[0] as string;
        state.penDown = penAction.toLowerCase() === 'down';
        break;

      case 'COLOR':
        state.color = command.args[0] as string;
        break;
    }
  });
}