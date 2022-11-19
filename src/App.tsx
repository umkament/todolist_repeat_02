import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}

export type FilterValueType = 'все' |'активные' | 'завершенные'


export function App() {

  let [tasks, setTasks] = useState( [
    {id: v1(), isDone: true, title: "Мы"},
    {id: v1(), isDone: false, title: "можем"},
    {id: v1(), isDone: true, title: "многое"}
  ]);

  let [filter, setFilter] = useState<FilterValueType>('все')

  function addTask(title: string){
    let newTask = {id: v1(), isDone: false, title: title}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }


  function removeTask(id: string){
    let newTasks = tasks.filter(t=>t.id !== id)
      setTasks(newTasks)
    }

    function filtredTasks (select: FilterValueType){
    setFilter(select)
    }

    let tasksForTodolist = tasks
  if(filter === 'активные'){
    tasksForTodolist = tasks.filter(t=>!t.isDone)
  }
  if(filter==='завершенные'){
    tasksForTodolist = tasks.filter(t=>t.isDone)
  }

  return (
    <div className="App">

      <Todolist title="Отрывок"
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                filtredTasks={filtredTasks}
      />


    </div>
  );
}

