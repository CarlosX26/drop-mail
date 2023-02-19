import { Box, Flex, Text } from "@chakra-ui/layout";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import BoxEmails from "./components/BoxEmails";
import CurrentEmail from "./components/CurrentEmail";
import ShowEmail from "./components/ShowEmail";

export interface IShowEmail {
  id: string;
  headerFrom: string;
  headerSubject: string;
  text: string;
}

export const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
};

const theme = extendTheme({ breakpoints });

const App = () => {
  const [seeEmail, setSeeEmail] = useState<IShowEmail>();
  const [showBoxEmailMobile, setShowBoxEmailMobile] = useState(false);

  const handleBoxEmailMobile = () => {
    setShowBoxEmailMobile((state) => !state);
  };

  const showEmail = (email: IShowEmail) => {
    setSeeEmail(email);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Box px={{ base: "0", md: "8px" }} m="0 auto">
          <CurrentEmail />
          <Flex h="5vh">
            <Text
              bg="gray.100"
              borderLeft="1px"
              borderRight="1px"
              borderBottom="1px"
              borderColor="gray.400"
              p="4px 0px 0px 8px"
              w={{ base: "100%", md: "30%" }}
            >
              Inbox
            </Text>
            <Box
              display={{ base: "none", md: "block" }}
              w="70%"
              bg="gray.300"
              borderBottom="1px"
              borderRight="1px"
              borderColor="gray.400"
            ></Box>
          </Flex>
          <Flex h="70vh">
            <BoxEmails
              showEmail={showEmail}
              handleBoxEmailMobile={handleBoxEmailMobile}
            />
            <ShowEmail
              headerSubject={seeEmail?.headerSubject}
              text={seeEmail?.text}
              showBoxEmailMobile={showBoxEmailMobile}
              handleBoxEmailMobile={handleBoxEmailMobile}
            />
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
