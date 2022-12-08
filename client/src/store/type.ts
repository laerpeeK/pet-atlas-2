type TPetMagic = {
  name: string
  description: string
}

export type Tpet = {
  _id: string
  attribute: '金' | '木' | '水' | '火' | '土' | '神'
  description: string
  name: string
  photo: string
  rank: number
  access: string
  formula: string
  reward: string
  magic: TPetMagic[]
  story: string
  scene: string
  _v?: number
}

export type TimgDir = {
  portrait: string
  attack: string
  exhibition: string
  magic: string
  prepare: string
}

export interface IRootState {
  pets: Tpet[]
  imgDir: TimgDir
}
