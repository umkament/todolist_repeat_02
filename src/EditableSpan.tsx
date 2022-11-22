import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
  onChange: (newTitle: string)=> void
  title: string
}

export function EditableSpan(props: EditableSpanPropsType) {

  let [editMode, setEditMode] = useState(false)
  let [titleForInput, setTitleForInput] = useState('')

  const activeEditMode = () => {
    setEditMode(true)
    setTitleForInput(props.title)
  }
  const activeViewMode = () => {
    setEditMode(false)
    props.onChange(titleForInput)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleForInput(e.currentTarget.value)
  }

  //возвращай режимредактирования в инициализационное состояние, если
  // input теряет фокус (onBlur) активируется отрисовка режима false
  // иначе при двойном нажатии на тайтл активируется режи редактирования
  return editMode
     ? <TextField value={titleForInput}
              onBlur={activeViewMode}
              onChange={onChangeTitleHandler}
              autoFocus
     />
     : <span onDoubleClick={activeEditMode}>{props.title}</span>
}


// в файле App есть функция по изменению title у таски = changeTaskTitle
//логика функции: определяем тудулист, затем находим нужную таску и меняем ее title на title,
// который пришел в параметрах функции (понять, откуда по итогу пришел этот тайтл)
// как и все остальные функции changeTaskTitle прокидывается в тудулист через пропсы
// и вызывается в качестве колбэк функции в компоненте EditableSpan, но поскольку
// нам не нужны иные параметры(id таски и тудулиста), кроме как title
// мы создаем функцию обертку, в которой помещам колбэк функцию пришедшую в пропсах,
// а сами отдаем функции onChange = новую функцию обертку onChangeTaskTitleHandler
// с одним параметром title
//эта функция-обертка попадает через пропсы в универсальную компоненту EditableSpan
//  кроме этого в файле Todolist в компоненту EditableSpan мы отправляем title
// в дальнейшем, если это тайтл для тасок, мы указываем t.title
// если это тайтл для тудулиста, мы указываем props.title
//c изменением тайтла тудулиста происходит по аналогии, главное правильно довать компоненту в тудулист файл