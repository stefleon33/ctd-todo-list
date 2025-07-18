//handles user input
import { useRef } from 'react';

  return (
    <form>
      <label htmlFor="todoTitle">Todo</label>
      <input type="text" id="todoTitle"></input>
      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
