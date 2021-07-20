import React, { Component } from "react";

export class TaskItem extends Component {
	
	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id);
	};

	onDeleteTask = () => {
		this.props.onDeleteTask(this.props.task.id);
	};

	onUpdate = () => {
		this.props.onUpdate(this.props.task.id);
	};

	render() {
		var { task, index } = this.props;
		return (
			<tr>
				<th className="text-center">{index + 1}</th>
				<td className="text-left">
					<span className="ml-2">{task.name}</span>
				</td>
				<td className="text-center">
					<span
						className={
							task.status === true
								? "badge badge-success"
								: "badge badge-danger"
						}
						onClick={this.onUpdateStatus}
						style={{ cursor: "pointer" }}
					>
						{task.status === true ? "Finish" : "Unfinished"}
					</span>
					<br />
				</td>
				<td>
					<button
						type="button"
						className="btn btn-warning m-1"
						onClick={this.onUpdate}
					>
						<i className="far fa-pen"></i> Edit
					</button>
					<button
						type="button"
						className="btn btn-danger m-1"
						onClick={this.onDeleteTask}
					>
						<i className="fad fa-trash-alt"></i> Delete
					</button>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
