// This is the jest 'setupFilesAfterEnv' setup file
// It's a good place to set globals, add global before/after hooks, etc

import { SessionContext } from "blitz"
import db from "db"

const mockContextSession: SessionContext = {
  userId: undefined,
  $publicData: {
    userId: null,
  },
  $handle: null,
  $authorize: jest.fn(),
  $isAuthorized: jest.fn(),
  $create: jest.fn(),
  $revoke: jest.fn(),
  $revokeAll: jest.fn(),
  $getPrivateData: jest.fn(),
  $setPrivateData: jest.fn(),
  $setPublicData: jest.fn(),
}

export { mockContextSession }

afterAll(async () => {
  await db.$disconnect()
})
