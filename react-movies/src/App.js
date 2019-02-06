import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './css/style.css';

import Filter from './Filter';
import Movie from './Movie';
import { UPDATE_FITER_TERM } from '.';

const filter = (movies, term) => {
    let filterTerm = '^(?=.*' + _.trim(term).split(/\s+/).join(')(?=.*') + ').*$';
    let pattern = RegExp(filterTerm, 'i');

    return _.filter(movies, movie =>
        pattern.test(_.join([movie.year, movie.director, movie.title], ' ')));
};

class App extends Component {
    render() {
        return <main>
            <Filter term={this.props.term} updateFilterTerm={this.props.updateFilterTerm} />
            {_.map(filter(this.props.myMovies, this.props.term), movie => <Movie key={movie.rank} data={movie} />)}
        </main>
    };
};

const mapStateToProps = state => ({ myMovies: state.movies, term: state.term });

const mapDispatchToProps = {
    updateFilterTerm: (event) => ({
        type: UPDATE_FITER_TERM,
        term: event.target.value
    })
};

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
