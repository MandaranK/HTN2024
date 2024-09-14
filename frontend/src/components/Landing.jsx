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
        <Box m={0} p={0} bg="gray.300" minH="100vh">
            <Flex direction="column" justify="space-between" minH="100vh">
                {/* Top Grey Box */}
                <Box bg="gray.300" height="50px" />

                <Flex justify="space-between" flex="1">
                    {/* Left Grey Box */}
                    <Box bg="gray.300" width="50px" />

                    {/* Main Content */}
                    <Box flex="1" border="3px solid black" borderRadius="lg" p={4} bg="white">
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
                                {['Features', 'Objective', 'Experience', 'References', 'Team'].map((item) => (
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
                                <img src={logo} alt="logo" style={{ width: '355px', height: 'auto' }} />
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
                                border="3px solid black"
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
                                        _hover={{ backgroundColor: "white" }}
                                        _active={{ backgroundColor: "#E3DCCC" }}
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
                                        _hover={{ backgroundColor: "white" }}
                                        _active={{ backgroundColor: "#E3DCCC" }}
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
                                        _hover={{ backgroundColor: "white" }}
                                        _active={{ backgroundColor: "#E3DCCC" }}
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
                                border="3px solid black"
                            >
                                {/*Features*/}
                                <Flex justify="space-between" gap={8}>
                                    {/* Left Column */}
                                    <Box flex="1" p={4} background="#E3DCCC" borderRadius="md" shadow="md" border="3px solid black">
                                        <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">Parse Your Resume</Text>                                            <Button mt={4} colorScheme="#745236" variant="outline">
                                                Upload
                                            </Button>
                                    </Box>

                                    {/* Right Column */}
                                    <Box flex="1" p={4} background="#E3DCCC" borderRadius="md" shadow="md" border="3px solid black">
                                        <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">Job Search</Text>                                            <Button mt={4} colorScheme="#745236" variant="outline">
                                                Dashboard
                                            </Button>
                                    </Box>
                                </Flex>

                                {/* Objective */}
                                <AnimatedBox
                                    p={4}
                                    borderRadius="md"
                                    background="#E3DCCC"
                                    shadow="md"
                                    whileHover={{ scale: 1.03 }}
                                    border="3px solid black"
                                >
                                    <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                                        Objective
                                    </Text>
                                    <Text fontFamily="serif">To seamlessly guide job seekers on their career journey by analyzing resumes, extracting key insights, and presenting job opportunities like never before. Helping candidates shine one résumé at a time!</Text>
                                </AnimatedBox>

                                {/* Experience */}
                                <AnimatedBox
                                    p={4}
                                    borderRadius="md"
                                    background="#E3DCCC"
                                    shadow="md"
                                    whileHover={{ scale: 1.03 }}
                                    border="3px solid black"
                                >
                                    <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                                        Experience
                                    </Text>
                                    <Text fontFamily="serif">Got Demoed at Hack The North - September 2024</Text>
                                </AnimatedBox>

                                {/* References */}
                                <AnimatedBox
                                    p={4}
                                    borderRadius="md"
                                    background="#E3DCCC"
                                    shadow="md"
                                    whileHover={{ scale: 1.03 }}
                                    border="3px solid black"
                                >
                                    <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
                                        References
                                    </Text>
                                    <Text fontFamily="serif">"Job Journey made the resume process feel like a breeze! I never knew resume scanning could be this fun."
                                        — Recruiter @ BigCorp</Text>
                                </AnimatedBox>
                            </VStack>
                        </Flex>
                    </Box>

                    {/* Right Grey Box */}
                    <Box bg="gray.300" width="50px" />
                </Flex>

                {/* Bottom Grey Box */}
                <Box bg="gray.300" height="50px" />
            </Flex>
        </Box>
    );
};

export default JobJourneyUI;
