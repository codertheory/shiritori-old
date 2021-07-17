import { forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  NumberInputProps,
} from "@chakra-ui/react"
import { PasswordField } from "./PasswordField"
import { NumberField, NumberFieldProps } from "./NumberField"

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  isDisabled?: boolean
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, type = "text", name, isDisabled, ...props }, ref) => {
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
        InputComponent = (
          <PasswordField isDisabled={isSubmitting || isDisabled} {...register(name)} {...props} />
        )
        break
      }
      case "number": {
        // @ts-ignore
        InputComponent = (
          <NumberField
            isDisabled={isSubmitting || isDisabled}
            {...register(name, {
              valueAsNumber: true,
              validate: (value) => value,
            })}
            {...(props as NumberFieldProps)}
          />
        )
        break
      }
      default: {
        InputComponent = (
          <Input isDisabled={isSubmitting || isDisabled} {...register(name)} {...props} />
        )
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
