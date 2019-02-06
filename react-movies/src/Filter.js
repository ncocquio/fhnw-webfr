import React from 'react'

const Filter = ({ updateFilterTerm, term }) =>
    <form>
        <input type='text' placeholder='Liste Filtern mit...' value={term} onChange={updateFilterTerm} />
    </form>

export default Filter