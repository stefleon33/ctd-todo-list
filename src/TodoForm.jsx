//handles user input
import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    //prevents the page from refreshing when the user clicks the Add todo
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    //The form retains focus so the user can rapidly enter more todos.
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={todoTitleInput}
      ></input>
      <button disabled={workingTodoTitle.trim() === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
