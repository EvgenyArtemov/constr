import React from 'react';
import { render } from 'react-dom';
import { Unit } from './builder/components';

import './index.css';

const App = () => (
    <div>
        <Unit />
    </div>
)

render(<App />, document.getElementById('root'))