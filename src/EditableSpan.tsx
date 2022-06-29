import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (editedTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [text, setText] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        {
            props.changeTitle(text)
        }
    }
    const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()

    return (
        editMode
            ? <input
                value={text}
                onChange={onChangeSetText}
                onBlur={offEditMode}
                onKeyDown={onKeyDownChangeTitle}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};
