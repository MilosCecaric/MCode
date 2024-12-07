import { Token } from './tokenizer';

export interface Command {
  type: string;
  args: (string | number)[];
  line: number;
}

export function parse(tokens: Token[]): Command[] {
  const commands: Command[] = [];
  let currentCommand: Partial<Command> | null = null;

  tokens.forEach(token => {
    switch (token.type) {
      case 'MOVE':
      case 'TURN':
      case 'PEN':
      case 'COLOR':
        currentCommand = {
          type: token.type,
          args: [],
          line: token.line
        };
        break;
        
      case 'NUMBER':
        if (currentCommand) {
          currentCommand.args?.push(Number(token.value));
        }
        break;
        
      case 'STRING':
        if (currentCommand) {
          currentCommand.args?.push(token.value);
        }
        break;
        
      case 'NEWLINE':
        if (currentCommand && currentCommand.type && currentCommand.args) {
          commands.push(currentCommand as Command);
          currentCommand = null;
        }
        break;
    }
  });

  return commands;
}