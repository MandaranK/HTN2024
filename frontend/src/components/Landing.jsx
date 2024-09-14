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
                background= "#745236"
                borderRadius="lg"
                shadow="lg"
                mb={8}
            >
                <Flex align="center">
                    <Avatar name="Job Journey" size="lg" mr={4} />
                    <Text fontSize="2xl" fontWeight="bold" color="#E3DCCC">
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
                            <Text fontSize="lg" fontWeight="medium" color="#E3DCCC">
                                {item}
                            </Text>
                        </AnimatedBox>
                    ))}
                </HStack>
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
                >
                    <IconButton
                        icon={<PhoneIcon />}
                        aria-label="Phone"
                        colorScheme="#745236"
                        size="lg"
                        variant="ghost"
                        isRound
                    />
                    <Text>123-456-7890</Text>

                    <IconButton
                        icon={<EmailIcon />}
                        aria-label="Email"
                        colorScheme="#745236"
                        size="lg"
                        variant="ghost"
                        isRound
                    />
                    <Text>hello@hackthenorth.com</Text>

                    <IconButton
                        icon={<InfoIcon />}
                        aria-label="Location"
                        colorScheme="#745236"
                        size="lg"
                        variant="ghost"
                        isRound
                    />
                    <Text>University of Waterloo</Text>
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
                        <Text fontSize="2xl" fontWeight="bold" color="#745236">
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
                        <Text fontSize="2xl" fontWeight="bold" color="#745236">
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
                        <Text fontSize="2xl" fontWeight="bold" color="#745236">
                            Experience
                        </Text>
                        <Text color="#745236">Big Innovator - Sept 2024</Text>
                    </AnimatedBox>
                </VStack>
            </Flex>
        </Container>
    );
};

export default JobJourneyUI;