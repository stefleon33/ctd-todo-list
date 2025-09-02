//handles user input
import { useRef, useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  useEffect(() => {
    if (workingTodoTitle === '') {
      if (isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(true);
    } else {
      if (!isButtonDisabled) {
        return;
      }
      setIsButtonDisabled(false);
    }
  }, [workingTodoTitle, isButtonDisabled]);

  function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo({ title: workingTodoTitle.trim(), isCompleted: false });
    setWorkingTodoTitle('');
    //The form retains focus so the user can rapidly enter more todos.
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="todoTitle"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={todoTitleInput}
      ></TextInputWithLabel>
      <button disabled={isButtonDisabled}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
