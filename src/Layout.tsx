import { Container, Flex, Footer, Heading, Logo, Tabs, TabsList, TabsTrigger } from "@kvib/react"
import { Outlet, useNavigate } from "react-router-dom"

const tabs = [
  { label: "Sending av varsel", url: "/" },
  { label: "Oversikt", url: `/orders` },
]

export const Layout = () => {
  const navigate = useNavigate()

  return (
    <>
      <Flex bg="gray.100" p={4} pb={5} justifyContent="space-between" alignItems="center">
        <Logo />
        <Heading size="3xl">Varslinger</Heading>
        <Tabs size="lg" defaultValue="0">
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

      <main>
        <Container maxW="1500px" p={0} py={[10, 20]} px={[10, 20, 40]}>
          <Outlet />
        </Container>
      </main>
      <Footer excludeContactInfo excludeHelp excludeNews excludeOpeningHours excludeSocialMedia />
    </>
  )
}
