# usedebounce

> React Hook to determines whether a value has remained settled for a provided duration

# Install
```
npm install --save usedebounce
```

# Usage

```js
import React, { useState } from 'react'

import useDebounce from 'debounce'

// Component that returns a list of suggestions from a backend service based on a filter
// Debounce the filter to prevent hammering the service
const SuggestionList = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [filter, setFilter] = useState('');

    const callback = () => {
        getNewSuggestions(filter)
            .then(setSuggestions)
            .catch(console.error)
    }
    const isFilterSettled = useDebounce(filter, callback, 350);

    return (
        <div>
            <input
                onChange={ ({ target: { value } }) => setFilter(value) }
                value={filter}
            />
            {
                isFilterSettled ?
                <ul>
                    { suggestions.map( suggestion => <li>{suggestion}</li> ) }
                </ul>
                :
                <Loader />
            }
        </div>
    );
}
```