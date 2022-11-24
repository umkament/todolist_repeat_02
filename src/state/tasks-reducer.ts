import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type ActionType = RemoveTaskActionType |
                         AddTaskActionType |
                         ChangeTaskStatusActionType |
                         ChangeTaskTitleActionType |
                         AddTodolistActionType |
                         RemoveTodolistActionType

export type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  todolistID: string
  taskID: string
}
export type AddTaskActionType = {
  type: "ADD-TASK"
  todolistID: string
  title: string
}

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  todolistID: string
  taskID: string
  isDone: boolean
}
export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
  todolistID: string
  taskID: string
  title: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = {...state}
      const tasksForRemove = state[action.todolistID]
      stateCopy[action.todolistID] = tasksForRemove.filter(t=> t.id !== action.taskID)
      return stateCopy;
    }

    case "ADD-TASK":{
      const stateCopy = {...state}
      const stateForAdd = stateCopy[action.todolistID]
      let task = {id: v1(), isDone: false, title: action.title}
      stateCopy[action.todolistID] = [task, ...stateForAdd]
       return stateCopy
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = {...state}
      const stateForChangingTaskTitle = stateCopy[action.todolistID]
      let taskTitle = stateForChangingTaskTitle.find(t=>t.id === action.taskID)
      if (taskTitle) {
        taskTitle.title = action.title
      }
      return stateCopy
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = {...state}
      const stateForChangingStatus = stateCopy[action.todolistID]
      let task = stateForChangingStatus.find(t=>t.id === action.taskID)
      if (task) {
        task.isDone = action.isDone
      }
      return stateCopy
    }

    case "ADD-TODOLIST": {
      const stateCopy = {...state}
      stateCopy[action.todolistID] = []
      return stateCopy
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
}

export const RemoveTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
return {type: "REMOVE-TASK", todolistID, taskID}
}


export const AddTaskAC = (todolistID: string, title: string): AddTaskActionType => {
  return {type: "ADD-TASK", todolistID, title}
}

export const ChangeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
  return {type: "CHANGE-TASK-STATUS", todolistID, taskID, isDone}
}

export const ChangeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
  return {type: "CHANGE-TASK-TITLE", todolistID, taskID, title}
}

