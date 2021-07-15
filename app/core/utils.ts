export const PLAYERIDKEY = "currentPlayerID"
export const PLAYERNAMEKEY = "currentPlayer"
export const CURRENTGAMEIDKEY = "currentGameID"
export const HOSTKEY = "host"

export const isSessionHost = () => {
  return sessionStorage.getItem(HOSTKEY) === sessionStorage.getItem(CURRENTGAMEIDKEY)
}

export const getCurrentPlayerID = () => {
  return sessionStorage.getItem(PLAYERIDKEY)
}
export const getCurrentPlayerName = () => {
  return sessionStorage.getItem(PLAYERNAMEKEY)
}

export const setCurrentPlayerID = (playerID) => sessionStorage.setItem(PLAYERIDKEY, playerID)
export const setCurrentPlayerName = (playerName) =>
  sessionStorage.setItem(PLAYERNAMEKEY, playerName)
export const setCurrentGameID = (gameID) => sessionStorage.setItem(CURRENTGAMEIDKEY, gameID)
export const setGameHost = (gameID) => sessionStorage.setItem(HOSTKEY, gameID)
