import { CountdownCircleTimer, CountdownCircleTimerProps } from "react-countdown-circle-timer"

export const CountDown = (props: Omit<CountdownCircleTimerProps, "colors">) => {
  return (
    <CountdownCircleTimer
      isPlaying
      colors={[
        ["#004777", 0.33],
        ["#F7B801", 0.33],
        ["#A30000", 0.33],
      ]}
      {...props}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
}
