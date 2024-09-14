import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
  Divider,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Center,
} from "@chakra-ui/react";

// Mock job data (replace with backend API calls later)
const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Toronto, Remote",
    description: "Develop scalable software solutions for cloud-based applications.",
    type: "full-time",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Designify",
    location: "New York",
    description: "Build dynamic UI components using React and Chakra UI.",
    type: "full-time",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataWorks",
    location: "San Francisco",
    description: "Analyze large datasets to derive business insights.",
    type: "part-time",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "InnovateX",
    location: "Vancouver",
    description: "Manage cross-functional teams to deliver projects on time and on budget.",
    type: "contract",
  },
  // Add more jobs as needed
];

export default function JobFinder() {
  const [jobListings, setJobListings] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3; // Number of jobs per page for pagination
  const toast = useToast();

  // Simulated fetch function (no API involved yet)
  const fetchJobs = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      let filteredJobs = mockJobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
        const matchesFilter = filter ? job.type === filter : true;

        return matchesSearch && matchesLocation && matchesFilter;
      });

      if (filteredJobs.length === 0) {
        toast({
          title: "No jobs found",
          description: "Try adjusting your search terms or filters.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }

      setJobListings(filteredJobs);
      setIsLoading(false);
    }, 1000); // Simulating an API call delay
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatedJobs = jobListings.slice(0, currentPage * jobsPerPage);

  return (
    <Center minH="100vh" bg="#E3DCCC">
      <Box
        p={6}
        bg="white"
        maxW="2xl"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="#745236"
        textAlign="center"
        w="100%"
      >
        <VStack spacing={6}>
          <Text fontSize="3xl" fontWeight="bold" color="#745236">
            Job Finder
          </Text>
          <Divider borderColor="#745236" />

          <FormControl>
            <FormLabel>Job Title / Keywords</FormLabel>
            <Input
              placeholder="e.g., Software Engineer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor="#745236"
              _hover={{ borderColor: "#745236" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="e.g., Toronto, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              borderColor="#745236"
              _hover={{ borderColor: "#745236" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Filter by</FormLabel>
            <Select
              placeholder="Select filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              borderColor="#745236"
              _hover={{ borderColor: "#745236" }}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </Select>
          </FormControl>

          <Button
            colorScheme="teal"
            onClick={fetchJobs}
            isLoading={isLoading}
            loadingText="Searching..."
            bg="#745236"
            _hover={{ bg: "#6b4f3c" }}
            size="lg"
            w="full"
          >
            Search Jobs
          </Button>

          <Divider borderColor="#745236" />

          {isLoading && <Spinner size="xl" color="#745236" />}

          {error && (
            <Text color="red.500" mt={4}>
              {error}
            </Text>
          )}

          <VStack spacing={4} w="full">
            {paginatedJobs.map((job) => (
              <Box
                key={job.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="#745236"
                bg="#FFF"
                shadow="md"
                w="full"
                textAlign="left"
              >
                <Text fontWeight="bold" color="#745236">
                  {job.title}
                </Text>
                <Text color="gray.600">{job.company}</Text>
                <Text>{job.location}</Text>
                <Text mt={2} noOfLines={2}>
                  {job.description}
                </Text>
                <Button mt={4} colorScheme="teal" size="sm" bg="#745236" _hover={{ bg: "#6b4f3c" }}>
                  Apply Now
                </Button>
              </Box>
            ))}
          </VStack>

          {paginatedJobs.length < jobListings.length && (
            <Button
              mt={4}
              colorScheme="teal"
              bg="#745236"
              _hover={{ bg: "#6b4f3c" }}
              onClick={handleLoadMore}
            >
              Load More Jobs
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  );
}
