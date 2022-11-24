import {FilterValueType, TodolistStateType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodolistActionType|
                         AddTodolistActionType|
                         ChangeTodolistTitleActionType|
                         ChangeTodolistFilterActionType

   export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST"
  id: string
   }
   export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
     title: string
     todolistID: string
   }
   export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
     id: string
     title: string
   }
   export type ChangeTodolistFilterActionType = {
     type: "CHANGE-TODOLIST-FILTER"
     id: string
     filter: FilterValueType
   }



export const todolistsReducer = (state: Array<TodolistStateType>, action: ActionType): Array<TodolistStateType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
   return state.filter(tl=> tl.id !== action.id)}
    case "ADD-TODOLIST":{
      return [
        {id: action.todolistID, title: action.title, filter: 'все'},
         ...state
      ]}
    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find(tl=>tl.id === action.id)
      if (todolist) {
        todolist.title = action.title
      }
      return [...state]
    }
    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find(tl=>tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      throw new Error("I don't know this action type")
  }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
return {type: "REMOVE-TODOLIST", id: id}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD-TODOLIST", title: title, todolistID: v1()}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE",id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER",id, filter}
}

