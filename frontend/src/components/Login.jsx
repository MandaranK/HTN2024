import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    FormControl,
    FormLabel,
    Center,
    HStack,
    Link
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const navigate = useNavigate();
    
    return (
        <Center minH="100vh" bg="#E3DCCC">
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
                            borderColor="#745236"
                            _hover={{ borderColor: "#745236" }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="banana123"
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

                    <HStack>
                        <Text color="gray.600">Don't have an account?</Text>
                        <Link color="#745236" onClick={() => navigate('/register')}>
                            Register
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}