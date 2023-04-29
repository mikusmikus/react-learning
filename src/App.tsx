import "./styles/App.scss";
import { TodoList } from "./components/TodoList";
import { TodoListFromServer } from "./components/TodoListFromServer";

function App() {
  return (
    <div>
      {/* <TodoList /> */}
      <TodoListFromServer />
    </div>
  );
}

export default App;
