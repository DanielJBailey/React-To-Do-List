import React, { Component } from 'react';
import List from './components/List';
import './styles/App.css';

let moment = require('moment');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			done: [], //array to store done tasks
			list: [], //array to store current tasks
			input: "" //input from form to create new tasks
		};
		//bind functions to this
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeTask = this.removeTask.bind(this);
		this.finishTask = this.finishTask.bind(this);
		this.removeCompletedTask = this.removeCompletedTask.bind(this);
	}

	//capture user input
	handleChange(event) {
		this.setState({
			input: event.target.value
		});
	}

	// use componentDidMount() to set intial state from localstorage
	componentWillMount() {
		let completed = JSON.parse(localStorage.getItem('completedTasks'));
		let current = JSON.parse(localStorage.getItem('currentTasks'));
		this.setState({
			done: completed,
			list: current
		});
	}
	
	//use componentDidUpdate to update localstorage on each state change
	componentDidUpdate() {
		localStorage.setItem('completedTasks', JSON.stringify(this.state.done));
		localStorage.setItem('currentTasks', JSON.stringify(this.state.list));
		let completed = JSON.parse(localStorage.getItem('completedTasks'));
		console.log(completed);
		let current = JSON.parse(localStorage.getItem('currentTasks'));
		console.log(current);
	}
	
	//function to finish task
	finishTask(finishedItem) {
		let newArray = this.state.list.filter(targetItem => {
			return targetItem !== finishedItem;
		});
		this.setState({
			list: newArray,
			done: [...this.state.done, finishedItem]
		});
	}
	
	//function to remove completed task
	removeCompletedTask(deletedItem) {
		let newArray = this.state.done.filter(targetItem => {
			return targetItem !== deletedItem;
		});
		this.setState({
			done: newArray
		});
	}

	//function to remove task
	removeTask(deletedItem) {
		let newArray = this.state.list.filter(targetItem => {
			return targetItem !== deletedItem;
		});
		this.setState({
			list: newArray
		});
	}

	//handle form submit
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.input === "") {
			alert("Please enter a task");
		} else {
			this.setState({
				list: [...this.state.list,
							{
								text: this.state.input,
								date: moment(new Date()).format("h:mm a")
							}
						], input: ""});
		}
	}

	render() {
		return (
			<div className="ToDoList">
				<h1>Do all the things.</h1>
				<div className="new-task">
					<form onSubmit={this.handleSubmit} id="task-form">
						<input
							id="task"
							type="text"
							onChange={this.handleChange}
							value={this.state.input}
							placeholder="Write it here."
						/>
						<button id="submit" type="submit" value="">
							<i className="fas fa-plus icon" />
						</button>
					</form>
				</div>
				<List
					done={this.state.done}
					list={this.state.list}
					remove={this.removeTask}
					finish={this.finishTask}
					removeFinished={this.removeCompletedTask}
				/>
			</div>
		);
	}
}


export default App;
