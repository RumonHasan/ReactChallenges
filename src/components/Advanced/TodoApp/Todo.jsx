import { useState } from 'react';
const Todo = (props) => {
  const { todoName, todoId, completed, checkTodo, deleteTodo, editTodo } =
    props;

  return (
    <div className={completed ? 'todo completed' : 'todo'} key={todoId}>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => checkTodo(e.target.checked, todoId)}
        />
        <span>{todoName}</span>
      </div>
      <div className="todo-actions">
        <button onClick={() => deleteTodo(todoId)}>Delete Todo</button>
        <button onClick={() => editTodo(todoId)}>Edit Todo</button>
      </div>
    </div>
  );
};
export default Todo;
