import { Button, ButtonProps } from "@chakra-ui/react"
import { Routes, useMutation, useRouter } from "blitz"
import createGame from "../../mutations/createGame"
import { useFormContext } from "react-hook-form"

export interface CreateGameButtonProps
  extends Omit<ButtonProps, "onClick" | "isLoading" | "loadingText"> {
  isPublic: boolean
}

export const CreateGameButton = ({ isPublic, children, ...props }: CreateGameButtonProps) => {
  const { handleSubmit } = useFormContext()
  const router = useRouter()
  const [createGameMutation, { isLoading }] = useMutation(createGame)

  return (
    <Button
      type="submit"
      onClick={handleSubmit(
        async (values) => {
          const { id: gameId } = await createGameMutation({
            private: isPublic,
            player: {
              name: values.name,
            },
          })
          await router.replace(Routes.ShowGamePage({ gameId }))
        },
        (errors) => console.error(errors)
      )}
      isLoading={isLoading}
      loadingText={"Creating..."}
      {...props}
    >
      {children}
    </Button>
  )
}
