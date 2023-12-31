export const BOARD_SIZE = 18;

export const CONTROLS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export const COLORS = {
  GAME_OVER: '#D24D57',
  FRUIT: '#EC644B',
  HEAD: '#336E7B',
  BODY: '#C8F7C5',
  BOARD: '#86B5BD',
  OBSTACLE: '#383522'
};
type GameModes = {
    [key: string]: string;
  };

export const GAME_MODES:GameModes = {
  classic: 'Clasico',
  no_walls: 'Sin paredes',
  obstacles: 'Obstáculos'
};