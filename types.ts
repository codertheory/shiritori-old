import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { Game, Player } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"
export type GameRole = "Player" | "Host"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      playerId: Player["id"]
      playerName: Player["name"]
      gameId: Game["id"]
      role: Role | GameRole
    }
  }
}
