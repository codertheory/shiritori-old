import { CountdownCircleTimer, CountdownCircleTimerProps } from "react-countdown-circle-timer"
import { Text } from "@chakra-ui/react"
import { Key } from "react"

type Color = [string, number]
type Colors = {
  0: Color
} & Array<Color>

export interface CountDownProps extends Omit<CountdownCircleTimerProps, "colors"> {
  colors?: string | Colors
  countdownKey?: Key
}

export const CountDown = (props: CountDownProps) => {
  const colors = props.colors ?? [
    ["#004777", 0.33],
    ["#F7B801", 0.33],
    ["#A30000", 0.33],
  ]

  return (
    <CountdownCircleTimer key={props.countdownKey} isPlaying colors={colors} {...props}>
      {({ remainingTime }) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
  )
}
