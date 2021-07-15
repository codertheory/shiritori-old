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
import { UseFormRegisterReturn } from "react-hook-form"

interface NumberFieldProps
  extends UseFormRegisterReturn,
    Omit<NumberInputProps, "name" | "onBlur" | "onChange"> {}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ onChange, ...props }, ref) => {
    console.log(onChange)
    useEffect(() => {}, [])

    return (
      <FormControl>
        <NumberInput
          defaultValue={15}
          min={10}
          max={60}
          clampValueOnBlur={false}
          keepWithinRange
          {...props}
          inputMode="numeric"
          onChange={async (valueAsString, valueAsNumber) => {
            await onChange({
              target: {
                value: valueAsNumber,
                name: props.name,
                type: "number",
              },
            })
          }}
        >
          <NumberInputField type={"number"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    )
  }
)
