//handles user input
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');

  function handleAddTodo(event) {
    //prevents the page from refreshing when the user clicks the Add todo
    event.preventDefault();
    const title = event.target.title.value;

    onAddTodo(title);
    event.target.title.value = '';
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
        ref={todoTitleInput}
      ></input>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
