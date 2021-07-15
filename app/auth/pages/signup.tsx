import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import NewGamePage from "../../pages"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.NewGamePage())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
