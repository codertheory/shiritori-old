import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useFormContext, UseFormRegisterReturn } from "react-hook-form"

export interface NumberFieldProps
  extends UseFormRegisterReturn,
    Omit<NumberInputProps, "name" | "onBlur" | "onChange"> {}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ onChange, ...props }, ref) => {
    useEffect(() => {}, [props.name])
    const {
      setValue,
      formState: { isSubmitting },
    } = useFormContext()

    return (
      <FormControl>
        <NumberInput
          clampValueOnBlur={false}
          keepWithinRange
          {...props}
          onChange={async (valueAsString, valueAsNumber) => {
            setValue(props.name, valueAsNumber)
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    )
  }
)
