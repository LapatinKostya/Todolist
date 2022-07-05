import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTitle = () => {
        if(newTitle !== '') {
            props.callBack(newTitle)
        }
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        addTitle()
    }
    return (
        edit
            ? <input autoFocus onBlur={onDoubleClickHandler} value={newTitle} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
