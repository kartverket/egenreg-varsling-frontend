import { Flex, Heading, Text } from "@kvib/react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import KommuneOrder from "./features/KommuneOrder/KommuneOrder.tsx"
import KommuneOrdreStatus from "./features/KommuneOrder/KommuneOrdreStatus.tsx"
import { Layout } from "./Layout.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="opprett" replace /> },
      { path: "opprett", element: <KommuneOrder /> },
      { path: "status", element: <KommuneOrdreStatus /> },
      {
        path: "*",
        element: (
          <Flex direction="column" align="center">
            <Heading>404</Heading>
            <Text>Oops, her var det ingenting!</Text>
          </Flex>
        ),
      },
    ],
  },
])
