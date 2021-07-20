import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

export class Control extends Component {
	render() {
		return (
			<>
				<div className="col-lg-6">
					<Search onSearch={this.props.onSearch}/>
				</div>

				<div className="col-lg-4">
					<Sort 
						onSort={this.props.onSort}
						sortBy={this.props.sortBy}
						sortValue={this.props.sortValue}
					/>
				</div>
			</>
		);
	}
}

export default Control;
