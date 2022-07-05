import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Components/Input";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete, HighlightOff} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTask: (todoId: string, taskId: string, newTitle: string) => void
    editTodolist: (todoId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const editTaskHandler = (taskId: string, newTitle: string) => {
        props.editTask(props.id, taskId, newTitle)
    }
    const editTodolist = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} callBack={editTodolist}/>
            <IconButton onClick={removeTodolist}>
                <HighlightOff color={"secondary"}/>
            </IconButton>
        </h3>
        <div>
            <Input callback={addTaskHandler} title={'Add task'}/>
        </div>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    return (
                        <ListItem key={t.id} disableGutters dense>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone} color={'primary'}/>
                            <span className={t.isDone ? "is-done" : ""}>
                                <EditableSpan
                                    title={t.title}
                                    callBack={(newTitle) => editTaskHandler(t.id, newTitle)}
                                />
                            </span>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>
        <div>
            <Button
                className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}
                variant='contained'
                size={"small"}
                color={props.filter === 'all' ? "primary" : "default"}
            >All</Button>
            <Button
                className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}
                variant='contained'
                size={"small"}
                color={props.filter === 'active' ? "primary" : "default"}
            >Active</Button>
            <Button
                className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}
                variant='contained'
                size={"small"}
                color={props.filter === 'completed' ? "primary" : "default"}
            >Completed</Button>
        </div>
    </div>
}


