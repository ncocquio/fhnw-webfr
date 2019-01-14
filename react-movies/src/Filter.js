import React from 'react'
import _ from 'lodash'

const _onChange = (updateFilterTerm, event) => {
    event.preventDefault()
    updateFilterTerm(event.target.value) // Schickt den Filter-Term via props.filterFn nach 'oben'.
}

const Filter = ({ updateFilterTerm, term }) => 
    <form>
        <input type='text' placeholder='Liste Filtern mit...' value={ term } onChange={ _.partial(_onChange, updateFilterTerm) } />
    </form>

export default Filter