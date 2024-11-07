import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	Toast,
	Tooltip,
	useDisclosure,
	useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// const serverUrl = "https://backend.officeink.live";
const serverUrl = "http://localhost:5000";

function EditableBox(props) {
	/* Here's a custom control */

	const { tone, defaultPrompt, purpose, id } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [promptInfo, setPromptInfo] = useState({
		id: id,
		tone: "",
		prompt: defaultPrompt,
	});

	const handleUpdate = async (purpose) => {
		if (purpose === "comment") {
			console.log(
				"promptInfo.prompt--> ",
				promptInfo.prompt,
				" id--> ",
				promptInfo.id
			);
			const token = JSON.parse(localStorage.getItem("token"));
			await axios
				.put(
					`${serverUrl}/api/prompt/updatecomment/${promptInfo.id}`,
					{
						prompt: promptInfo.prompt,
					},
					{ headers: { Authorization: token }, withCredentials: true }
				)
				.then((res) => {
					onClose();
					return Toast({
						title: `Prompt updated successfully`,
						status: "success",
						isClosable: true,
					});
				})
				.catch((err) => {
					console.log("ERROR: ", err);
					return Toast({
						title: `Something Went Wrong`,
						status: "error",
						isClosable: true,
					});
				});
			console.log("comment");
		} else if (purpose === "post") {
			console.log("post");
			console.log(
				"promptInfo.prompt--> ",
				promptInfo.prompt,
				" id--> ",
				promptInfo.id
			);
			const token = JSON.parse(localStorage.getItem("token"));
			await axios
				.put(
					`${serverUrl}/api/prompt/updatepost/${promptInfo.id}`,
					{
						prompt: promptInfo.prompt,
					},
					{ headers: { Authorization: token }, withCredentials: true }
				)
				.then((res) => {
					onClose();
					return Toast({
						title: `Prompt updated successfully`,
						status: "success",
						isClosable: true,
					});
				})
				.catch((err) => {
					console.log("ERROR: ", err);
				});
			console.log("comment");
		}
	};

	const handleChange = (e) => {
		setPromptInfo({
			...promptInfo,
			[e.target.name]: e.target.value,
		});
	};
    
	const gap = {
		base: "1em",
		md: "2em",
		lg: "3em",
	};
    const [isLargerThan900px] = useMediaQuery('(min-width: 900px)')

	return (
		<>
		   {isLargerThan900px ?(
			<>
			<Flex gap={gap} my="1em" alignItems="center">
				<Box
					as="div"
					sx={{
						border: "2px solid #0C26FE",
						borderRadius: ".3rem",
						px: "1rem",
					}}
					minW="8em"
				>   
					<Text>{tone}</Text>
				</Box>
				<Tooltip label="Click to edit" shouldWrapChildren={true}>
					<Box
						onClick={onOpen}
						as="div"
						sx={{
							border: "1px solid black",
							borderRadius: ".5rem",
							px: "1rem",
							w: "80vw",
							cursor: "pointer",
						}}
					>
						<Text>{promptInfo.prompt}</Text>
					</Box>
				</Tooltip>
			</Flex>

			
			</>
		   ):(
			<>
			<Card sx={{width:'48vw',m:'1rem',boxSize:'xs',h:'auto'}}>
			<CardHeader display='flex' justifyContent='space-between'>
			     <Heading size='md'> 
			      <Text as="h4" sx={{ fontWeight: "bold" }}>
				  { purpose==='comment'?(<>Tone:</>):(<>Example</>)}
						</Text>
				  </Heading>
				  <Box
					// as="div"
					sx={{
						// border: "2px solid #0C26FE",
						borderRadius: ".3rem",
						px: "1rem",
	
					}}
					// minW="8em"
				>
					<Text>{tone}</Text>
				</Box>
			</CardHeader>
			<CardBody>
			{/* <Tooltip label="Click to edit" shouldWrapChildren={true}> */}
			<Heading size='md'> 
			      <Text as="h4" sx={{ fontWeight: "bold",mb:'1rem'}}>
					 { purpose==='comment'?(<>Prompt</>):(<>Post Example</>)}
					</Text>
				  </Heading>
					<Box
						as="div"
						sx={{
							border: "1px solid gray",
							borderRadius: ".5rem",
							px: "1rem",
							// minW: "80vw",
							cursor: "pointer",
		
						}}
					>
						<Text>{promptInfo.prompt}</Text>
					</Box>
				{/* </Tooltip> */}
			</CardBody>
			<CardFooter>
			<Button onClick={onOpen}>Edit</Button>
			</CardFooter>
		    </Card>

			</>
			)}
           <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Prompt</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Text as="h4" sx={{ fontWeight: "bold" }}>
							Tone
						</Text>
						<Box
							as="div"
							sx={{
								border: "2px solid #0C26FE",
								borderRadius: ".3rem",
								px: "1rem",
							}}
						>
							<Text>{tone}</Text>
						</Box>
						<Text as="h4" sx={{ fontWeight: "bold" }}>
							Prompt
						</Text>
						<Textarea
							placeholder="Enter your custom prompt"
							name="prompt"
							value={promptInfo.prompt}
							onChange={handleChange}
							sx={{
								border: "1px solid black",
								borderRadius: "1rem",
								px: "1rem",
							}}
						></Textarea>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								handleUpdate(purpose);
							}}
						>
							Update
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditableBox;
