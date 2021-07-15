import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"

export { FORM_ERROR } from "app/core/components/Form"

export function GameForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField type="number" name="timer" label="Timer" />
    </Form>
  )
}
