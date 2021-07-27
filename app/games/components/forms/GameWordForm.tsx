import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"

export { FORM_ERROR } from "app/core/components/Form"

interface GameWordFormProps<S extends z.ZodType<any, any>> extends FormProps<S> {
  isActivePlayer: boolean
  lastWord?: string | null
}

export function GameWordForm<S extends z.ZodType<any, any>>({
  isActivePlayer,
  lastWord,
  ...props
}: GameWordFormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        hideErrors={props.hideErrors}
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
