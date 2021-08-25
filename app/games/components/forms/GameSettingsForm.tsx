import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/fields/LabeledTextField"
import { z } from "zod"
import { useSession } from "blitz"
import { Role } from "../../../../types"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react"
import GameVariantsRadioGroup from "../GameVariantsRadioGroup"

export { FORM_ERROR } from "app/core/components/Form"

export function GameSettingsForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const session = useSession()
  const isHost = (session.role as Role) === "HOST"
  return (
    <Box height={"90%"}>
      <Form<S>
        style={{
          height: "100%",
        }}
        {...props}
      >
        <Tabs
          bg={useColorModeValue("white", "gray.900")}
          size={"lg"}
          height={"full"}
          isFitted
          variant="enclosed-colored"
        >
          <TabList>
            <Tab>Variants</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={25}>
                <GameVariantsRadioGroup />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={25}>
                <LabeledTextField
                  isDisabled={!isHost}
                  defaultValue={props?.initialValues?.timer}
                  min={10}
                  max={60}
                  type="number"
                  name="timer"
                  label="Turn Duration (in seconds)"
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Form>
    </Box>
  )
}
