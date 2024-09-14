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
  FormLabel,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";

export default function Resume() {
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileName("No file chosen");
      return;
    }

    // Allowed MIME types for .pdf, .doc, .docx
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const isValidMimeType = allowedMimeTypes.includes(file.type);

    if (!isValidMimeType) {
      setStatus("Invalid file type. Please upload a .pdf, .doc, or .docx file.");
      setFileName("No file chosen");
      return;
    }

    setFileName(file.name);
    setStatus(""); // Clear any previous error message
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

    // ...rest of the upload logic...

    setIsUploading(false);
  };

  return (
    <Center minH="100vh" bg="#E3DCCC">
      <Box
        p={6}
        bg="white"
        maxW="md"
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="#745236"
        textAlign="center"
      >
        <VStack spacing={6} align="stretch">
          <Text fontSize="3xl" fontWeight="bold" color="#745236">
            Upload Your Resume
          </Text>
          <Divider borderColor="#745236" />
          <form onSubmit={handleFileUpload}>
            <FormControl mb={4}>
              <CustomFileInput>
                <Button
                  variant="ghost"
                  as="label"
                  htmlFor="resume-upload"
                  fontSize="md"
                  fontWeight="medium"
                  color="#745236"
                  mb={2}
                  borderRadius="md"
                  _hover={{ bgColor: "#f2f2f2" }}
                  borderColor="#745236"
                  borderWidth={1}
                  boxShadow="sm"
                  padding={2}
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
                <Text color="#745236">{fileName}</Text>
              </CustomFileInput>
              <FormHelperText color="#745236" mt={2}>
                Supported file types: .pdf, .doc, .docx
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
            >
              Upload
            </Button>
          </form>
          {status && <Text color="#745236" mt={4}>{status}</Text>}
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
