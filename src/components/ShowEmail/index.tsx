import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { IShowEmailProps } from "./interfaces";

const ShowEmail = ({
  headerSubject,
  text,
  showBoxEmailMobile,
  handleBoxEmailMobile,
}: IShowEmailProps) => {
  return (
    <Box
      right={showBoxEmailMobile ? "0" : "100%"}
      w={{ base: "100%", md: "70%" }}
      h={{ base: "70vh", md: "" }}
      bottom={{ base: "0", md: "unset" }}
      bg="gray.300"
      borderRight="1px"
      borderColor="gray.400"
      position={{ base: "absolute", md: "static" }}
    >
      <Box display="flex" gap="8px" w="95%" m="0 auto" alignItems="center">
        <Button
          display={{ base: "inline-block", md: "none" }}
          h="100%"
          onClick={() => handleBoxEmailMobile()}
        >
          X
        </Button>
        <Text as="b" display="block">
          {headerSubject === undefined && "Select an email"}
          {headerSubject === "" ? "Sem assunto":headerSubject}
        </Text>
      </Box>

      <Box
        border="1px"
        borderRadius="md"
        borderColor="gray.400"
        bg="gray.100"
        width="95%"
        height="95%"
        m="0 auto"
        p="8px"
        overflow="auto"
      >
        {text}
      </Box>
    </Box>
  );
};

export default ShowEmail;
