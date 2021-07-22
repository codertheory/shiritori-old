import { Box, Center, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { Player } from "db"

export default function PlayerLobbyCard({ player }: { player: Player }) {
  return (
    <Center py={6}>
      <Box
        maxW={"170px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {player.name}
            </Heading>
          </Stack>

          {/*<Button*/}
          {/*  w={"full"}*/}
          {/*  bg={useColorModeValue("#151f21", "gray.900")}*/}
          {/*  color={"white"}*/}
          {/*  rounded={"md"}*/}
          {/*  disabled={!isHost || player.id === session.playerId}*/}
          {/*  _hover={{*/}
          {/*    transform: "translateY(-2px)",*/}
          {/*    boxShadow: "lg"*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Kick*/}
          {/*</Button>*/}
        </Box>
      </Box>
    </Center>
  )
}
