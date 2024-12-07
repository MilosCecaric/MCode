export interface TurtleState {
  x: number;
  y: number;
  angle: number;
  penDown: boolean;
  color: string;
}

export const createInitialState = (): TurtleState => ({
  x: 0,
  y: 0,
  angle: 0,
  penDown: true,
  color: '#000000'
});