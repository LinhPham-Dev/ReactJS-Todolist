import React, { Component } from "react";
import TaskItem from "./TaskItem";

export class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterName: '',
			filterStatus: -1, // -1 : all // 1: Finish // 0: UnFinish
		};
	}

	onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		this.props.onFilter(
			name === 'filterName' ? value : this.state.filterName,
			name === 'filterStatus' ? value : this.state.filterStatus
		);
		this.setState({
			[name]: value,
		});

	};

	render() {
		let { filterName, filterStatus } = this.state;
		let { tasks } = this.props;
		let elmTasks = tasks.map((task, index) => {
			return (
				<TaskItem
					key={index}
					index={index}
					task={task}
					onUpdateStatus={this.props.onUpdateStatus}
					onDeleteTask={this.props.onDeleteTask}
					onUpdate={this.props.onUpdate}
				/>
			);
		});
		return (
			<div className="col-lg-12 mt-3">
				<table className="table table-hover table-bordered text-center">
					<thead>
						<tr>
							<th scope="col">STT</th>
							<th scope="col">Name</th>
							<th scope="col">Status</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row"></th>
							<td>
								<input
									type="text"
									className="form-control"
									placeholder="Search task... "
									value={filterName}
									name="filterName"
									onChange={this.onChange}
								/>
							</td>
							<td>
								<select
									className="form-control"
									id="addStatus"
									name="filterStatus"
									onChange={this.onChange}
									defaultChecked={filterStatus}
								>
									<option value={-1}>All Status</option>
									<option value={1}>Finish</option>
									<option value={0}>Unfinished</option>
								</select>
							</td>
							<td></td>
						</tr>
						{/* Task Item */}
						{elmTasks}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TaskList;
