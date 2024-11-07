import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import TermsConditions from "./Pages/TermsConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";

function App() {
	
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<SignUp />} />
					<Route exact path="/linkedin" element={<LinkedInCallback />} />
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route exact path="/terms" element={<TermsConditions />} />
					<Route exact path="/policy" element={<PrivacyPolicy />} />
					<Route exact path="/contact" element={<ContactUs />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
