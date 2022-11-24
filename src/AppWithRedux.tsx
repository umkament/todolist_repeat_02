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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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


export function AppWithRedux() {

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistStateType>>(state => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


  function changeTaskStatus(id: string, isDone: boolean, todolistID: string) {
    dispatch(ChangeTaskStatusAC(todolistID, id, isDone))
  }

  function changeTaskTitle(id: string, newValue: string, todolistID: string) {
    dispatch(ChangeTaskTitleAC(todolistID, id, newValue))
  }

  function addTask(title: string, todolistID: string) {
    dispatch(AddTaskAC(todolistID, title))
  }

  function removeTask(id: string, todolistID: string) {
    dispatch(RemoveTaskAC(todolistID, id))
  }

  function filtredTasks(select: FilterValueType, todolistID: string) {
    dispatch(ChangeTodolistFilterAC(todolistID, select))
  }

  function removeTodolist(todolistID: string) {
    dispatch(RemoveTodolistAC(todolistID))
  }

  function addTodolist(title: string) {
    dispatch(AddTodolistAC(title))
  }

  function changeTodolistTitle(newTitle: string, todolistID: string) {
    dispatch(ChangeTodolistTitleAC(newTitle, todolistID))
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

