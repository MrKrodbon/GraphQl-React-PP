import AddTodo from "./components/AddTodo";
import GetAllTodo from "./components/GetAllTodo";
import Messages from "./components/GetTodoFromSub";
import TodoList from "./components/TodoList";


function App() {
  

  return (
    <div className="App">
      <AddTodo />
      <GetAllTodo/>
      <TodoList />
      <Messages/>
    </div>
  );
}

export default App;
