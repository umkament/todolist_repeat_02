
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reducer'
import { TasksStateType } from '../App'

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = RemoveTaskAC('todolistId2', '2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
})


test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = AddTaskAC('todolistId2', 'juce')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changing', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = ChangeTaskStatusAC('todolistId2', "2", false)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].isDone).toBeTruthy()
  expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test('title of specified task should be changing', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = ChangeTaskTitleAC('todolistId2', "3", "kefir")

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][2].title).toBe('React')
  expect(endState['todolistId2'][2].title).toBe('kefir')
})

