import { forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react"
import { PasswordField } from "./PasswordField"
import { NumberField } from "./NumberField"

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, type = "text", name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
    let InputComponent

    switch (type) {
      case "password": {
        InputComponent = <PasswordField isDisabled={isSubmitting} {...register(name)} {...props} />
        break
      }
      case "number": {
        // @ts-ignore
        InputComponent = (
          <NumberField
            isDisabled={isSubmitting}
            {...register(name, {
              valueAsNumber: true,
              validate: (value) => value,
            })}
          />
        )
        break
      }
      default: {
        InputComponent = <Input isDisabled={isSubmitting} {...register(name)} {...props} />
        break
      }
    }

    return (
      <FormControl isInvalid={error}>
        <FormLabel>{label}</FormLabel>
        {InputComponent}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledTextField
