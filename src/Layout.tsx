import {
  Container,
  Flex,
  Footer,
  Header,
  Heading,
  SimpleGrid,
  Tabs,
  TabsTrigger,
} from "@kvib/react"
import { Outlet, useNavigate } from "react-router-dom"

const tabs = [
  { label: "Sending av varsel", url: "/" },
  { label: "Oversikt", url: `/orders` },
]

export const Layout = () => {
  const navigate = useNavigate()

  return (
    <SimpleGrid templateRows="auto 1fr auto" minH="100vh">
      <Header showChildrenInMenu={false}>
        <Heading>Varslinger</Heading>
        <Tabs size="md" ml="auto">
          {tabs.map((tab, index) => (
            <Flex key={index}>
              <TabsTrigger value={index.toString()} onClick={() => navigate(tab.url)}>
                {tab.label}
              </TabsTrigger>
            </Flex>
          ))}
        </Tabs>
      </Header>
      <main>
        <Container maxW="1500px" p={0} py={[10, 20]} px={[10, 20, 40]}>
          <Outlet />
        </Container>
      </main>
      <Footer excludeContactInfo excludeHelp excludeNews excludeOpeningHours excludeSocialMedia />
    </SimpleGrid>
  )
}
