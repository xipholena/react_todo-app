import React, { useState} from 'react';
import classNames from 'classnames';
import { TodoList } from '../TodoList';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [checkboxActive, setcheckboxState] = useState(false);
  const [unfinishedTodo, countUnfinishedTodo] = useState(0);
 
  const unfinishedTodos = todos.filter(todo => !todo.completed).length;

  const getCheckedTodoId = (chosenId) => {
    const chosenTodo = todos.find(todo => todo.id === chosenId);
    chosenTodo.completed = !chosenTodo.completed;

    //Костыль? Стейт, который не рендерится, нужен только для перерендера
    countUnfinishedTodo(todos.filter(todo => !todo.completed).length);

    if (todos.every(todo => todo.completed)) {
      setcheckboxState(true);
    } else {
      setcheckboxState(false);
    }

  };

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };

  const preparedTodo = {
    todo,
    completed: false,
    id: +(new Date()),
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setTodos(currentState => ([
      ...currentState,
      preparedTodo,
    ]));
    clearInput();
  };

  function clearInput() {
    setTodo('');
  };

  const toggleTodosStatus = () => {
    if (!checkboxActive) {
      const changedTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));
      setTodos(changedTodos);
      setcheckboxState(true);
    } else if (checkboxActive) {
      const changedTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));
      setTodos(changedTodos);
      setcheckboxState(false);
    };
  };

  const destroyHandler = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {//item, app
    setTodos(todos => todos.filter(todo => !todo.completed));
  };

  const amountOfCompletedTodos =  todos.filter(todo => !todo.completed).length;
 
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <h2>
          Uncompleted todos = {unfinishedTodos}
        </h2>
        <form
          onSubmit={submitHandler}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todo}
            onChange={changeHandler}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className={classNames('toggle-all', { active: checkboxActive === true })}
          onClick={toggleTodosStatus}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          items={todos}
          getCheckedTodoId={getCheckedTodoId}
          destroyHandler={destroyHandler}
        />

      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button
          type="button"
          className={classNames('clear-completed', { visible: amountOfCompletedTodos > 0 })}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>

    </section>
  );
};


