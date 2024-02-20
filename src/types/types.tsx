export interface Tile extends BaseTile {
  value: number;
}

export interface BaseTile {
  x: number;
  y: number;
  z: number;
}

export interface ServerTile {
  x: number;
  y: number;
  z: number;
  value: number;
}

export interface MovementRequest {
  key: string;
  tiles: Tile[];
}
