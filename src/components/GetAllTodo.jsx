import { useState } from "react";
import { Button, FormControl, Input, Spinner } from "@chakra-ui/react";
import { useMutation,useLazyQuery,useQuery,useApolloClient } from "@apollo/client";
import TodoItem from "./TodoItem";
import { VStack } from "@chakra-ui/react";

import {ALL_TODO, DELETE_TODO, UPDATE_TODO } from "../apollo/todos";

const GetAllTodo = () => {
    // const [getAll,{ loading, error, data }] = useLazyQuery(ALL_TODO);
    const [fetchPolicy, setFetchPolicy] = useState('network-only');
    const {loading, error, data, refetch } = useQuery(ALL_TODO,{
        fetchPolicy:fetchPolicy,
        skip: fetchPolicy === "no-cache"
    });
    const client = useApolloClient();

    const [toggleTodo,{error: updateError}] = useMutation(UPDATE_TODO);
    const [removeTodo,{error:removeError}] = useMutation(DELETE_TODO,{
      update(cache,{data:{removeTodo}}){
        cache.modify({
          fields:{
            allTodos(currentTodos = []){
              return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo}`)
            }
          }
        }
        )
      }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Refetching data...");
    
        try {
            // Step 1: Clear the cache
            await client.cache.reset();
            console.log("Cache reset!");
    
            // Step 2: Evict the query and garbage collect
            client.cache.evict({ id: "ROOT_QUERY", fieldName: "allTodos" });
            client.cache.gc();
            console.log("Query evicted!");
    
            // Step 3: Force `cache-only` before refetching
            setFetchPolicy("cache-only");
    
            // Step 4: Attempt to refetch (should fail)
            const result = await refetch();
    
            if (!result.data || !result.data.todos.length) {
                throw new Error("Cache is empty, no data found!");
            }
    
            console.log("Refetch complete:", result);
        } catch (error) {
            console.error("Refetch error:", error);
        } finally {
            // Reset fetch policy so future fetches work
            setFetchPolicy("network-only");
        }
    };
    
    
    
    if (loading) {
      return <Spinner />;
    }
  
    if (error || updateError || removeError ) {
      return <h2>error...</h2>;
    }

  return (
    <FormControl display={"flex"} mt={6}>
      {/* <Button onClick={() => getAll()}>Get all</Button> */}
      <Button onClick={handleSubmit}>Get all</Button>
      <Button >Clear cache</Button>
      <VStack spacing={2} mt={4}>
      {
                data?.todos.map((todo) => (
                    <TodoItem key={todo.id} {...todo} onToggle={toggleTodo} onDelete={removeTodo} />
                ))}
      </VStack>
      
    </FormControl>
  );
};

export default GetAllTodo;
