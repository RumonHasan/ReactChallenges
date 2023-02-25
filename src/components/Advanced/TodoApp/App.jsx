import { useEffect, useState } from 'react';
import Todo from './Todo';
import './todoStyles.css';
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editInput, setEditInput] = useState('');
  const [editBoxDisplay, setEditBoxDisplay] = useState(false);
  const [editId, setEditId] = useState('');
  // object that will contain category array based on category
  const [categoryTodos, setCategoryTodos] = useState({
    homework: [],
    test: [],
    general: [],
  });
  const [selectCategory, setSelectCategory] = useState('');
  const categoryOptions = [
    {
      value: 'test',
      label: 'Test',
    },
    {
      value: 'general',
      label: 'General',
    },
    {
      value: 'homework',
      label: 'Homework',
    },
  ];

  // function for adding a new todo
  const submitTodo = () => {
    if (inputValue === '' || inputValue == null || selectCategory === '') {
      return;
    } else {
      const newTodoObject = {
        id: Math.floor(Math.random() * 1000),
        name: inputValue,
        completed: false,
        category: selectCategory,
      };
      addToCategoryArray(newTodoObject);
      setTodos((prevTodos) => [...prevTodos, newTodoObject]);
    }
    setInputValue('');
  };
  //add to category array
  const addToCategoryArray = (todo) => {
    const todoCategory = todo.category;
    setCategoryTodos({
      ...categoryTodos,
      [todoCategory]: [...categoryTodos[todoCategory], todo],
    });
  };

  // function to check whether the todo is completed or not
  const checkTodo = (e, todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };
  // adding completed todos
  useEffect(() => {
    let localTodos = [...todos];
    const completedTodos = localTodos.filter((todo) => todo.completed === true);
    setCompletedTodos(completedTodos);
  }, [todos]);

  // deleting a todo
  const deleteTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  // editing todo
  const editTodo = (todoId) => {
    setEditBoxDisplay(true);
    setEditId(todoId);
  };

  // edit the todo
  const deployEdits = () => {
    if (editInput === '' || editInput === undefined) {
      return;
    }
    if (editInput) {
      let prevTodos = [...todos].map((todo) =>
        todo.id === editId
          ? {
              ...todo,
              name: editInput,
            }
          : todo
      );
      setTodos(prevTodos);
      setEditBoxDisplay(false);
      setEditInput('');
    }
  };

  return (
    <div className="todo-container">
      <h1>My Todo App</h1>
      <div className="todo-input">
        {editBoxDisplay ? (
          <div>
            <input
              placeholder="Enter New Task Name"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
            <button onClick={() => deployEdits()}>Edit Todo</button>
          </div>
        ) : (
          <div>
            <input
              placeholder="Enter Your task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <select
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              {categoryOptions.map((category, index) => {
                return (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </select>
            <button onClick={() => submitTodo()}>Add Todo</button>
          </div>
        )}
      </div>
      <div className="todolist-wrapper">
        <div className="todolist-container">
          <span>Todo Tasks:</span>
          {todos?.map((todo) => {
            const { name, id, completed } = todo;
            if (!completed) {
              return (
                <Todo
                  todoName={name}
                  checkTodo={checkTodo}
                  todoId={id}
                  completed={completed}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              );
            }
          })}
        </div>
        {completedTodos.length > 0 && (
          <div className="completed-todos">
            <span>Completed Todos:</span>
            {completedTodos?.map((todo) => {
              const { name, id, completed } = todo;
              if (completed) {
                return (
                  <Todo
                    todoName={name}
                    checkTodo={checkTodo}
                    todoId={id}
                    completed={completed}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                );
              }
            })}
          </div>
        )}

        <div className="category-todos" style={{ marginTop: 100 }}>
          <h3>category todos</h3>
          <div style={{ display: 'flex' }}>
            {categoryOptions.map((category, index) => {
              const { label, value } = category;
              return (
                <div style={{ margin: 10, border: '2px solid blue' }}>
                  <h5>{label}</h5>
                  <hr></hr>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {categoryTodos[value]?.map((todo) => {
                      return <span>{todo.name}</span>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
