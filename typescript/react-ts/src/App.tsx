import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/TodoList';
import { Todo } from './Todo.model';

// const todos = [{ id: 't1', text: 'finish the course' }];
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (todo: string) => {
    console.log(todo);
    setTodos((prevState) => [
      ...prevState,
      { id: Math.random().toString(), text: todo },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevState) => [
      ...prevState.filter((todoItem) => todoItem.id !== todoId),
    ]);
  };

  return (
    <form className='App'>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </form>
  );
}

export default App;
