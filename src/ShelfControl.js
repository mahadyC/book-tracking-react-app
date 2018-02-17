import React, { Component } from 'react';

class ShelfControl extends Component {
	
  initialBook = this.props.book

  state = {
    bookShelf: this.initialBook.shelf
  }
	
	handleChange = (event) => {
		// setState keeps the control button up to date according to changed value
		this.setState({bookShelf: event.target.value})
		// Provide the changed selection value to the book object
		this.initialBook.shelf = event.target.value
		this.props.onSelectionChange(this.initialBook)
		console.log(this.initialBook)	
	}
	
	render() {
		return(
			<div style={{padding: "15px"}}>
				<img src={this.initialBook.imageUrl}/>
				<p>{this.initialBook.title}</p>
				<p>{this.initialBook.author}</p>
				<select value={this.state.bookShelf} onChange={this.handleChange}>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
			 
			
		)
	}
}


export default ShelfControl;