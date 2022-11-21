import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";

export type PropsType = {
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string)=>void
  removeTask: (id: string)=>void
  filtredTasks: (select: FilterValueType)=>void
  changeTaskStatus: (id: string, isDone: boolean)=>void

}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string>('')

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const inputOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //если мы попадаем в эту функцию, значит какая-то из кнопок была нажата
    //поэтому сначала обнуляем ошибку
    //если нажата кнопка Enter и тайтл не равен пустоте, то
    //добавляем таску затримленную по краям (без пробелов)
    //после чего обнуляем стейт с тасками
    //если нажата кнопка Enter и тайтл равен пустоте, то
    //отрисовываем ошибку с текстом
    setError('')
    if (e.charCode === 13 && title.trim() !== "") {
      props.addTask(title.trim())
      setTitle("")
    }
    if (e.charCode === 13 && title.trim() === '') {
      setError('title is requered')
    }
  }

  const buttonOnClickHandler = () => {
    //если мы попадаем в эту функцию, значит какая-то из кнопок была нажата
    //поэтому сначала обнуляем ошибку
    //если затримленная таска не равна пустой строке,
    //тогда добавляй эту таску предварительно удалив пробелы с двух сторон
    //после чего перезатри title (сделай его пустым снова)
    //иначе, если условие не совпадает, отрисовывай ошибку с текстом
   setError('')
    if (title.trim()!=="") {
     props.addTask(title.trim())
     setTitle("")
   }
   else {
     setError('title is requered')
   }
  }
  const allHandler = () => {props.filtredTasks('все')}
  const activeHandler = () => {props.filtredTasks('активные')}
  const completedHandler = () =>{props.filtredTasks('завершенные')}


  return <div>
    <h3>{props.title}</h3>
    <div>
    <input value={title}
           onChange={inputOnChangeHandler}
           onKeyPress={inputOnKeyPressHandler}
           className={error? "error" : ''}
    />
    <button onClick={buttonOnClickHandler}>+</button>
    {error && <div className='error-message'>{error}</div>}
    </div>
    <ul>
      {props.tasks.map((t)=>{
        const removeTaskHandler = ()=>{props.removeTask(t.id)}
        const checkedInputHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)

        }
     return <li key={t.id}
                className={t.isDone? "is-done": ''}
     >
        <input type="checkbox"
               checked={t.isDone}
               onChange={checkedInputHandler}
        />
        <span>{t.title}</span>
       <button onClick={removeTaskHandler}>X</button>
      </li>
      })}
    </ul>
    <div>
      <button onClick={ allHandler }
              className={props.filter==='все'? "active-filter": ''}
      >все</button>
      <button onClick={ activeHandler }
              className={props.filter==='активные'? "active-filter": ''}
      >активные</button>
      <button onClick={ completedHandler }
              className={props.filter==='завершенные'? "active-filter": ''}
      >завершенные</button>
    </div>
  </div>
}
