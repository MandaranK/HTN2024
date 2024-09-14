import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Center,
  FormControl,
  FormHelperText,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import PropTypes from "prop-types";

export default function Resume() {
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const [feedback, setFeedback] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalIndex, setModalIndex] = useState(0);
  const [ atZeroModal, setZeroModal ] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileName("No file chosen");
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
      return;
    }

    setFileName(file.name);
    setStatus(""); 
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

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/analyze-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFeedback(response.data.feedback);
      setModalIndex(0);
      onOpen();
      setStatus("Upload successful!");
    } catch (error) {
      console.error("Error uploading the resume:", error);
      setStatus(
        error.response?.data?.error || "An error occurred while uploading the resume."
      );
      onOpen();
    } finally {
      setIsUploading(false);
    }
  };

  const feedbackSections = [
    "Resume Review",
    "Overall Structure and Format",
    "Education",
    "Technical Skills",
    "Work Experience",
  ];

  const renderFeedback = (feedback) => {
    const feedbackLines = feedback.split("**").filter(line => line.trim());

    return feedbackLines.map((line, index) => (
      <Box key={index} mt={index > 0 ? 4 : 0}>
        {line.includes(':') ? (
          <Text fontWeight="bold" color="#745236">
            {line.split(':')[0]}:
            <Text as="span" fontWeight="normal" color="#745236">
              {line.split(':')[1]}
            </Text>
          </Text>
        ) : (
          <Text color="#745236">{line}</Text>
        )}
      </Box>
    ));
  };

  const handleNextModal = () => {
    if (modalIndex < feedbackSections.length - 1) {
      setZeroModal(false);
      setModalIndex(modalIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevModal = () => {
    if (modalIndex > 0){
      setModalIndex(modalIndex - 1);
    }

    if (modalIndex == 0){
      setZeroModal(true);
    }
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
                  accept=".pdf,.doc,.docx"
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
          {status && (
            <Text color="#745236" mt={4}>
              {status}
            </Text>
          )}
        </VStack>
      </Box>

      {/* Modal Structure */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#E3DCCC">
          <ModalHeader color="#745236">{feedbackSections[modalIndex]}</ModalHeader>
          <ModalCloseButton color="#745236" />
          <ModalBody>
            {status === "Upload successful!" ? (
              <Box>{renderFeedback(feedback.split('\n\n')[modalIndex])}</Box>
            ) : (
              <Text color="#745236">{status}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            {status === "Upload successful!" && (
              <>
                <IconButton
                  icon={<ArrowBackIcon />}
                  colorScheme="teal"
                  onClick={handlePrevModal}
                  disabled={atZeroModal}
                />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  onClick={handleNextModal}
                />
              </>
            )}
            <Button variant="ghost" colorScheme="teal" onClick={onClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

const CustomFileInput = ({ children }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    {children}
  </Box>
);

CustomFileInput.propTypes = {
  children: PropTypes.node.isRequired,
};