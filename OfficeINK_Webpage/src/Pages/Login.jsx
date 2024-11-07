import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import fullLogo from "../OfficeINK_fullLOGO.png";
import { BsLinkedin } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import axios from 'axios';

function Login() {

	const [searchParams, setSearchParams] = useSearchParams();

	// const serverUrl = "https://backend.officeink.live";
	const serverUrl = "http://localhost:5000";

	const googleLogin = async () => {
		// window.open(
		// 	`${serverUrl}/auth/google?id=` +
		// 		searchParams.get("id")
		// );
		window.location.href = `${serverUrl}/auth/google?id=` + searchParams.get("id");
		console.log("api hit!");
		localStorage.setItem("id", JSON.stringify(searchParams.get("id")));
	};

	// const [code, setCode] = useState("");

	const fontSizes = {
		base: "1.3em",
		md: "1.5em",
		lg: "1.6em",
	};
    


	return (
		<>
			<Box
			    as="div"
			    width={{base:'100vw',md:'60vw',lg:'40vw'}}
				sx={{
					margin: "2em auto",
					p: "2em",
					backgroundColor: "#fafafa",
					borderRadius: "1rem",
					// minWidth: "40vw",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text fontSize={fontSizes} sx={{ textAlign: "center", fontWeight: "600" }}>
					Automate your Linkedin Engagement with OFFICE INK
				</Text>
				<Text sx={{ fontSize: "1.5em" }}>login to access tool</Text>
				<Box>
					<Image src={fullLogo} alt="logo" sx={{ height: "10em" }} />
				</Box>
				<Box>
					<Button p="1em" my="1em" onClick={googleLogin}>
						<FcGoogle style={{ color: "#0277B5", fontSize: "2em" }} />
						<Text sx={{ fontSize: "1em", mx: "1rem" }}>
							Sign in with Google
						</Text>
					</Button>
					<Text>
						Don't have an acount?
						<Link href="/signup" mx="1rem" color="#475BFF">
							Sign Up
						</Link>{" "}
					</Text>
				</Box>
			</Box>
		</>
	);
}

export default Login;
