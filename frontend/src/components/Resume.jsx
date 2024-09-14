import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Center,
  useToast,
  FormControl,
  FormHelperText,
  Divider,
  Spinner,
  Progress,
} from "@chakra-ui/react";

export default function Resume() {
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusColor, setStatusColor] = useState("#745236");
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileName("No file chosen");
      setStatus("");
      setStatusColor("#745236");
      return;
    }

    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const isValidMimeType = allowedMimeTypes.includes(file.type);

    if (!isValidMimeType) {
      setStatus("Invalid file type. Please upload a .pdf, .doc, or .docx file.");
      setFileName("No file chosen");
      setStatusColor("red.500");
      return;
    }

    setFileName(file.name);
    setStatus("");
    setStatusColor("#745236");
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const fileInput = document.getElementById("resume-upload");
    const file = fileInput.files[0];

    if (!file) {
      setStatus("Please select a file before uploading.");
      setIsUploading(false);
      return;
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setStatus("File uploaded successfully!");
        toast({
          title: "Upload Successful",
          description: "Your resume has been uploaded.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }, 200);
  };

  return (
    <Center minH="100vh" bg="#E3DCCC">
      <Box
        p={8}
        bg="white"
        maxW="xl"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="#745236"
        textAlign="center"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
      >
        <VStack spacing={6} align="stretch">
          <Text fontSize="4xl" fontWeight="bold" color="#745236">
            Upload Your Resume
          </Text>
          <Divider borderColor="#745236" />
          <Text color="#745236" fontSize="lg">
            Please upload your resume in PDF, DOC, or DOCX format.
          </Text>
          <form onSubmit={handleFileUpload}>
            <FormControl mb={6}>
              <CustomFileInput>
                <Button
                  variant="outline"
                  as="label"
                  htmlFor="resume-upload"
                  fontSize="lg"
                  fontWeight="medium"
                  color="#745236"
                  mb={2}
                  borderRadius="md"
                  borderColor="#745236"
                  borderWidth={2}
                  padding={4}
                  _hover={{ bgColor: "#C9B09D", borderColor: "#6b4f3c" }}
                  _active={{ bgColor: "#d9d9d9" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  Choose File
                </Button>
                <Input
                  type="file"
                  id="resume-upload"
                  accept=".pdf, .doc, .docx"
                  size="md"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Text color="#745236" fontSize="lg">
                  {fileName}
                </Text>
              </CustomFileInput>
              <FormHelperText color={statusColor} mt={2}>
                {status}
              </FormHelperText>
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isUploading}
              loadingText="Uploading..."
              size="lg"
              width="full"
              borderRadius="md"
              bg="#745236"
              _hover={{ bg: "#6b4f3c" }}
              _active={{ bg: "#5a3d2d" }}
              _focus={{ boxShadow: "outline" }}
              rightIcon={isUploading ? <Spinner size="sm" color="white" /> : null}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            {isUploading && (
              <Box mt={4}>
                <Progress value={uploadProgress} colorScheme="teal" size="md" />
                <Text color="#745236" mt={2}>
                  {uploadProgress}% Upload Progress
                </Text>
              </Box>
            )}
          </form>
          {status && (
            <Text color={statusColor} mt={4}>
              {status}
            </Text>
          )}
        </VStack>
      </Box>
    </Center>
  );
}

const CustomFileInput = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    {children}
  </Box>
);
