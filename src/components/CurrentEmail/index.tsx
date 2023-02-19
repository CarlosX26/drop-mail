import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { IoReload } from "react-icons/io5";
import { useMailContext } from "../../contexts/MailContext";
import Counter from "../Counter";

const CurrentEmail = () => {
  const { currentEmail, getBoxEmails } = useMailContext();
  const toast = useToast();

  const copyEmail = () => {
    window.navigator.clipboard.writeText(currentEmail!);
    toast({
      title: "Email copied",
      position: "top-right",
      isClosable: true,
      duration: 1000,
      colorScheme: "messenger",
      status: "success",
    });
  };

  return (
    <Flex
      bg="gray.100"
      p="16px"
      border="1px"
      borderColor="gray.400"
      borderRadius="0.375rem 0.375rem 0 0"
      flexDir="column"
      gap="16px"
      h="25vh"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDir="column"
        gap="16px"
        w={{ base: "100%", sm: "90%", md: "40%" }}
      >
        <Text fontSize="small">Your temporary email address</Text>
        <Flex
          border="1px"
          borderRadius="md"
          borderColor="gray.400"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text px="8px">{currentEmail ? currentEmail : "loading..."}</Text>
          <Button
            alignSelf="flex-end"
            borderLeft="1px"
            borderRadius="0px 0.375rem 0.375rem 0px"
            borderColor="gray.400"
            bg="gray.400"
            onClick={() => copyEmail()}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CopyIcon display={{ base: "none", md: "inline-block" }} />
              Copy
            </span>
          </Button>
        </Flex>
      </Box>
      <Flex alignItems="center" gap="8px">
        <Text>Autorefresh in</Text>
        <Box
          border="3px solid"
          borderRadius="50%"
          borderColor="blue.500"
          h="24px"
          w="24px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Counter />
        </Box>
        <Button
          p="0"
          minW="unset"
          h="unset"
          padding="8px"
          display="flex"
          gap="8px"
          onClick={() => getBoxEmails()}
        >
          <IoReload />
          <Text>Refresh</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default CurrentEmail;
