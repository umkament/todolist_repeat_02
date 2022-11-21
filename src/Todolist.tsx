import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string, todolistID: string)=>void
  removeTask: (id: string, todolistID: string)=>void
  filtredTasks: (select: FilterValueType, todolistID: string)=>void
  changeTaskStatus: (id: string, isDone: boolean, todolistID: string)=>void
  removeTodolist: (todolistID: string)=>void

}

export function Todolist(props: PropsType) {


  const allHandler = () => {props.filtredTasks('все', props.id)}
  const activeHandler = () => {props.filtredTasks('активные', props.id)}
  const completedHandler = () =>{props.filtredTasks('завершенные', props.id)}
const removeTodolistHandler = () => {
  props.removeTodolist(props.id)
}
const addTask = (title: string) => {
    props.addTask(title, props.id)
}

  return <div>
    <h3>{props.title}
      <button onClick={removeTodolistHandler}>x</button></h3>
    <AddItemForm addItem={addTask}/>

    <ul>
      {props.tasks.map((t)=>{
        const removeTaskHandler = ()=>{props.removeTask(t.id, props.id)}
        const checkedInputHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        }
     return <li key={t.id}
                className={t.isDone? "is-done": ''}
     >
        <input type="checkbox"
               checked={t.isDone}
               onChange={checkedInputHandler}
        />
        <span>{t.title}</span>
       <button onClick={removeTaskHandler}>X</button>
      </li>
      })}
    </ul>
    <div>
      <button onClick={ allHandler }
              className={props.filter==='все'? "active-filter": ''}
      >все</button>
      <button onClick={ activeHandler }
              className={props.filter==='активные'? "active-filter": ''}
      >активные</button>
      <button onClick={ completedHandler }
              className={props.filter==='завершенные'? "active-filter": ''}
      >завершенные</button>
    </div>
  </div>
}
