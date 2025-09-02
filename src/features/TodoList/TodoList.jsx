//displays the list
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onUpdateTodo, onCompleteTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : filteredTodoList.length > 0 ? (
        <ul>
          {filteredTodoList.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onCompleteTodo={onCompleteTodo}
              />
            );
          })}
        </ul>
      ) : (
        <p>Add todo above to get started.</p>
      )}
    </>
  );
}

export default TodoList;
