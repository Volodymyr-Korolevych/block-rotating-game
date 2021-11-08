export type PositionType = [number, number]

export enum BlocksEnum {
  regular = 'gray',
  red = 'red',
  blue = 'blue',
  green = 'green',
}

export const blockImages: Record<BlocksEnum, string> = {
  [BlocksEnum.regular]: require('./assets/img/block-regular.png'),
  [BlocksEnum.red]: require('./assets/img/block-red.png'),
  [BlocksEnum.blue]: require('./assets/img/block-blue.png'),
  [BlocksEnum.green]: require('./assets/img/block-green.png'),
}

export enum CorrectEnum {
  red = '1',
  blue = '9',
  green = '7',
}

export const correctIndexes: Record<CorrectEnum, BlocksEnum> = {
  [CorrectEnum.red]: BlocksEnum.red,
  [CorrectEnum.blue]: BlocksEnum.blue,
  [CorrectEnum.green]: BlocksEnum.green,
}

export const blockPositions: PositionType[] = [
  [0.88, 22.93],
  [0.88, 31.27],
  [0.88, 39.61],
  [8.1, 18.76],
  [8.1, 27.1],
  [8.1, 35.44],
  [8.1, 43.78],
  [15.33, 22.93],
  [15.33, 31.27],
  [15.33, 39.61],
  [22.55, 27.1],
  [22.55, 35.44],
]

export enum RotationsEnum {
  topLeft = '4',
  topRight = '5',
  bottom = '8',
}

export const RotationBlocks: Record<RotationsEnum, number[]> = {
  [RotationsEnum.topLeft]: [0, 1, 5, 8, 7, 3],
  [RotationsEnum.topRight]: [1, 2, 6, 9, 8, 4],
  [RotationsEnum.bottom]: [4, 5, 9, 11, 10, 7],
}

export const RotationCircleOffsets: Record<
  RotationsEnum,
  PositionType
> = {
  [RotationsEnum.topLeft]: [-2.9, 17.7],
  [RotationsEnum.topRight]: [-2.9, 26.1],
  [RotationsEnum.bottom]: [4.5, 21.9],
}

export const BLOCK_RADIUS = 3.6
export const ROTATION_ANGLE = 360 / 6 // 6 blocks in circle
export const ROTATION_CIRCLE_RADIUS = 13
