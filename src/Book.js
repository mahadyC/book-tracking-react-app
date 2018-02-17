import React, {Component} from 'react';
import ShelfControl from './ShelfControl';
class Book extends Component {
  
	handleStateChange = (changedBook) => {
		
		this.props.handleControl(changedBook);

		console.log(changedBook);
	}

	render() {
		
		return(
			<ol style={{overflow: "hidden"}}>
				{this.props.bookSchema.filter(eachBook => eachBook.shelf === this.props.bookCategory).map(book => (
					<li key={book.title} style={{float: "left"}}>
						<ShelfControl onSelectionChange={this.handleStateChange} book={book}/>
					</li>

				))}
			</ol>
		)
	}
}

export default Book;