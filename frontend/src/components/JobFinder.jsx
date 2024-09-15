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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { inDemandTechStack } from "../constants/tools"; 

export default function JobFinder() {
  const [jobListings, setJobListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState(["React", "JavaScript", "SQL"]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
        headers: {
          'X-RapidAPI-Key': 'ebc4358f37msh8fa8093e8cf792cp176dd7jsn6ec094519f70', 
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
          query: searchTerm,
          location: location,
          page: '1', 
          num_pages: '1' 
        }
      });

      let filteredJobs = response.data.data.filter((job) => {
        const matchesFilter = filter ? job.job_employment_type === filter : true;
        const matchesDate = dateFilter ? job.posted_at === dateFilter : true;
        const matchesSalary = salaryRange
          ? job.job_salary_range_min >= parseInt(salaryRange.split("-")[0]) &&
            job.job_salary_range_max <= parseInt(salaryRange.split("-")[1])
          : true;

        return matchesFilter && matchesDate && matchesSalary;
      });

      const recommendedJobs = skillBasedRecommendations(skills, inDemandTechStack, filteredJobs);
      filteredJobs = [...filteredJobs, ...recommendedJobs];

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
    } catch {
      setError("Error fetching jobs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const skillBasedRecommendations = (userSkills, techStack, jobs) => {
    return jobs.filter((job) => {
      return (
        userSkills.some((skill) => job.job_description.includes(skill)) ||
        techStack.some((tech) => job.job_description.includes(tech))
      );
    });
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  return (
    <Center minH="100vh" bg="#E3DCCC">
      <Box
        p={6}
        bg="white"
        maxW="full"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="#745236"
        textAlign="center"
        w="100%"
        minH="100vh"
      >
        <VStack spacing={6}>
          <Text fontSize="3xl" fontWeight="bold" color="#745236">
            Jobs
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

          <FormControl>
            <FormLabel>Date Posted</FormLabel>
            <Select
              placeholder="Select date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              borderColor="#745236"
              _hover={{ borderColor: "#745236" }}
            >
              <option value="last-24-hours">Last 24 Hours</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Salary Range</FormLabel>
            <Select
              placeholder="Select salary range"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              borderColor="#745236"
              _hover={{ borderColor: "#745236" }}
            >
              <option value="0-50000">Up to $50,000</option>
              <option value="50001-100000">$50,001 - $100,000</option>
              <option value="100001-150000">$100,001 - $150,000</option>
              <option value="150001-200000">$150,001 - $200,000</option>
              <option value="200001-">Above $200,000</option>
            </Select>
          </FormControl>

          <Button
            onClick={fetchJobs}
            isLoading={isLoading}
            loadingText="Searching..."
            bg="#745236"
            color="white"
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
            {jobListings.map((job) => (
              <Box
                key={job.job_id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="#745236"
                bg="white"
                shadow="md"
                w="full"
                textAlign="left"
                onClick={() => handleJobClick(job)}
                cursor="pointer"
              >
                <Text fontWeight="bold" color="#745236">
                  {job.job_title}
                </Text>
                <Text color="gray.600">{job.employer_name}</Text>
                <Text>{job.job_city}, {job.job_country}</Text>
                <Text mt={2} noOfLines={2}>
                  {job.job_description}
                </Text>
              </Box>
            ))}
          </VStack>

          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedJob?.job_title}</ModalHeader>
              <ModalBody>
                <Text>
                  <strong>Company:</strong> {selectedJob?.employer_name}
                </Text>
                <Text>
                  <strong>Location:</strong> {selectedJob?.job_city}, {selectedJob?.job_country}
                </Text>
                <Text mt={2}>
                  <strong>Description:</strong> {selectedJob?.job_description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button bg="#745236" color="white" _hover={{ bg: "#6b4f3c" }} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    </Center>
  );
}