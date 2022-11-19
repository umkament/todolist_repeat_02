import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";

export type PropsType = {
  title: string
  tasks: Array<TasksType>
  addTask: (title: string)=>void
  removeTask: (id: string)=>void
  filtredTasks: (select: FilterValueType)=>void

}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('')

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)

  }

  const inputOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
if (e.charCode === 13){
  props.addTask(title)
  setTitle("")
}
  }

  const buttonOnClickHandler = () => {
    props.addTask(title)
    setTitle("")
  }
  const allHandler = () => {props.filtredTasks('все')}
  const activeHandler = () => {props.filtredTasks('активные')}
  const completedHandler = () =>{props.filtredTasks('завершенные')}


  return <div>
    <div>{props.title}</div>
    <input value={title}
           onChange={inputOnChangeHandler}
           onKeyPress={inputOnKeyPressHandler}
    />
    <button onClick={buttonOnClickHandler}>+</button>
    <ul>

      {props.tasks.map((t)=>{
        const removeTaskHandler = ()=>{props.removeTask(t.id)}
     return <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
       <button onClick={removeTaskHandler}>X</button>
      </li>
      })}
    </ul>
    <div>
      <button onClick={ allHandler }>все</button>
      <button onClick={ activeHandler }>активные</button>
      <button onClick={ completedHandler }>завершенные</button>
    </div>
  </div>
}