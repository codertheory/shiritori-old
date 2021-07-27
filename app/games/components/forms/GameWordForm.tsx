import { Form, FormProps } from "app/core/components/Form"
import { z } from "zod"
import { Input } from "@chakra-ui/react"
import { useController } from "react-hook-form"

export { FORM_ERROR } from "app/core/components/Form"

interface GameWordFormProps<S extends z.ZodType<any, any>> extends FormProps<S> {
  isActivePlayer: boolean
  lastWord?: string | null
}

const GameWordInput = ({
  isActivePlayer,
  lastWord,
  ...props
}: {
  isActivePlayer: boolean
  lastWord?: string | null
}) => {
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name: "word",
    rules: { required: true },
    defaultValue: lastWord?.charAt(lastWord?.length - 1),
  })

  return (
    <Input id={`field-name`} isDisabled={isSubmitting || !isActivePlayer} {...field} {...props} />
  )
}

export function GameWordForm<S extends z.ZodType<any, any>>({
  isActivePlayer,
  lastWord,
  ...props
}: GameWordFormProps<S>) {
  return (
    <Form<S> {...props}>
      <GameWordInput isActivePlayer={isActivePlayer} lastWord={lastWord} />
    </Form>
  )
}
