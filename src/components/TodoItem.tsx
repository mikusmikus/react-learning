import { useState } from "react";
import "../styles/components/item.scss";
import { Button } from "./Button";
import { Todo } from "./TodoList";

type TodoItemProps = {
  todo: Todo;
  onCheckboxChange: () => void;
  onDelete: () => void;
  onTodoSave: (newTitle: string) => void;
};

export const TodoItem = ({
  todo,
  onCheckboxChange,
  onTodoSave,
  onDelete,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newInputValue, setNewInputValue] = useState(todo.title);

  return (
    <li className="item">
      {isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onTodoSave(newInputValue);
            setIsEdit(false);
          }}
        >
          <input
            type="text"
            value={newInputValue}
            onChange={(event) => {
              setNewInputValue(event.target.value);
            }}
          />
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <h3 className="item-title">{todo.title}</h3>
      )}

      <div className="item-content">
        <label htmlFor={todo.id}>
          {todo.isDone ? "Done" : "Not done"}
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.isDone}
            onChange={() => {
              onCheckboxChange();
              //
            }}
          />
        </label>
        <Button onButtonClick={onDelete}>Delete</Button>
        <Button
          variant={isEdit ? "secondary" : "primary"}
          onButtonClick={() => {
            setIsEdit(!isEdit);

            if (isEdit) {
              setNewInputValue(todo.title);
            }
          }}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </div>
    </li>
  );
};
