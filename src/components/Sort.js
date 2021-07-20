import React, { Component } from "react";

export class Sort extends Component {
	
	onClick = (shortBy, sortValue) => {
		this.props.onSort(shortBy, sortValue);
	};

	render() {
		return (
			<div className="btn-group sort-task">
				<button
					type="button"
					className="btn btn-warning dropdown-toggle dropdown-toggle-sort"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Sort By <i className="fal fa-sort ml-2"></i>
				</button>
				<div className="dropdown-menu">
					<li
						className="dropdown-item item-sort"
						id={ (this.props.sortBy === 'name') && (this.props.sortValue === 1) ? "sort-selected" : ''}
						onClick={() => this.onClick("name", 1)}
					>
						A - Z <i className="far fa-sort-alpha-down"></i>
					</li>
					<li
						className="dropdown-item item-sort"
						id={
							this.props.sortBy === "name" &&
							this.props.sortValue === -1
								? "sort-selected"
								: ""
						}
						onClick={() => this.onClick("name", -1)}
					>
						Z - A <i className="far fa-sort-alpha-down-alt"></i>
					</li>
					<div className="dropdown-divider"></div>
					<li
						className="dropdown-item item-sort"
						id={
							this.props.sortBy === "status" &&
							this.props.sortValue === 1
								? "sort-selected"
								: ""
						}
						onClick={() => this.onClick("status", 1)}
					>
						Finish
					</li>
					<li
						className="dropdown-item item-sort"
						id={
							this.props.sortBy === "status" &&
							this.props.sortValue === -1
								? "sort-selected"
								: ""
						}
						onClick={() => this.onClick("status", -1)}
					>
						UnFinish
					</li>
				</div>
			</div>
		);
	}
}

export default Sort;
