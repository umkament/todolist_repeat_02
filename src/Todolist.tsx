import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {DeleteTwoTone} from "@mui/icons-material";

export type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string, todolistID: string)=>void
  removeTask: (id: string, todolistID: string)=>void
  filtredTasks: (select: FilterValueType, todolistID: string)=>void
  changeTaskStatus: (id: string, isDone: boolean, todolistID: string)=>void
  changeTaskTitle: (id: string, newValue: string, todolistID: string)=>void
  removeTodolist: (todolistID: string)=>void
  changeTodolistTitle: (newTitle: string,todolistID: string)=>void
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
const changeTodolistTitleHandler = (newTitle: string) => {
  props.changeTodolistTitle(newTitle, props.id)
}

  return <div>
    <h3>
      <EditableSpan onChange={changeTodolistTitleHandler} title={props.title}/>
      <IconButton onClick={removeTodolistHandler}
                  color='primary'
      >
        <DeleteTwoTone/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {props.tasks.map((t)=>{
        const removeTaskHandler = ()=>{props.removeTask(t.id, props.id)}
        const checkedInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
        const onChangeTaskTitleHandler = (newValue: string) => {
          props.changeTaskTitle(t.id, newValue, props.id)
        }
     return <div key={t.id}
                className={t.isDone? "is-done": ''}
     >
        <Checkbox checked={t.isDone}
                  onChange={checkedInputHandler}
        />
        <EditableSpan onChange={onChangeTaskTitleHandler}
                      title={t.title}
        />
       <IconButton onClick={removeTaskHandler}
                   color='primary'
       >
         <DeleteTwoTone/>
       </IconButton>
      </div>
      })}
    </div>
    <div>
      <Button onClick={ allHandler }
              color={'primary'}
              variant={props.filter==='все'? "contained": 'text'}
      >все</Button>
      <Button onClick={ activeHandler }
              color={'primary'}
              variant={props.filter==='активные'? "contained": 'text'}
      >активные</Button>
      <Button onClick={ completedHandler }
              color={'primary'}
              variant={props.filter==='завершенные'? "contained": 'text'}
      >завершенные</Button>
    </div>
  </div>
}



