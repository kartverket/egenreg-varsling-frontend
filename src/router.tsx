import { Flex, Heading, Text } from "@kvib/react"
import { createBrowserRouter } from "react-router-dom"
import { ErrorElement } from "./components/ErrorElement.tsx"
import { CreateOrder } from "./features/CreateOrder/CreateOrder.tsx"
import KommuneOrder from "./features/KommuneOrder/KommuneOrder.tsx"
import KommuneOrdreStatus from "./features/KommuneOrder/KommuneOrdreStatus.tsx"
import { OrderDetails } from "./features/OrderDetails/OrderDetails.tsx"
import { Orders } from "./features/Orders/Orders.tsx"
import { Layout } from "./Layout.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CreateOrder />,
        errorElement: <ErrorElement />,
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <Orders />,
            errorElement: <ErrorElement />,
          },
          {
            path: ":id",
            element: <OrderDetails />,
            errorElement: <ErrorElement />,
          },
        ],
      },
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
