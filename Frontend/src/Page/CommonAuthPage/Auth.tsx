/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FormEvent, useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/student";
import { useNavigate } from "react-router-dom";

export default function Auth(): JSX.Element {
  const [isSignUp, setIsSignup] = useState(false);
  const { streams, subjects } = useContext(StudentContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    stream: "",
    subject: "",
    role: "",
  });
  const handleChange = (e: FormEvent) => {
    const { name, value }: any = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      fetch("https://rurux-1.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Registration successful");
            console.log(res);
            setIsSignup(false);
          } else {
            console.log("Registration failed");
          }
        })
        .catch((err) => console.log(err));
    } else {
      fetch("https://rurux-1.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          password: details.password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          const token = data.token;

          localStorage.setItem("token", token);
          console.log("Token:", token);
          navigate("/profile");
        })
        .catch((err) => {
          console.error("Fetch error:", err);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Welcome
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        {isSignUp && (
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
            />
          </FormControl>
        )}
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            name="password"
            value={details.password}
            onChange={handleChange}
          />
        </FormControl>
        {isSignUp && (
          <FormControl id="stream" isRequired>
            <FormLabel>Stream</FormLabel>

            <Select
              name="stream"
              value={details.stream}
              onChange={handleChange}
            >
              <option value="">Select Your Stream</option>
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {isSignUp && (
          <FormControl id="subject" isRequired>
            <FormLabel>Subject</FormLabel>
            <Select
              name="subject"
              value={details.subject}
              onChange={handleChange}
            >
              <option value="">Select Your Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Select>
            {/* <Input
              placeholder="Enter a Subject"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="subject"
              value={details.subject}
              onChange={handleChange}
            /> */}
          </FormControl>
        )}

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            {isSignUp ? "Register" : "Login"}
          </Button>
        </Stack>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <div onClick={() => setIsSignup(!isSignUp)}>
            {isSignUp ? (
              <p>
                Is already register? <a href="#">Login</a>
              </p>
            ) : (
              <p>
                New here <a href="#">Signup</a>
              </p>
            )}
          </div>

          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
      </Stack>
    </Flex>
  );
}
