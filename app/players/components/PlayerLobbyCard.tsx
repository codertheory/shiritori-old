import { Box, Center, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { Player } from "db"

export default function PlayerLobbyCard({ player }: { player: Player }) {
  return (
    <Flex>
      <Center py={6}>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Box p={6}>
            <Stack spacing={0} align={"center"}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {player.name}
              </Heading>
            </Stack>
          </Box>
        </Box>
      </Center>
    </Flex>
  )
}
