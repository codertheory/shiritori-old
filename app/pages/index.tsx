import { BlitzPage, Routes, useMutation, useRouter, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Card } from "../core/components/Card"
import { CreateGameForm, FORM_ERROR } from "../games/components/forms/CreateGameForm"
import { CreateGame } from "../games/validations"

import createGame from "../games/mutations/createGame"
import { LoadingSpinner } from "../core/components/LoadingSpinner"
import { Suspense } from "react"
import { Center, Heading } from "@chakra-ui/react"

export const NewGame = () => {
  const router = useRouter()
  const [createGameMutation] = useMutation(createGame)
  return (
    <Card>
      <Center>
        <Heading>Create Game</Heading>
      </Center>
      <CreateGameForm
        schema={CreateGame}
        onSubmit={async ({ private: isPrivate, name }) => {
          console.log(name)
          try {
            const data = await createGameMutation({
              private: isPrivate,
              name,
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

const NewGamePage: BlitzPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewGame />
    </Suspense>
  )
}
NewGamePage.suppressFirstRenderFlicker = true
NewGamePage.getLayout = (page) => <Layout title={"Create New Game"}>{page}</Layout>

export default NewGamePage
