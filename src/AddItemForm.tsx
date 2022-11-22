import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {AddToPhotosTwoTone} from "@mui/icons-material";


export type AddItemFormPropsType = {
  addItem: (title: string)=>void
}

export function AddItemForm(props: AddItemFormPropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string>('')

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  //если мы попадаем в эту функцию, значит какая-то из кнопок была нажата
  //поэтому сначала обнуляем ошибку
  //если нажата кнопка Enter и тайтл не равен пустоте, то
  //добавляем таску затримленную по краям (без пробелов)
  //после чего обнуляем стейт с тасками
  //если нажата кнопка Enter и тайтл равен пустоте, то
  //отрисовываем ошибку с текстом
  const inputOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.charCode === 13 && title.trim() !== "") {
      props.addItem(title.trim())
      setTitle("")
    }
    if (e.charCode === 13 && title.trim() === '') {
      setError('title is requered')
    }
  }

  //если мы попадаем в эту функцию, значит какая-то из кнопок была нажата
  //поэтому сначала обнуляем ошибку
  //если затримленная таска не равна пустой строке,
  //тогда добавляй эту таску предварительно удалив пробелы с двух сторон
  //после чего перезатри title (сделай его пустым снова)
  //иначе, если условие не совпадает, отрисовывай ошибку с текстом
  const buttonOnClickHandler = () => {
    setError('')
    if (title.trim()!=="") {
      props.addItem(title.trim())
      setTitle("")
    }
    else {
      setError('title is requered')
    }
  }

  return <div>
    <TextField id="filled-basic"
               label="Type value"
               variant="filled"
               value={title}
               error={!!error}
               helperText={error}
           onChange={inputOnChangeHandler}
           onKeyPress={inputOnKeyPressHandler}
           //className={error? "error" : ''}
    />
    <Button variant="text"
            size='large'
            color='primary'
            onClick={buttonOnClickHandler}>
      <AddToPhotosTwoTone/>
    </Button>
   {/* {error && <div className='error-message'>{error}</div>}*/}
  </div>
}