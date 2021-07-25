import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"
import { useSession } from "blitz"
import { Role } from "../../../../types"

export { FORM_ERROR } from "app/core/components/Form"

export function GameSettingsForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const session = useSession()
  const isHost = (session.role as Role) === "HOST"
  return (
    <Form<S> {...props}>
      <LabeledTextField
        isDisabled={!isHost}
        defaultValue={15}
        min={10}
        max={60}
        type="number"
        name="timer"
        label="Turn Duration (in seconds)"
      />
    </Form>
  )
}
