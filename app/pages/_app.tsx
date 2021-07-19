import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  getAntiCSRFToken,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { PusherProvider } from "@harelpls/use-pusher"
import theme from "../theme"
import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }: AppProps) {
  const antiCSRFToken = getAntiCSRFToken()
  const config = {
    // required config props
    clientKey: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,

    // optional if you'd like to trigger events. BYO endpoint.
    // see "Trigger Server" below for more info
    triggerEndpoint: "/api/pusher/trigger",

    // required for private/presence channels
    // also sends auth headers to trigger endpoint
    authEndpoint: "/api/pusher/auth",
    auth: {
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    },
  }
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <PusherProvider {...config}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          onReset={useQueryErrorResetBoundary().reset}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </ChakraProvider>
    </PusherProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
