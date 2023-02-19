import { Box, Flex, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useMailContext } from "../../contexts/MailContext";
import { motion } from "framer-motion";
import { BoxEmailsProps } from "./interfaces";

const BoxEmails = ({ showEmail, handleBoxEmailMobile }: BoxEmailsProps) => {
  const { currentSession, boxEmails, getBoxEmails } = useMailContext();

  useEffect(() => {
    const emailInterval = setInterval(() => {
      getBoxEmails();
    }, 15000);
    return () => clearInterval(emailInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession]);

  return (
    <Flex
      w={{ base: "100%", md: "30%" }}
      bg="gray.100"
      flexDir="column"
      borderRight="1px"
      borderLeft="1px"
      borderColor="gray.400"
    >
      {boxEmails?.mails.map((email) => (
        <Box
          as={motion.div}
          display="flex"
          flexDir="column"
          pl="8px"
          borderBottom="1px"
          borderColor="gray.400"
          cursor="pointer"
          key={email.id}
          onClick={() => {
            showEmail(email);
            handleBoxEmailMobile();
          }}
          whileHover={{ backgroundColor: "Background" }}
        >
          <Text as="b" w="100%" fontSize="16px">
            {email.headerFrom}
          </Text>
          <Text as="b" color="blue.600" fontSize="12px">
            {email.headerSubject ? email.headerSubject : "Sem assunto"}
          </Text>

          <Text
            fontSize="12px"
            textOverflow="ellipsis"
            maxW="90%"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {email.text}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default BoxEmails;
