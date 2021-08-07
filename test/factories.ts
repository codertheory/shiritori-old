import { Game, Player, Word } from "db"
import * as Factory from "factory.ts"
import { Sync } from "factory.ts"
import cuid from "cuid"
import faker from "faker"

const ids = Sync.makeFactory({
  id: Sync.each(() => cuid()),
})

const timeStamps = Sync.makeFactory({
  createdAt: Sync.each(() => new Date()),
  updatedAt: Sync.each(() => new Date()),
})

// @ts-ignore
export const gameFactory = Factory.Sync.makeFactory<Game>({
  private: false,
  started: false,
  finished: false,
  timer: 15,
  lastWord: faker.random.word(),
  winnerId: null,
  index: 0,
})
  .combine(ids)
  .combine(timeStamps)

// @ts-ignore
export const playerFactory = Factory.Sync.makeFactory<Player>({
  order: Factory.each((i) => i),
  name: faker.name.firstName(),
  score: 100,
  gameId: Sync.each(() => cuid()),
  lastWord: faker.random.word(),
})
  .combine(ids)
  .combine(timeStamps)

// @ts-ignore
export const wordFactory = Factory.Sync.makeFactory<Word>({
  createdAt: Sync.each(() => new Date()),
  word: faker.random.word(),
  points: faker.datatype.number(),
  gameId: Sync.each(() => cuid()),
  playerId: Sync.each(() => cuid()),
}).combine(ids)
