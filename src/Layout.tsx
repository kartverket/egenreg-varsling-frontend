import {
  Container,
  Footer,
  Header,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
} from "@kvib/react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Sending av varsel", url: "/" },
  { label: "Oversikt", url: `/orders` },
];

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.findIndex((route) =>
    matchPath(location.pathname, route.url),
  );

  return (
    <SimpleGrid templateRows="auto 1fr auto" minH="100vh">
      <Header>
        <Heading as="h1" size="lg">
          Varslinger
        </Heading>
        <Tabs
          size="md"
          ml="auto"
          index={activeTab}
          onChange={(index) => navigate(tabs[index].url)}
        >
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}>{tab.label}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Header>
      <main>
        <Container maxW="1500px" p={0} py={[10, 20]} px={[10, 20, 40]}>
          <Outlet />
        </Container>
      </main>
      <Footer
        excludeContactInfo
        excludeHelp
        excludeNews
        excludeOpeningHours
        excludeSocialMedia
      />
    </SimpleGrid>
  );
};
