//displays the list
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

function TodoList({ todoList, onUpdateTodo, onCompleteTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : filteredTodoList.length > 0 ? (
        <ul className={styles.list}>
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
