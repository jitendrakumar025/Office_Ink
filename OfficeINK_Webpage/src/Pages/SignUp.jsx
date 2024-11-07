import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import fullLogo from "../OfficeINK_fullLOGO.png";
import { BsLinkedin } from "react-icons/bs";
import {FcGoogle} from 'react-icons/fc'
import { useSearchParams } from "react-router-dom";


function SignUp() {

	const [searchParams, setSearchParams] = useSearchParams();
	// const serverUrl = "https://backend.officeink.live";
	const serverUrl = "http://localhost:5000";

	const googleLogin = async () => {
		window.location.href = `${serverUrl}/auth/google?id=` + searchParams.get("id");
		console.log("api hit!");
		localStorage.setItem("id", JSON.stringify(searchParams.get("id")));
	};

	const fontSizes = {
		base: "1.3em",
		md: "1.5em",
		lg: "1.6em",
	};

	return (
		<> 
			<Box
			    width={{base:'100vw',md:'60vw',lg:'40vw'}}

				sx={{
					margin: "2em auto",
					p: "2em",
					backgroundColor: "#fafafa",
					borderRadius: "1rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text fontSize={fontSizes} sx={{textAlign: "center", fontWeight: "700" }}>
					Automate your Linkedin Engagement with OFFICE INK
				</Text>
				<Text sx={{ fontSize: "1.5em" }}>Register to access tool</Text>
				<Box>
					<Image src={fullLogo} alt="logo" sx={{ height: "10em" }} />
				</Box>
				<Box>
					{/* <Text>Sign in with Google</Text> */}
					<Button p="1em" my="1em" onClick={googleLogin}>
						<FcGoogle style={{ color: "#0277B5", fontSize: "2em" }} />
						<Text sx={{ fontSize: "1em", mx: "1rem" }}>
							Sign up with Google
						</Text>
					</Button>
					<Text>
						Already have an acount?
						<Link href="/login" mx="1rem" color="#475BFF">
							Login
						</Link>{" "}
					</Text>
				</Box>
			</Box>
		</>
	);
		
}

export default SignUp;
