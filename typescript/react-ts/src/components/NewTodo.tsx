import React, { useRef } from 'react';
import './NewTodo.css';

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textRef.current!.value;
    console.log(enteredText);
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <section className='form-control'>
        <label htmlFor='todo-text'>todo text</label>
        <input type='text' id='todo-text' ref={textRef} />
      </section>
      <button type='submit'>Add</button>
    </form>
  );
};

export default NewTodo;
