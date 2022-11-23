import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}
export type TasksStateType = {
  [key: string]: Array<TasksType>
}

export type TodolistStateType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = 'все' | 'активные' | 'завершенные'


export function App() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistStateType>>([
    {id: todolistID1, title: "что купить", filter: "все"},
    {id: todolistID2, title: "что носить", filter: "все"}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]:
       [
         {id: v1(), isDone: false, title: "все"},
         {id: v1(), isDone: false, title: "что"},
         {id: v1(), isDone: true, title: "получится"}
       ],
    [todolistID2]:
       [
         {id: v1(), isDone: false, title: "все"},
         {id: v1(), isDone: false, title: "что"},
         {id: v1(), isDone: true, title: "захочется"}
       ]
  })


  function changeTaskStatus(id: string, isDone: boolean, todolistID: string) {
    let tasksForChange = tasks[todolistID]
    let task = tasksForChange.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }

  function changeTaskTitle(id: string, newValue: string, todolistID: string) {
    let tasksForChange = tasks[todolistID]
    let task = tasksForChange.find(t => t.id === id)
    if (task) {
      task.title = newValue
      setTasks({...tasks})
    }
  }

  function addTask(title: string, todolistID: string) {
    let tasksForAdd = tasks[todolistID]
    let newTask = {id: v1(), isDone: false, title: title}
    tasks[todolistID] = [newTask, ...tasksForAdd]
    setTasks({...tasks})
  }

  function removeTask(id: string, todolistID: string) {
    let tasksForRemove = tasks[todolistID]
    tasks[todolistID] = tasksForRemove.filter(t => t.id !== id)
    setTasks({...tasks})
  }

  function filtredTasks(select: FilterValueType, todolistID: string) {
    let todolist = todolists.find(tl => tl.id === todolistID)
    if (todolist) {
      todolist.filter = select
      setTodolists([...todolists])
    }
  }

  function removeTodolist(todolistID: string) {
    let removedTodolist = todolists.filter(tl => tl.id !== todolistID)
    setTodolists(removedTodolist)
    delete tasks[todolistID]
    setTasks({...tasks})
  }

  function addTodolist(title: string) {
    let newTodolist: TodolistStateType = {
      id: v1(),
      filter: "все",
      title: title
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({
      [newTodolist.id]: [],
      ...tasks,
    })
  }

  function changeTodolistTitle(newTitle: string, todolistID: string) {
    let todolist = todolists.find(tl => tl.id === todolistID)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  return (
     <div className="App">

       <AppBar position="static">
         <Toolbar>
           <IconButton
              edge="start"
              color="inherit"
              aria-label="menu">
             Menu
           </IconButton>
           <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
             News
           </Typography>
           <Button color="inherit">Login</Button>
         </Toolbar>
       </AppBar>
       <Container fixed>
         <Grid>
           <AddItemForm addItem={addTodolist}/>
         </Grid>
         <Grid container
               item
               style={{padding: '10px'}}
         >
           {todolists.map(todolists => {

             let tasksForTodolist = tasks[todolists.id]
             if (todolists.filter === 'активные') {
               tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
             }
             if (todolists.filter === 'завершенные') {
               tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
             }

             return <Paper style={{padding: '10px'}}> <Todolist
                key={todolists.id}
                id={todolists.id}
                title={todolists.title}
                filter={todolists.filter}
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                filtredTasks={filtredTasks}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
             />
             </Paper>
           })}
         </Grid>
       </Container>
     </div>
  );
}

