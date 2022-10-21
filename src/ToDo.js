import React, { useState } from "react";
import Input from "./Input";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import list from "./List.json";
import "./ToDo.css";

const ToDo = () => {
  const [openInput, setOpenInput] = useState(false);
  const [todos, setTodos] = useState(list);
  const [dataSearch, setDataSearch] = useState("");
  const [isUpdate, setUpdate] = useState({
    update: false,
    data: "",
  });

  //GET DATA TODO FROM INPUT TODO
  const inputTodo = (data) => {
    list.unshift(data);
  };

  //INPUT TODO UPDATE
  const inputTodoUpdate = (data) => {
    const listBaru = list.map((item) => {
      if (item.id === data.id) {
        item.task = data.task;
      }
      return item;
    });
    list = listBaru;
    setTodos(listBaru);
    setUpdate({ update: false, data: "" });
  };

  // HANDLE CHECKED ICON
  const checkbox = (e) => {
    const data = todos.map((item) => {
      if (e.target.name === item.task) {
        item.complete = !item.complete;
      }
      return item;
    });
    setTodos(data);
  };

  //HANDLE SEARCH
  const search = () => {
    const data = list.filter((item) => {
      return dataSearch.toLocaleLowerCase() === item.task.toLocaleLowerCase();
    });
    setTodos(data);
  };

  //HANDLE BUTTON DONE
  const done = () => {
    const data = list.filter((item) => {
      return item.complete === true;
    });
    setTodos(data);
  };

  //HANDLE BUTTON TODO
  const todoBtn = () => {
    const data = list.filter((item) => {
      return item.complete === false;
    });
    setTodos(data);
  };

  // HANDLE DELETE DONE TASK
  const deleteAllDone = () => {
    const data = list.filter((item) => {
      return item.complete !== true;
      // return item.complete === false;
    });
    list = data;
    setTodos(data);
  };

  //HANDLE DELETE ALL
  const deleteAll = () => {
    setTodos("");
    list = [];
  };

  //HANDLE DELETE ICON
  const delte = (name) => {
    const data = list.filter((item) => {
      return item.task !== name;
    });
    list = data;
    setTodos(data);
    // setUpdate({
    //   ...update,
    //   update: false,
    // });
  };

  //HANDLE EDIT ICON
  const update = (id) => {
    const data = list.find((item) => {
      return item.id === id;
    });
    setUpdate({
      ...isUpdate,
      update: true,
      data: data,
    });
    setOpenInput(true);
  };

  return (
    <div className="todo_wrapper">
      {openInput ? ( //Ternari operator
        <Input
          sub={setOpenInput}
          funcInput={inputTodo}
          update={isUpdate}
          inputUpdate={inputTodoUpdate}
        />
      ) : (
        <>
          <h1>TodoSearch</h1>
          <div className="todo__top">
            <div className="top">
              <div className="todo_search">
                <div className="icon-box">
                  <FaSearch className="icon" />
                </div>
                <input
                  onChange={(e) => setDataSearch(e.target.value)}
                  type="text"
                  placeholder="Search Todo"
                />
              </div>
              <button onClick={search} type="submit">
                Search
              </button>
            </div>
            <div className="bottom">
              <button onClick={() => setOpenInput(true)} type="submit">
                Add new Task
              </button>
            </div>
          </div>
          <h1 className="list_title">ToDoList</h1>
          <div className="todo__botton">
            <button onClick={() => setTodos(list)} type="button">
              All
            </button>
            <button onClick={done} type="button">
              Done
            </button>
            <button onClick={todoBtn} type="button">
              ToDo
            </button>
          </div>
          <div className="list_box">
            {todos &&
              todos.map((item) => (
                <div key={item.id} className="todo_wrapp">
                  <p>{item.task}</p>
                  <div className="todo_listkanan">
                    <input
                      name={item.task}
                      checked={item.complete}
                      className="checkbox"
                      onChange={checkbox}
                      type="checkbox"
                    />
                    <FaPencilAlt
                      onClick={() => update(item.id)}
                      className="edit"
                    />
                    <MdDelete
                      onClick={() => delte(item.task)}
                      className="del"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="dtn">
            <button onClick={deleteAllDone}>Delete Done Tasks</button>
            <button onClick={deleteAll}>Delete All Tasks</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
