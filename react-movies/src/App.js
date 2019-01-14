import React, { Component } from 'react';
import _ from 'lodash'
import './css/style.css'

import Filter from './Filter'
import Movie from './Movie'

const filter = (movies, term) => {
    let filterTerm = '^(?=.*' + _.trim(term).split(/\s+/).join(')(?=.*') + ').*$'
    let pattern = RegExp(filterTerm, 'i')

    return _.filter(movies, movie => 
            pattern.test(_.join([movie.year, movie.director, movie.title], ' ')))
}
                    
class App extends Component {

    constructor(props) {
        super(props)
        this.state = { movies: this.props.movies, term: '' }
    }

    updateFilterTerm = term => {
        this.setState({ term: term })
    }

    render() {
        return <main>
            <Filter term={ this.state.term } updateFilterTerm={ this.updateFilterTerm } />
            { _.map(filter(this.state.movies, this.state.term), movie => <Movie key={ movie.rank } data={ movie } />) }
        </main>
    }
}

App.defaultProps = {
    movies: [
        { rank: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 },
        { rank: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
        { rank: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 },
        { rank: 4, title: 'The Godfather: Part II', director: 'Francis Ford Coppola', year: 1974 },
        { rank: 5, title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', year: 2003 },
        { rank: 6, title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994 },
        { rank: 7, title: 'Schindlers List', director: 'Steven Spielberg', year: 1993 },
        { rank: 8, title: '12 Angry Men', director: 'Sidney Lumet', year: 1957 },
        { rank: 9, title: 'Fight Club', director: 'David Fincher', year: 1999 }
    ]
}

export default App;
