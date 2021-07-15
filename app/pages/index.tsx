import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Card } from "../core/components/Card"
import { PlayerForm } from "../games/components/forms/PlayerForm"
import { CreatePlayer } from "../players/mutations/createPlayer"

const NewGamePage: BlitzPage = () => {
  return (
    <Card>
      <PlayerForm schema={CreatePlayer} onSubmit={async (values) => {}} />
    </Card>
  )
}

NewGamePage.getLayout = (page) => <Layout title={"Create New Game"}>{page}</Layout>

export default NewGamePage
