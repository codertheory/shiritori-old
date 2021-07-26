import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"
import { CreateGameButton } from "../buttons/CreateGameButton"
import { Center, VStack } from "@chakra-ui/react"

export { FORM_ERROR } from "app/core/components/Form"

export function CreateGameForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        type={"text"}
        name={"name"}
        label={""}
        placeholder={"Some Wacky Username"}
      />
      <Center pt="32px">
        <VStack>
          <CreateGameButton id="create-public-game-btn" disabled isPublic>
            Public Matchmaking
          </CreateGameButton>
          <CreateGameButton id="create-private-game-btn" isPublic={false}>
            Create Private Game
          </CreateGameButton>
        </VStack>
      </Center>
    </Form>
  )
}
