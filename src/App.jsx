import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }
        const { records } = await resp.json();

        setTodoList(
          records.map((record) => {
            const todo = {
              id: record.id,
              title: record.fields?.title ?? '',
              isCompleted: Boolean(record.fields?.isCompleted),
            };
            return todo;
          })
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }

      const { records } = await resp.json();
      const rec = records?.[0];
      if (!rec) throw new Error('No record returned from API');
      const savedTodo = {
        id: records[0].id,
        title: rec.fields?.title ?? rec.fields?.Title ?? '',
        isCompleted: Boolean(rec.fields?.isCompleted),
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    setIsSaving(true);
    setErrorMessage('');

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      if (originalTodo) {
        const revertedTodos = todoList.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        );
        setTodoList(revertedTodos);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (todoId) => {
    setIsSaving(true);
    setErrorMessage('');

    const originalTodo = todoList.find((todo) => todo.id === todoId);
    if (!originalTodo) {
      setIsSaving(false);
      return;
    }
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: true } : todo
      )
    );

    const payload = {
      records: [
        {
          id: todoId,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      setTodoList((prev) =>
        prev.map((t) => (t.id === originalTodo.id ? originalTodo : t))
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={isLoading}
      />
      {errorMessage ? (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      ) : null}
    </>
  );
}

export default App;
