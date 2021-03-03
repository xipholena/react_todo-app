import React, {useState}  from 'react';
import classNames from 'classnames'
import {TodoList} from '../TodoList'

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [checkboxActive, setcheckboxState] = useState(false);
  const [unfinishedTodo, countUnfinishedTodo] = useState(0);

  const [completedTodos, countCompleted] = useState(0);
  console.log('state unfinishedTodo', unfinishedTodo);
  console.log(todos);

  const getCheckedTodoId = (chosenId) => {
    
   const chosenTodo = todos.find(todo=>todo.id === chosenId);
   chosenTodo.completed = !chosenTodo.completed;

    
    //console.log(todos.filter(todo=>!todo.completed).length);
    const unfinishedTodos = todos.filter(todo=>!todo.completed).length
    countUnfinishedTodo(unfinishedTodos)
    
     if (todos.every(todo=> todo.completed)){
        setcheckboxState(true)
    } else {
      setcheckboxState(false)
    }
    console.log('getCheckedTodoId', 'checkboxActive:' ,checkboxActive)
  }

  const changeHandler = (e) => {
    setTodo(e.target.value)
  }
  const preparedTodo = {
    todo: todo,
    completed: false,
    id: +(new Date()),
  }
  const submitHandler = (e) => {
    
    e.preventDefault();
    setTodos(currentState => ([
      ...currentState,
      preparedTodo
    ]));
    clearInput();

    console.log(todos)
    const unfinishedTodos = todos.filter(todo=>!todo.completed).length
    countUnfinishedTodo(unfinishedTodos)
  }


  function clearInput() {
    setTodo('');
  }

  const toggleTodosStatus = () => {
    if(!checkboxActive) {
      const changedTodos = todos.map(todo => ({
        ...todo,
        completed: true
      }));
      setTodos(changedTodos);
      countUnfinishedTodo(0)
    } 
  }
  const destroyHandler = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos=> todos.filter(todo=> !todo.completed))
  }
  return (
    <section className="todoapp">
    <header className="header">
      <h1>todos</h1>
      <h2>Uncompleted todos = {unfinishedTodo}{/*todos.filter(todo=>!todo.completed).length*/}</h2>
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
        className={classNames("toggle-all", {active: checkboxActive === true} )}
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
        className={classNames('clear-completed', {visible: completedTodos > 0})}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
    
  </section>
  )
}
