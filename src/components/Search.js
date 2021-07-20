import React, { Component } from "react";

export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChangeSearch = (event) => {
        let target = event.target;
		let name = target.name;
		let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    
	render() {
        let { keyword } = this.state;
		return (
			<div className="input-group">
				<input
					type="email"
					className="form-control"
					placeholder="Search ..."
                    value={keyword}
                    name="keyword"
                    onChange={this.onChangeSearch}
				/>
				<div className="input-group-prepend search">
					<button type="button" className="btn btn-info" onClick={this.onSearch}>
						<i className="far fa-search mr-2"></i> Search
					</button>
				</div>
			</div>
		);
	}
}

export default Search;
