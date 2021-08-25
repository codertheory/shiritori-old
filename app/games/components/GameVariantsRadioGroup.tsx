import {
  Box,
  Center,
  Grid,
  GridItem,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  VStack,
} from "@chakra-ui/react"
import { GameVariant } from "db"
import { useForm, useFormContext } from "react-hook-form"
// @ts-ignore
import NounIcon from "../../../public/images/nouns.svg"
import { Image } from "blitz"

type GameVariantInfo = {
  icon?: string | any
  title: string
  description: string
  new: boolean
  variant: GameVariant
}

type GameVariantButtonProps = GameVariantInfo & UseRadioProps

const GameVariantMapping = [
  {
    title: "Normal",
    description: "The Default version, any valid word is allowed",
    new: false,
    variant: GameVariant.Default,
  } as GameVariantInfo,
  {
    icon: NounIcon,
    title: "Nouns",
    description: "Everyone is only allowed to use Nouns",
    new: false,
    variant: GameVariant.Nouns,
  } as GameVariantInfo,
]

const GameVariantButton = (props: GameVariantButtonProps) => {
  const { register } = useForm()
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <GridItem rowSpan={7} as="label">
      <input {...register("variant")} {...input} value={props.variant} />
      <Box
        {...checkbox}
        height={"full"}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        <Center>
          <VStack>
            {props.icon && <Image src={props.icon} alt={`${props.variant} Logo`} layout={"fill"} />}
            <Text>{props.variant}</Text>
          </VStack>
        </Center>
      </Box>
    </GridItem>
  )
}

const GameVariantsRadioGroup = () => {
  const { setValue } = useFormContext()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "variant",
    isNative: false,
    defaultValue: GameVariant.Default,
    onChange(nextValue: string) {
      setValue("variant", nextValue, {
        shouldDirty: false,
        shouldTouch: true,
        shouldValidate: false,
      })
    },
  })

  const group = getRootProps()

  return (
    <Grid templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={6} {...group}>
      {GameVariantMapping.map((props) => {
        const radio = getRadioProps({ value: props.variant })
        return <GameVariantButton key={props.variant} {...props} {...radio} />
      })}
    </Grid>
  )
}

export default GameVariantsRadioGroup
