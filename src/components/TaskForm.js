import { Component } from "react";
import Swal from 'sweetalert2';

class TaskForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			name: "",
			status: "false",
		};
	}

	onChangeValue = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		if (name === "status") {
			value = value === "true" ? true : false;
		}
		this.setState({
			[name]: value,
		});
	};

	onSubmitForm = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state);
		// Cancel and Close From
		this.onClear();
		this.onClose();
		Swal.fire(
			'Action Success',
			'You clicked the button!',
			'success'
		);
	};

	onClose = () => {
		this.props.onClose();
	};

	onClear = () => {
		this.setState({
			name: "",
			status: false,
		});
		Swal.fire(
			'Cleared Success!',
			'You clicked the button!',
			'success'
		);
	};

	// Reset value when change props
	static getDerivedStateFromProps(props, state) {
		if (props.task) {
			if (props.task.id !== state.id) {
				return {
					id: props.task.id,
					name: props.task.name,
					status: props.task.status,
				};
			}
		} 
		else {
			if (state.id) {
				return {
					id: "",
					name: "",
					status: true,
				};
			}
		}
		return null;
	}

	render() {
		let { id } = this.state;
		return (
			<div className="col-lg-4">
				<div className={this.state.id ? 'alert alert-primary' : 'alert alert-success '} role="alert">
					{id ? "Edit task" : "Add new task"}
					<i
						className="far fa-times-circle"
						onClick={this.onClose}
						style={{ cursor: "pointer" }}
					></i>
				</div>

				<form onSubmit={this.onSubmitForm} >
					<div className="card card-add">
						<div className="form-group">
							<label htmlFor="addName">Name: </label>
							<input
								type="text"
								className="form-control"
								id="addName"
								placeholder="Task name... "
								name="name"
								value={this.state.name}
								onChange={this.onChangeValue}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="addStatus">Status: </label>
							<select
								className="form-control"
								id="addStatus"
								name="status"
								value={this.state.status}
								onChange={this.onChangeValue}
							>
								<option value={true}>Finish</option>
								<option value={false}>Unfinished</option>
							</select>
						</div>

						<button type="submit" className={this.state.id ? 'btn btn-warning m-1' : 'btn btn-info m-1'} >
							<i className="fal fa-plus"></i> Save
						</button>

						<button
							type="button"
							className="btn btn-info m-1"
							onClick={this.onClear}
						>
							<i className="fad fa-trash-alt"></i> Clear
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default TaskForm;
