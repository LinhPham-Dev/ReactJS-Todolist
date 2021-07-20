import { Component } from "react";
import "./App.css";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import _ from "lodash";
import Swal from "sweetalert2";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			filter: {
				name: "",
				status: -1,
			},
			keyword: "",
			sortBy: "name",
			sortValue: 1,
		};
	}

	componentDidMount() {
		let data = localStorage.getItem("tasks");
		if (data) {
			let tasks = JSON.parse(data);
			this.setState({
				tasks: tasks,
			});
		}
	}

	s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	generateId() {
		return (
			this.s4() +
			this.s4() +
			this.s4() +
			"-" +
			this.s4() +
			this.s4() +
			this.s4()
		);
	}

	onToggleForm = () => {
		if (this.state.isDisplayForm && this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null,
			});
		} else {
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
			});
		}
	};

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false,
			taskEditing: null,
		});
	};

	onShowForm = () => {
		this.setState({
			isDisplayForm: true,
		});
	};

	onUpdateStatus = (id) => {
		let { tasks } = this.state;
		// let index = this.findIndex(id);
		var index = _.findIndex(tasks, (task) => {
			return task.id === id;
		});
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks,
			});
		}
	};

	findIndex(id) {
		let { tasks } = this.state;
		let result = -1;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		});
		return result;
	}

	onDeleteTask = (id) => {
		let { tasks } = this.state;
		var index = _.findIndex(tasks, (task) => {
			return task.id === id;
		});

		Swal.fire({
			title: "Do you want to delete this task ?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Yes, I do`,
			denyButtonText: `No I don't`,
		}).then((result) => {
			// Delete Task
			if (result.isConfirmed) {
				if (index !== 1) {
					tasks.splice(index, 1);
					this.setState({
						tasks: tasks,
					});
					localStorage.setItem("tasks", JSON.stringify(tasks));
				}
				Swal.fire("Delete success !", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Delete failing !", "", "info");
			}
		});
		this.onCloseForm();
	};

	onUpdate = (id) => {
		let { tasks } = this.state;
		let index = this.findIndex(id);
		let taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing,
		});
		this.onShowForm();
	};

	onSubmit = (value) => {
		let { tasks } = this.state;
		if (value.id === "") {
			value.id = this.generateId();
			tasks.push(value);
		} else {
			let index = this.findIndex(value.id);
			tasks[index] = value;
		}
		this.setState({
			tasks: tasks,
			taskEditing: null,
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus);
		this.setState({
			filter: {
				name: filterName,
				status: filterStatus,
			},
		});
	};

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword,
		});
	};

	onSort = (sortBy, sortValue) => {
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue,
		});
	};

	render() {
		var {
			tasks,
			isDisplayForm,
			taskEditing,
			filter,
			keyword,
			sortBy,
			sortValue,
		} = this.state;
		if (filter) {
			// Search Letter
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return (
						task.name
							.toLowerCase()
							.indexOf(filter.name.toLowerCase()) !== -1
					);
				});
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) {
					return tasks;
				} else {
					return task.status === (filter.status === 1 ? true : false);
				}
			});

			// Search Keyword
			if (keyword) {
				tasks = _.filter(tasks, (task) => {
					return (
						task.name
							.toLowerCase()
							.indexOf(keyword.toLocaleLowerCase()) !== -1
					);
				});
			}
		}

		// Sort
		if (sortBy === "name") {
			tasks.sort((a, b) => {
				if (a.name > b.name) return sortValue;
				else if (a.name < b.name) return -sortValue;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sortValue;
				else if (a.status < b.status) return sortValue;
				else return 0;
			});
		}

		var elmForm =
			isDisplayForm === true ? (
				<TaskForm
					onSubmit={this.onSubmit}
					onClose={this.onCloseForm}
					task={taskEditing}
				/>
			) : (
				""
			);
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12 my-4">
						<h2 className="text-center">Application: Task Manager</h2>
						<h3 className="text-center">Author: Phạm Ngọc Linh</h3>
					</div>

					{/* Add Task */}
					{elmForm}

					<div className={isDisplayForm ? "col-lg-8" : "col-lg-12"}>
						<div className="row">
							{/* Search and Sort */}
							<div className="col-lg-12 mb-3">
								<button
									type="button"
									className="btn btn-info"
									onClick={this.onToggleForm}
								>
									<i className="far fa-plus mr-2"></i> Add
									Task
								</button>
							</div>

							<Control
								onSearch={this.onSearch}
								onSort={this.onSort}
								sortBy={sortBy}
								sortValue={sortValue}
							/>
							{/* Task List */}
							<TaskList
								tasks={tasks}
								onUpdateStatus={this.onUpdateStatus}
								onDeleteTask={this.onDeleteTask}
								onUpdate={this.onUpdate}
								onFilter={this.onFilter}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
