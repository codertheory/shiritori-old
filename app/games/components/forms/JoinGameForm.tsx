import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"

export { FORM_ERROR } from "app/core/components/Form"

export function JoinGameForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField
        type={"text"}
        name={"name"}
        label={"Username"}
        placeholder={"Some Wacky Username"}
      />
      <LabeledTextField label={""} name={"gameId"} hidden />
    </Form>
  )
}
