import { useState } from "react";
import { Button, FormControl, Input, Spinner } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, ALL_TODO } from "../apollo/todos";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [addTodo, { loading, error, data }] = useMutation(ADD_TODO,{
    //update cache by hand
    // update(cache,{data:{newTodo}}){
    //   //docomposing todos from cache
    //   const {todos} = cache.readQuery({query: ALL_TODO})

    //   //write to cach new todo
    //   cache.writeQuery({
    //     query: ALL_TODO,
    //     data: {
    //       todos: [newTodo, ...todos]
    //     }
    //   })
    // }

    update(cache,{data:{newTodo}}){
      const {todos} = cache.readQuery({query:ALL_TODO})

      cache.writeQuery({query: ALL_TODO,data:{todos: [newTodo, ...todos]}})
    }

    
  });

  const handleAddTodo = () => {
    if(text.trim().length){
      addTodo({
        variables:{
          title: text,
          completed: false,
          userId: 123
        }
      })
      setText('');
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) {
    return <h2>Error...</h2>;
  }

  if(loading){
    <Spinner/>
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
