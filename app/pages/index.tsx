import { BlitzPage, Head, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { CreateGameForm, FORM_ERROR } from "../games/components/forms/CreateGameForm"
import { CreateGame } from "../games/validations"
import Typed from "react-typed"
import createGame from "../games/mutations/createPrivateGame"
import { LoadingSpinner } from "../core/components/LoadingSpinner"
import { Suspense } from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"

export const NewGame = () => {
  const router = useRouter()
  const [createGameMutation] = useMutation(createGame)

  const submitCreateGameForm = async ({ private: isPrivate, name }) => {
    try {
      const data = await createGameMutation({
        private: isPrivate,
        name,
      })
      await router.replace(Routes.ShowGamePage({ gameId: data.id }))
    } catch (error) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }

  return (
    <>
      <Head>
        <title>Shiritori!</title>
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Test Your <br />
            <Text as={"span"} color={"green.600"}>
              <Typed
                strings={["Words", "Speed", "Vocabulary"]}
                loop
                typeSpeed={75}
                backSpeed={120}
              />{" "}
              <br />
            </Text>
            <Text as={"span"} color={"green.400"}>
              With your Friends!
            </Text>
          </Heading>
          <CreateGameForm schema={CreateGame} onSubmit={submitCreateGameForm} />
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign={"center"}>
                    <Heading as={"h3"} fontWeight={500} lineHeight={"110%"}>
                      Rules
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Rules are simple. Each player starts with a 100 points. <br /> You have a timer to
                enter a word that starts with the same letter as the last word used ends with. No
                word can be used more than once per game.
                <br />
                <Center>
                  <Text as={"span"} color={"green.600"}>
                    Dangerous {"=>"} Super
                  </Text>
                </Center>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </>
  )
}

const NewGamePage: BlitzPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewGame />
    </Suspense>
  )
}
NewGamePage.suppressFirstRenderFlicker = true
NewGamePage.getLayout = (page) => <Layout title={"Create New Game"}>{page}</Layout>

export default NewGamePage
