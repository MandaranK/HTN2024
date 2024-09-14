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

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Toronto, Remote",
    description: "Develop scalable software solutions for cloud-based applications using React and Node.js.",
    type: "full-time",
    salary: 70000,
    date: "last-7-days",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Designify",
    location: "New York",
    description: "Build dynamic UI components using React and Chakra UI. Experience with JavaScript and TypeScript required.",
    type: "full-time",
    salary: 80000,
    date: "last-30-days",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataWorks",
    location: "San Francisco",
    description: "Analyze large datasets to derive business insights. Proficiency in SQL and Python needed.",
    type: "part-time",
    salary: 60000,
    date: "last-24-hours",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "InnovateX",
    location: "Vancouver",
    description: "Manage cross-functional teams to deliver projects on time and on budget. Experience in project management tools is required.",
    type: "contract",
    salary: 90000,
    date: "last-7-days",
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Creative Labs",
    location: "Remote",
    description: "Design user-friendly interfaces with a focus on user experience. Familiarity with design tools like Figma is a plus.",
    type: "full-time",
    salary: 75000,
    date: "last-30-days",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "Web Solutions",
    location: "Seattle",
    description: "Develop and maintain server-side applications using Node.js and Express. Experience with databases like MongoDB is required.",
    type: "full-time",
    salary: 85000,
    date: "last-7-days",
  },
];

const allSkills = ["React", "JavaScript", "Python", "SQL", "Project Management", "TypeScript", "Node.js", "Figma"];

const skillBasedRecommendations = (skills) => {
  return mockJobs.filter(job => {
    return skills.some(skill => job.description.includes(skill));
  });
};

const getMatchColor = (percentage) => {
  if (percentage >= 80) return "#6b8e23";
  if (percentage >= 60) return "#ffa500";
  return "#dc143c";
};

export default function JobFinder() {
  const [jobListings, setJobListings] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [skills, setSkills] = useState(["React", "JavaScript", "SQL"]);
  const jobsPerPage = 3;
  const toast = useToast();

  const fetchJobs = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      let filteredJobs = mockJobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
        const matchesFilter = filter ? job.type === filter : true;
        const matchesDate = dateFilter ? job.date === dateFilter : true;
        const matchesSalary = salaryRange ? job.salary >= parseInt(salaryRange.split('-')[0]) && job.salary <= parseInt(salaryRange.split('-')[1]) : true;

        return matchesSearch && matchesLocation && matchesFilter && matchesDate && matchesSalary;
      });

      const recommendedJobs = skillBasedRecommendations(skills);
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
      setIsLoading(false);
    }, 1000);
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
            {paginatedJobs.map((job) => {
              const matchPercentage = Math.floor(Math.random() * 100);
              return (
                <Box
                  key={job.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor="#745236"
                  bg="white"
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
                  <Text mt={2} color={getMatchColor(matchPercentage)}>
                    Match Percentage: {matchPercentage}%
                  </Text>
                  <Button mt={4} size="sm" bg="#745236" color="white" _hover={{ bg: "#6b4f3c" }}>
                    Apply Now
                  </Button>
                </Box>
              );
            })}
          </VStack>

          {paginatedJobs.length < jobListings.length && (
            <Button
              mt={4}
              bg="#745236"
              color="white"
              _hover={{ bg: "#6b4f3c" }}
              onClick={handleLoadMore}
            >
              Load More Jobs
            </Button>
          )}

          <Box mt={8} w="full">
            <Text fontSize="2xl" fontWeight="bold" color="#745236">
              Recommended Jobs Based on Your Skills
            </Text>
            <Divider borderColor="#745236" />
            <VStack spacing={4} w="full" mt={4}>
              {skillBasedRecommendations(skills).map((job) => {
                const matchPercentage = Math.floor(Math.random() * 100);
                return (
                  <Box
                    key={job.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="#745236"
                    bg="white"
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
                    <Text mt={2} color={getMatchColor(matchPercentage)}>
                      Match Percentage: {matchPercentage}%
                    </Text>
                    <Button mt={4} size="sm" bg="#745236" color="white" _hover={{ bg: "#6b4f3c" }}>
                      Apply Now
                    </Button>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}
