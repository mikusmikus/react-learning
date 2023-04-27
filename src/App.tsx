import { useState } from "react";
import "./styles/App.scss";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Button";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  decription?: string;
};

// Mājas darbs:


// Button componenete, kas izdzēš todo item.
// Iznest formu un todo list uz jaunu komponenti!
// Uztaisīt edit opciju, kad parādās input laukus un var updeitot todo item title
// Nostilot visu.

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <h1>Todo App</h1>

      <Button
        onButtonClick={(props) => {
          console.log("props", props);
          // alert("Hello world");.
        }}
      >
        Click me
      </Button>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const newTodo: Todo = {
            title: inputValue,
            id: Math.random().toString(),
            isDone: false,
          };

          setTodos([...todos, newTodo]);

          setInputValue("");
        }}
      >
        <label htmlFor="todo-title">Add todo</label>
        <input
          id="todo-title"
          type="text"
          value={inputValue}
          placeholder="Nopirkt pārtiku..."
          onChange={(event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
          }}
        />

        <button type="submit">Add todo</button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              onCheckboxChange={() => {
                const newTodos = todos.map((todoItem) => {
                  if (todoItem.id === todo.id) {
                    return {
                      ...todoItem,
                      isDone: !todoItem.isDone,
                    };
                  }

                  return todoItem;
                });

                setTodos(newTodos);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
