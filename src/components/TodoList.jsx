
import { Spinner } from "@chakra-ui/react";
import { useMutation, useQuery,useLazyQuery } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import TotalCount from "./TotalCount";
import { useState } from "react";
import Messages from "./GetTodoFromSub";




const TodoList = () => {
  const { PubSub } = require("graphql-subscriptions");


  
  return (
    <>
      <Messages></Messages>
      <TotalCount />
    </>
  );
};

export default TodoList;
