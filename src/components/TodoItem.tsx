import { useState } from "react";
import { Todo } from "../App";

type TodoItemProps = {
  todo: Todo;
  onCheckboxChange: () => void;
};

//

export const TodoItem = ({ todo, onCheckboxChange }: TodoItemProps) => {
  return (
    <div>
      <p>{todo.title}</p>
      <button onClick={onCheckboxChange}>Click me</button>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => {
          onCheckboxChange();
          //
        }}
      />
    </div>
  );
};

