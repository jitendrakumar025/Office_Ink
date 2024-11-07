import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import React, { Suspense, useEffect, useRef, useState, lazy } from "react";
import fullLogo from "../OfficeINK_fullLOGO.png";
// import EditableBox from "../Components/EditableBox";
import axios from "axios";
import Footer from "../Components/Footer";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const EditableBox = lazy(() => import("../Components/EditableBox"));

// const serverUrl = "https://backend.officeink.live";
const serverUrl = "http://localhost:5000";

const Dashboard = () => {
  const initialData = [];
  const [promptData, setpromptData] = useState(initialData);
  const [postPrompt, setpostPrompt] = useState(initialData);
  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: "",
    LinkedinID: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  let token;

  // console.log("token1", token);

  useEffect(() => {
    // let isMounted = true;
    // let controller = new AbortController();
    const cancelToken = axios.CancelToken.source();
    // console.log("cancel toekn--> ", cancelToken.token);

    console.log('URLSearchParams.get("token")', URLSearchParams.get("token"));

    token = URLSearchParams.get("token");
    if (!token && JSON.parse(localStorage.getItem("token")) == null) {
      redirect("/login");
    }
    if (token == null) {
      token = JSON.parse(localStorage.getItem("token"));
    }

    // console.log("token--> ", token);
    //    console.log(token);

    if (!token) {
      console.log("token is null");
      window.location.href = "/login";
    }

    const fetchUser = async () => {
      // console.log("fetch user");
      try {
        const res = await axios.post(
          `${serverUrl}/auth/getinfo`,
          { token: token },
          { cancelToken: cancelToken.token }
        );
        if (res.status === 200) {
          const Resuser = res.data.user;
          localStorage.setItem("token", JSON.stringify(token));
          // console.log("all data--> ", res);
          setUser({
            ...user,
            name: Resuser.name,
            email: Resuser.email,
            picture: Resuser.picture,
            LinkedinID: Resuser.LinkedinID,
          });
        } else {
          throw new Error("Failed to authenticate user");
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch aborted!");
        } else {
          console.log(err);
          // navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    fetchUser();
    return () => {
      cancelToken.cancel();
      console.log("unmounted");
      // controller.abort();
      // isMounted = false;
    };
  }, []);

  token = JSON.parse(localStorage.getItem("token"));
  // console.log("token--> ", token)
  const [Error1, setError1] = useState(null);
  const [Error2, setError2] = useState(null);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (!token) {
      console.log("token is null");
      window.location.href = "/";
    }
    const fetchData = async () => {
      // try {
      //   const token=localStorage.getItem('token');
      const result = await axios
        .get(
          `${serverUrl}/api/prompt/fetchallpromts`,
          { headers: { authorization: token } },
          { withCredentials: true },
          { cancelToken: cancelToken.token }
        )
        .then((res) => {
          console.log(res);
          console.log("prompts data--> ", res.data);
          setpromptData(res.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Fetch aborted!");
          } else {
            setError1(err);
            console.log(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });

      // setError(null);
      const result2 = await axios
        .get(
          `${serverUrl}/api/postprompt/fetchallpostprompts`,
          { headers: { authorization: token } },
          { withCredentials: true },
          { cancelToken: cancelToken.token }
        )
        .then((res) => {
          console.log("post prompts data--> ", res.data);
          setpostPrompt(res.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Fetch aborted!");
          } else {
            setError2(err);
            console.log(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      // } catch (err) {
      // 	console.log("ERROR: ", err);
      // }
    };

    const sendTokenToChromeExtension = ({ extensionId, token }) => {
      chrome.runtime.sendMessage(extensionId, { token }, (response) => {
        if (!response.success) {
          console.log("error sending message", response);
          return response;
        }
        console.log("Sucesss ::: ", response.message);
      });
    };
    const extensionid = JSON.parse(localStorage.getItem("id"));
    console.log(typeof extensionid);
    console.log("extensionid", extensionid, null);
    if (!(extensionid == null)) {
      console.log("Hello");
      sendTokenToChromeExtension({
        extensionId: extensionid,
        token,
      });
    }
    // console.log(extensionid);
    fetchData();

    return () => {
      cancelToken.cancel();
      console.log("unmounted");
    };
  }, [user]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleLogout = async () => {
    try {
      const res = await axios
        .get(`${serverUrl}/auth/logout`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setUser({
            name: "",
            email: "",
            picture: "",
            LinkedinID: "",
          });
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error in logout", err);
    }
  };
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [value, setValue] = useState({
    UserName: "",
    Bio: "",
  });

  const handleChange = (event) => {
    const { name, value: inputValue } = event.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: inputValue,
    }));
    console.log(value);
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to={"/"}>
          <Box as="div" ml="2em">
            <Image
              src={fullLogo}
              alt="logo"
              sx={{ height: "7rem", cursor: "pointer" }}
            />
          </Box>
        </Link>
        <Box
          as="a"
          btnref={btnRef}
          onClick={onOpen}
          display="flex"
          mr="2em"
          alignItems="center"
          cursor="pointer"
        >
          <Avatar name={user.name} src={user.picture} />
          <Text sx={{ color: "#021459", fontWeight: "bold", mx: "1em" }}>
            {user.name}
          </Text>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Profile</DrawerHeader>
            <Divider
              p="0"
              m="0"
              orientation="horizontal"
              h="2px"
              borderRadius="1px"
              bg="#747373"
            />
            <DrawerBody>
              <Box textAlign="center">
                <Avatar name={user.name} size="xl" src={user.picture} />
                <Text sx={{ color: "#021459", fontWeight: "bold", mt: "1rem" }}>
                  {user.name}
                </Text>
                <Text sx={{ color: "#021459", mb: "1em" }}>{user.email}</Text>
              </Box>
              <Divider
                p="0"
                m="0"
                orientation="horizontal"
                h="2px"
                borderRadius="1px"
                bg="#747373"
              />

              <Box textAlign="center">
                <Button my="1rem" onClick={onOpenModal}>
                  Add Organisation
                </Button>
              </Box>

              <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Company Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                      <Text>LinkedIn UserName : </Text>
                      <Input
                        name="UserName"
                        value={value.UserName}
                        onChange={handleChange}
                        placeholder="Enter company linkedin username"
                        size="sm"
                      />
                      <Text> LindkedIn Bio :</Text>
                      <Input
                        name="Bio"
                        value={value.Bio}
                        onChange={handleChange}
                        placeholder="Enter company linkedin bio"
                        size="sm"
                      />
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
                      Close
                    </Button>
                    <Button variant="ghost">Submit</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Box textAlign="center">
                <Button>LogOut</Button>
              </Box>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Divider
        p="0"
        m="0"
        orientation="horizontal"
        h="2px"
        borderRadius="1px"
        bg="#747373"
      />

      <Flex
        justifyContent="space-between"
        px="1rem"
        alignItems="center"
        flexWrap="wrap"
      >
        <Text
          as="h3"
          sx={{ fontWeight: "bold", my: "1rem" }}
          fontSize={{ base: "1em", md: "1.2em", lg: "1.6em" }}
        >
          Customize Voice
        </Text>
        <Box
          as="a"
          target="_blank"
          href="mailto:abhinavsingh2029@gmail.com"
          display="flex"
          mx="2em"
          alignItems="center"
        >
          <Text as="h4" sx={{ fontSize: "1rem", my: "1em" }}>
            PLAN: <span>Beta</span>
          </Text>
          <Button
            variant="outline"
            sx={{
              color: "#0C26FE",
              px: "1rem",
              py: "0",
              mx: "1rem",
              border: "2px solid #0C26FE",
              borderRadius: "7px",
              cursor: "pointer",
            }}
          >
            Support
          </Button>
        </Box>
      </Flex>

      <Divider
        p="0"
        m="0"
        orientation="horizontal"
        h="2px"
        borderRadius="1px"
        bg="#747373"
      />
      <Box as="div" display="flex" justifyContent="center">
        <Tabs enclosed-colored colorScheme="#0C26FE" sx={{ my: "1rem" }}>
          <TabList my="1rem" justifyContent="center">
            <Tab _selected={{ color: "white", bg: "#021459" }}>Comments</Tab>
            <Tab _selected={{ color: "white", bg: "#021459" }}>Posts</Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              display="flex"
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <Suspense
                fallback={
                  <div>
                    <Spinner />
                  </div>
                }
              >
                {!isloading && !Error1 ? (
                  promptData.map((item) => (
                    <EditableBox
                      key={item.id}
                      id={item.id}
                      purpose="comment"
                      tone={item.tone}
                      defaultPrompt={item.prompt}
                    />
                  ))
                ) : (
                  <div>
                    <Spinner color="red.500" />
                  </div>
                )}
              </Suspense>
            </TabPanel>

            <Suspense
              fallback={
                <div>
                  <Spinner />
                </div>
              }
            >
              <TabPanel
                display="flex"
                flexWrap="wrap"
                justifyContent="space-evenly"
              >
                {!isloading && !Error2 ? (
                  postPrompt.map((item) => (
                    <EditableBox
                      key={item.id}
                      id={item.id}
                      purpose="post"
                      tone={item.Example}
                      defaultPrompt={item.prompt}
                    />
                  ))
                ) : (
                  <div>
                    <Spinner color="red.500" />
                  </div>
                )}
              </TabPanel>
            </Suspense>
          </TabPanels>
        </Tabs>
      </Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Dashboard;
