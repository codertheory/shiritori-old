import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"

export { FORM_ERROR } from "app/core/components/Form"

interface GameWordFormProps<S extends z.ZodType<any, any>> extends FormProps<S> {
  isActivePlayer: boolean
}

export function GameWordForm<S extends z.ZodType<any, any>>({
  isActivePlayer,
  ...props
}: GameWordFormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        isDisabled={!isActivePlayer}
        w={"full"}
        type={"text"}
        name={"word"}
        label={""}
        placeholder={"Enter a Word"}
      />
    </Form>
  )
}
