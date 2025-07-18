export interface IPos {
  x: number
  y: number
}

export interface IBox extends IPos {
  width: number
  height: number
}

export const ZERO_POS: IPos = { x: 0, y: 0 }

export const NO_POS: IPos = { x: -1, y: -1 }
