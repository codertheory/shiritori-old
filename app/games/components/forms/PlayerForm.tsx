import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"
import { CreateGameButton } from "./CreateGameButton"
import { Center, VStack } from "@chakra-ui/react"

export { FORM_ERROR } from "app/core/components/Form"

export function PlayerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        type={"text"}
        name={"name"}
        label={"Username"}
        placeholder={"Some Wacky Username"}
      />
      <Center pt="32px">
        <VStack>
          <CreateGameButton disabled isPublic>
            Create Public Game
          </CreateGameButton>
          <CreateGameButton isPublic={false}>Create Private Game</CreateGameButton>
        </VStack>
      </Center>
    </Form>
  )
}
