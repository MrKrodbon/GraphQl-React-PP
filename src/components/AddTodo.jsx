import { useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, ALL_TODO } from "../apollo/todos";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [addTodo, { loading, error, data }] = useMutation(ADD_TODO);

  const handleAddTodo = () => {
    if (text.trim.length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          user_id: 123,
        },
      });
      setText("");
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) {
    return <h2>Error...</h2>;
  }

  return (
    <FormControl display={"flex"} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
