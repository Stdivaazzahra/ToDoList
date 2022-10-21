import React, { useState } from "react";
import "./Input.css";
import "./ToDo.css";
import { FaBook } from "react-icons/fa";

const Input = (props) => {
  const [todo, setTodo] = useState({
    id: "id-diva~" + new Date().getTime(),
    task: "",
    complete: false,
  });

  const [todoUpdate, setTodoUpdate] = useState({
    id: props.update.data.id,
    task: props.update.data.task,
    complete: props.update.data.complete,
  });

  const sumbitBtn = () => {
    if (props.update.update) {
      props.sub(false);
      props.inputUpdate(todoUpdate);
    } else {
      props.sub(false);
      props.funcInput(todo);
    }
  };
  console.log(props);

  return (
    <div className="input">
      <h1>{!props.update.update ? "TodoInput" : "EditTodo"}</h1>
      <div className="input_wrap">
        <div className="todo_search">
          <div className="icon-box">
            <FaBook className="icon" />
          </div>
          <input
            onChange={(e) =>
              props.update.update
                ? setTodoUpdate({ ...todoUpdate, task: e.target.value })
                : setTodo({ ...todo, task: e.target.value })
            }
            type="text"
            placeholder="Search Todo"
            value={props.update.update ? todoUpdate.task : todo.task}
          />
        </div>
        <button onClick={sumbitBtn} className="btn__input" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Input;
