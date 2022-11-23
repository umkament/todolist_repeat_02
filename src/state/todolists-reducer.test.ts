import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {TodolistStateType, FilterValueType} from '../App'

test('correct todolist should be removed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodolistStateType> = [
    {id: todolistId1, title: 'What to learn', filter: 'все'},
    {id: todolistId2, title: 'What to buy', filter: 'все'}
  ]

  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistStateType> = [
    {id: todolistId1, title: 'What to learn', filter: 'все'},
    {id: todolistId2, title: 'What to buy', filter: 'все'}
  ]

  const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct title of todolist should be changing', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistStateType> = [
    {id: todolistId1, title: 'What to learn', filter: 'все'},
    {id: todolistId2, title: 'What to buy', filter: 'все'}
  ]

  const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changing', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newFilter: FilterValueType = 'завершенные'

  const startState: Array<TodolistStateType> = [
    {id: todolistId1, title: 'What to learn', filter: 'все'},
    {id: todolistId2, title: 'What to buy', filter: 'все'}
  ]

  const action = ChangeTodolistFilterAC(todolistId2, newFilter)

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('все')
  expect(endState[1].filter).toBe(newFilter)
})

