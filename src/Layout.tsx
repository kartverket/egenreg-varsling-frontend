import {
  Container,
  Flex,
  Footer,
  Heading,
  Icon,
  Logo,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from "@kvib/react"
import { Outlet, useNavigate } from "react-router-dom"
import { getAuthState } from "./auth/authState"

const tabs = [
  { label: "Sending av varsel", url: "/" },
  { label: "Oversikt", url: `/orders` },
  { label: "Kommunevarsling", url: `/kommuneorder` },
]

export const Layout = () => {
  const navigate = useNavigate()
  const { msalInstance } = getAuthState()
  const name = msalInstance.getAllAccounts()[0]?.name ?? "Bruker uten navn"

  return (
    <Flex direction="column" minHeight="100vh">
      <header>
        <Flex bg="gray.100" p={8} justifyContent="space-between" alignItems="center">
          <Logo />
          <Heading size="3xl">Varslingstjeneste for egenregistrering</Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Icon icon="person" />
            <Text>{name}</Text>
            <Tabs ml={8} size="lg" defaultValue="0">
              <Flex>
                {tabs.map((tab, index) => (
                  <TabsList key={tab.label}>
                    <TabsTrigger value={index.toString()} onClick={() => navigate(tab.url)}>
                      {tab.label}
                    </TabsTrigger>
                  </TabsList>
                ))}
              </Flex>
            </Tabs>
          </Flex>
        </Flex>
      </header>
      <main>
        <Container maxW="1500px" p={0} py={[10, 20]} px={[10, 20, 40]}>
          <Outlet />
        </Container>
      </main>
      <Footer excludeContactInfo excludeHelp excludeNews excludeOpeningHours excludeSocialMedia />
    </Flex>
  )
}
