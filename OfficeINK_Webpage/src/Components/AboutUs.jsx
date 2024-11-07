import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import badge from "../MS_Badge_Light.png";
const AboutUs = () => {
	const buttonStyle = {
		color: "white",
		p: "1em",
		borderRadius: "7px",
		bg: "#021459",
		cursor: "pointer",
		textDecor: "none",
		"&:hover": {
			bg: "#344ca5",
			color: "white",
			textDecoration: "none",
		},
	};

	return (
		<>
			<Flex justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
				<Box>
					<Text
						as="h1"
						sx={{ fontWeight: "bold" }}
						fontSize={{ base: "1.3em", md: "1.5em", lg: "2em" }}
					>
						Stand out to your prospects <br /> on Linkedin NOW!
					</Text>
					<Box as="div">
						{" "}
						<Text
							as="h4"
							sx={{ fontWeight: "0" }}
							fontSize={{ base: "14px", md: "16px", lg: "20px" }}
						>
							Office Ink writes personalised and <br /> meaningful{" "}
							<strong>comments</strong> and <strong>posts</strong> in clicks
						</Text>{" "}
					</Box>
					<Button
						as="a"
						my="1em"
						variant="solid"
						sx={buttonStyle}
						href="/signup"
					>
						Get Started For Free
					</Button>
				</Box>
				<Box>
					<Text sx={{ textAlign: "center", my: "1rem" }}>
						Sign Up to beta without entering credit card
					</Text>
					<Container width={[350, 350, 560]} height={[215, 215, 315]}>
						<iframe
							src="https://www.youtube.com/embed/CJa_mMbf0sg?si=i6icDFR0bNAfEEOM"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen="allowfullscreen"
							style={{ width: "100%", height: "100%" }}
						></iframe>
					</Container>
				</Box>
			</Flex>
			<Box as="div" textAlign="center" my="2em" bg="#D9D9D9" p="1em">
				<Text
					as="h1"
					sx={{ fontWeight: "bold" }}
					fontSize={{ base: "1.3em", md: "1.5em", lg: "2em" }}
				>
					Are you a linkedin power user?
				</Text>
				<Flex justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
					<Box as="div" display="flex" alignItems="baseline" >
						<Text
							sx={{ fontWeight: "bold", mx: ".6rem" }}
							fontSize={{ base: "1.5em", md: "2em", lg: "3em" }}
						>
							9x
						</Text>{" "}
						<span style={{ marginTop: "1.5rem" }}> your engagement</span>
					</Box>
					<Box as="div" display="flex" alignItems="baseline">
						<Text
							sx={{ fontWeight: "bold", mx: ".6rem" }}
							fontSize={{ base: "1.4em", md: "2em", lg: "3em" }}
						>
							9x
						</Text>{" "}
						<span style={{ marginTop: "1.5rem" }}> your reach</span>
					</Box>
					<Box as="div" display="flex" alignItems="baseline">
						<Text
							sx={{ fontWeight: "bold", mx: ".6rem" }}
							fontSize={{ base: "1.5em", md: "2em", lg: "3em" }}
						>
							9x
						</Text>{" "}
						<span style={{ marginTop: "1.5rem" }}> your productivity</span>
					</Box>
				</Flex>
				<Button as="a" href="/signup" variant="solid" my="1em" sx={buttonStyle}>
					Try Now For Free
				</Button>
			</Box>
			<Box as="div">
				<Image src={badge} sx={{ m: "2em auto", borderRadius: "2rem" }} />
			</Box>
		</>
	);
};

export default AboutUs;
