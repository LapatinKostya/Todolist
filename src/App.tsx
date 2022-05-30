import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterValueType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false},
    ])


    const removeTask = (idTask: number) => {
        tasks1 = tasks1.filter((el) => el.id !== idTask)
        setTasks1(tasks1)
        console.log(tasks1)
    }

    const [filteredValue, setFilteredValue] = useState()

    const changeFilter = (value: filterValueType) => {

        setFilteredValue(value)
    }


    let filteredTasks = tasks1
    if (filteredValue === 'Active') {
        filteredTasks = tasks1.filter(el => el.isDone === false)
    }
    if (filteredValue === 'Completed') {
        filteredTasks = tasks1.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
