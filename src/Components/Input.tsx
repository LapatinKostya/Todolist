import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircleOutline} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type InputPropsType = {
    callback: (newTitle: string) => void
    title: string
}

export const Input = (props: InputPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? "error" : ""}
                label={props.title}
                variant={"outlined"}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem}><AddCircleOutline/></IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

