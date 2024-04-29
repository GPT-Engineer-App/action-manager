import { useState } from "react";
import { Box, Input, Button, VStack, HStack, Text, useToast, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No content",
        description: "You can't add an empty todo!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, input]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Input placeholder="Add a new todo..." value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddTodo}>
          Add Todo
        </Button>
        <VStack spacing={2} align="stretch">
          {todos.map((todo, index) => (
            <HStack key={index} justify="space-between">
              <Text>{todo}</Text>
              <IconButton icon={<FaTrash />} aria-label={`Delete "${todo}"`} onClick={() => handleDeleteTodo(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;
