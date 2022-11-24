import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";

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


export function AppWithReducers() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    {id: todolistID1, title: "что купить", filter: "все"},
    {id: todolistID2, title: "что носить", filter: "все"}
  ])

  let [tasks, dispatchTasks] = useReducer(tasksReducer,
     {[todolistID1]:
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
  dispatchTasks(ChangeTaskStatusAC(todolistID, id, isDone))
  }

  function changeTaskTitle(id: string, newValue: string, todolistID: string) {
    dispatchTasks(ChangeTaskTitleAC(todolistID, id, newValue))
  }

  function addTask(title: string, todolistID: string) {
    dispatchTasks(AddTaskAC(todolistID, title))
  }

  function removeTask(id: string, todolistID: string) {
    dispatchTasks(RemoveTaskAC(todolistID, id))
  }

  function filtredTasks(select: FilterValueType, todolistID: string) {
  dispatchTodolists(ChangeTodolistFilterAC(todolistID, select))
  }

  function removeTodolist(todolistID: string) {
    let action = RemoveTodolistAC(todolistID)
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  function addTodolist(title: string) {
    let action = AddTodolistAC(title)
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  function changeTodolistTitle(newTitle: string, todolistID: string) {
    dispatchTodolists(ChangeTodolistTitleAC(newTitle, todolistID))
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

