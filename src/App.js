import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Book from './Book';
import ShelfControl from './ShelfControl';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import './App.css';

class MyRead extends Component {

  state = {
    books : [],
    query: ''   
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {

      let allBooks = bookList.map(function(book) {
        return {
          title: book.title,
          author: book.authors,
          shelf: book.shelf,
          imageUrl: book.imageLinks.smallThumbnail
        }
      });
      this.setState({books: allBooks});
      console.log(this.state.books);
    })
  }

  handleControl = (changedBook) => {
    this.setState((state) =>{
      state.books.splice(state.books.findIndex(book => book.title === changedBook.title), 1, changedBook)
      // Using 'this' to get the updated current state. Also, state.books works because 'state'
      // object represents the current value of the state property.
      return this.state.books 
    })
    console.log(this.state.books)
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }
  
  render() {
    console.log('Render the app');

    let showingBooks
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      showingBooks = this.state.books.filter((book) => match.test(book.title) || match.test(book.author));
    } else {
      showingBooks = []
    }

    return (
      <div className="MyRead">
        <Route exact path="/" render={() => (
          <div>
            <header className="MyRead-header">
            <h1>MyRead</h1>
            </header>
            <Shelf category={"Want to Read"}>
            </Shelf>
            <Book bookCategory={"wantToRead"} bookSchema={this.state.books} handleControl={this.handleControl}/>
            <Shelf category={"Currently Reading"}>
            </Shelf>
            <Book bookCategory={"currentlyReading"} bookSchema={this.state.books} handleControl={this.handleControl}/>
            <Shelf category={"Read"}>
            </Shelf>
            <Book bookCategory={"read"} bookSchema={this.state.books} handleControl={this.handleControl}/>
            <div style={{float: "right"}}>
              <Link to="search">Go to search page</Link>
            </div>
          </div>
          
        )}></Route>
        
        <Route exact path="/search" render={() => (
          <div>
            <Link to="/">Back to main page</Link>
            <input type="text" placeholder="search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}></input>
            <ol>
              {showingBooks.map(book => 
                <li key={book.title}>
                  <ShelfControl onSelectionChange={this.handleControl} book={book} />
                </li>
              )}
            </ol>
          </div>
          
        )}>{console.log(showingBooks)}</Route>
      </div>
    );
  }
}

export default MyRead;
