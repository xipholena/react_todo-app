import React, {useState} from 'react'
import classNames from 'classnames'

export const TodoItem = ({todo, completed, id, getCheckedTodoId, destroyHandler}) => {
  const [status, setStatus] = useState(false);
  console.log('TodoItem:', todo, 'status:', status, 'todo.completed:', completed);
  const checkHandler = (e) => {
    setStatus(!status);
  }
  return(
    <li
      className={classNames('', {completed: /*status === true ||*/ completed === true})}
    >
      <div className="view">
        <input 
          //onChange={checkHandler}
          type="checkbox" 
          className="toggle"
          onClick={()=>{
            getCheckedTodoId(id);
            checkHandler();
          }}
        />
        <label className={classNames('', {completed:/* status === true || */completed === true})}
        >{todo}</label>
        <button 
          type="button" 
          className="destroy" 
          onClick={()=>destroyHandler(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}
