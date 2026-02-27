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
  { label: "Send varsler til kommune", url: `opprett` },
  { label: "Status på varsler", url: `status` },
]

export const Layout = () => {
  const navigate = useNavigate()
  const { msalInstance } = getAuthState()
  const name = msalInstance.getAllAccounts()[0]?.name ?? "Bruker uten navn"

  return (
    <Flex direction="column" minHeight="100vh">
      <header>
        <Flex bg="gray.100" p={6} justifyContent="space-evenly" alignItems="center">
          <Logo variant="horizontal" />
          <Heading size="xl">Varslingstjeneste for egenregistrering</Heading>
          <Flex alignItems="center" justifyContent="space-between" gap={10}>
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
            <Flex gap={2}>
              <Icon icon="person" />
              <Text>{name}</Text>
            </Flex>
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
