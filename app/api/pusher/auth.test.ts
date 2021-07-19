import { NextApiRequest, NextApiResponse } from "next"
import handler from "./auth"
import { createMocks } from "node-mocks-http"

jest.mock("blitz", () => ({
  ...jest.requireActual<object>("blitz")!,
  getSession: jest.fn(async (req, res) => {
    return {
      gameId: "foo",
      playerId: "bar",
      playerName: "baz",
    }
  }),
}))

jest.mock("pusher")

describe("Auth Endpoint", () => {
  it("Authenticates the User and returns data", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      body: {
        socket_id: "foo",
        channel_name: "bar",
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
  })
})
