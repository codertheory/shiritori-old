import { BlitzPage, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Card } from "../core/components/Card"
import { CreateGameForm, FORM_ERROR } from "../games/components/forms/CreateGameForm"
import { CreateGame } from "../games/validations"
import { useState } from "@hookstate/core"
import { globalState, GlobalStateType } from "../auth/state"
import createGame from "../games/mutations/createGame"

const NewGamePage: BlitzPage = () => {
  const state = useState<GlobalStateType>(globalState)
  const router = useRouter()
  const [createGameMutation] = useMutation(createGame)
  return (
    <Card>
      <CreateGameForm
        schema={CreateGame}
        onSubmit={async ({ private: isPrivate, name }) => {
          console.log(name)
          try {
            const data = await createGameMutation({
              private: isPrivate,
              name,
            })
            state.set({
              playerId: data.players![0]?.id ?? undefined,
              gameId: data.id,
              host: true,
            })
            await router.replace(Routes.ShowGamePage({ gameId: data.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Card>
  )
}

NewGamePage.getLayout = (page) => <Layout title={"Create New Game"}>{page}</Layout>

export default NewGamePage
