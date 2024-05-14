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
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(): JSX.Element {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: FormEvent) => {
    const { name, value }: any = e.target;
    setDetails({ ...details, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("https://rurux-1.onrender.com/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: details.username,
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

        localStorage.setItem("adminToken", token);
        console.log("Token:", token);
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin");
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
          Welcome Admin
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

        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="username"
            value={details.username}
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
            Login
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
