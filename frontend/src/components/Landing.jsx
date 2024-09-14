import React from 'react';
import {
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    IconButton,
    Button,
    Avatar,
    Container,
    useColorModeValue,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, InfoIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const AnimatedBox = motion(Box);

const JobJourneyUI = () => {
    return (
        <Container maxW="container.xl" p={4}>
            {/* Header */}
            <Flex
                as="header"
                justify="space-between"
                align="center"
                p={4}
                background="#745236"
                borderRadius="lg"
                shadow="lg"
                mb={8}
            >
                <Flex align="center">
                    <Avatar name="Job Journey" size="lg" mr={4} />
                    <Text fontSize="2xl" fontWeight="bold" color="#E3DCCC" fontFamily="serif">
                        Job Journey
                    </Text>
                </Flex>
                <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
                    {['Features', 'Profile', 'Experience'].map((item) => (
                        <AnimatedBox
                            key={item}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Text fontSize="lg" fontWeight="medium" color="#E3DCCC" fontFamily="serif">
                                {item}
                            </Text>
                        </AnimatedBox>
                    ))}
                </HStack>
            </Flex>

            {/* Logo and Name */}
            <Flex mb={4} width="100%" alignItems="center">
                {/* Logo */}
                <Box>
                    <img src={logo} alt="logo" style={{ width: '330px', height: 'auto' }} />
                </Box>

                {/* Name & Title */}
                <Box ml={4}>
                    <Text fontSize="8xl" fontWeight="bold" fontFamily="serif">Job Journey</Text>
                    <Text fontSize="2xl" fontFamily="serif">Resume Parser</Text>
                </Box>
            </Flex>

            <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                {/* Sidebar */}
                <VStack
                    as="aside"
                    bg={useColorModeValue('#E3DCCC')}
                    p={4}
                    borderRadius="lg"
                    shadow="lg"
                    align="start"
                    minW={{ base: 'full', md: '25%' }}
                    spacing={4}
                >
                    {/* Contact Information */}
                    <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">Contact</Text>

                    <HStack spacing={3}>
                        <IconButton
                            icon={<PhoneIcon color="#745236" />}
                            aria-label="Phone"
                            size="lg"
                            isRound
                            borderColor="#745236"
                            borderWidth="2px"
                            backgroundColor="transparent"
                            _hover={{ backgroundColor: "white" }} // Background color when hovered
                            _active={{ backgroundColor: "#E3DCCC" }} // Background color when button is clicked
                        />
                        <Text fontFamily="serif">123-456-7890</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <IconButton
                            icon={<EmailIcon color="#745236" />}
                            aria-label="Email"
                            size="lg"
                            isRound
                            borderColor="#745236"
                            borderWidth="2px"
                            backgroundColor="transparent"
                            _hover={{ backgroundColor: "white" }} // Background color when hovered
                            _active={{ backgroundColor: "#E3DCCC" }} // Background color when button is clicked
                        />
                        <Text fontFamily="serif">hello@hackthenorth.com</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <IconButton
                            icon={<InfoIcon color="#745236" />}
                            aria-label="Location"
                            size="lg"
                            isRound
                            borderColor="#745236"
                            borderWidth="2px"
                            backgroundColor="transparent"
                            _hover={{ backgroundColor: "white" }} // Background color when hovered
                            _active={{ backgroundColor: "#E3DCCC" }} // Background color when button is clicked
                        />
                        <Text fontFamily="serif">University of Waterloo</Text>
                    </HStack>
                </VStack>

                {/* Main Content */}
                <VStack
                    spacing={8}
                    align="stretch"
                    flex={1}
                    bg={useColorModeValue('#745236')}
                    p={4}
                    borderRadius="lg"
                    shadow="lg"
                >
                    {/* Features */}
                    <AnimatedBox
                        p={4}
                        borderRadius="md"
                        background="#E3DCCC"
                        shadow="md"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                            Features
                        </Text>
                        <Button mt={4} colorScheme="#745236" variant="outline">
                            Upload
                        </Button>
                    </AnimatedBox>

                    {/* Profile */}
                    <AnimatedBox
                        p={4}
                        borderRadius="md"
                        background="#E3DCCC"
                        shadow="md"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                            Profile
                        </Text>
                    </AnimatedBox>

                    {/* Experience */}
                    <AnimatedBox
                        p={4}
                        borderRadius="md"
                        background="#E3DCCC"
                        shadow="md"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                            Experience
                        </Text>
                        <Text fontFamily="serif">Big Innovator - Sept 2024</Text>
                    </AnimatedBox>
                </VStack>
            </Flex>
        </Container>
    );
};

export default JobJourneyUI;