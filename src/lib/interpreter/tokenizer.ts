export type TokenType = 
  | 'MOVE'
  | 'TURN'
  | 'PEN'
  | 'COLOR'
  | 'NUMBER'
  | 'STRING'
  | 'NEWLINE';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
}

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, lineNum) => {
    const words = line.trim().split(/\s+/);
    
    words.forEach(word => {
      if (!word) return;
      
      if (/^-?\d+(\.\d+)?$/.test(word)) {
        tokens.push({ type: 'NUMBER', value: word, line: lineNum });
      } else if (word.startsWith('"') && word.endsWith('"')) {
        tokens.push({ type: 'STRING', value: word.slice(1, -1), line: lineNum });
      } else {
        switch (word.toLowerCase()) {
          case 'move':
            tokens.push({ type: 'MOVE', value: word, line: lineNum });
            break;
          case 'turn':
            tokens.push({ type: 'TURN', value: word, line: lineNum });
            break;
          case 'pen':
            tokens.push({ type: 'PEN', value: word, line: lineNum });
            break;
          case 'color':
            tokens.push({ type: 'COLOR', value: word, line: lineNum });
            break;
        }
      }
    });
    
    tokens.push({ type: 'NEWLINE', value: '\n', line: lineNum });
  });
  
  return tokens;
}