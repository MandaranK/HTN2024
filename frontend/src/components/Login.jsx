import React from "react"
import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Stack,
    Spinner,
    Divider,
    Select,
    FormControl,
    FormLabel,
    Center,
  } from "@chakra-ui/react";

export default function Login() {
    return (<Center minH="100vh" bg="#E3DCCC">
    <Box
        p={6}
        bg="white"
        width={500}
        maxW="2xl"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="#745236"
        textAlign="center"
        w="100%"
      >
        <VStack spacing={4}>
            <Text fontSize="3xl" fontWeight="bold" color="#745236">
                Welcome to Job Journey
            </Text>

            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="name@example.com"
                    // value
                    // on change
                    borderColor="#745236"
                    _hover={{ borderColor: "#745236" }}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    placeholder="banana123"
                    // value
                    // on change
                    borderColor="#745236"
                    _hover={{ borderColor: "#745236" }}
                />
            </FormControl>

            <Button
                bg="#745236"
                _hover={{ bg: "#6b4f3c" }}
                size="lg"
                w="full"
                textColor="white"
            >
                Login
            </Button>
        </VStack>
      </Box>
    </Center>
    );
}