import { Box, Center, Grid, GridItem, Heading, useColorModeValue } from "@chakra-ui/react"
import { Player } from "db"

export default function PlayerLobbyCard({ player }: { player: Player }) {
  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={1} h="10" bg="tomato" />
          <Center>
            <GridItem>
              <Heading as="h6" size="xs">
                {player.name}
              </Heading>
            </GridItem>
          </Center>
        </Grid>
      </Box>
    </Center>
  )
}
