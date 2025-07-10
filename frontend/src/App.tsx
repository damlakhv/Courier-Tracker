import React from 'react';
import {CourierList} from './components/CourierList';

const App: React.FC = () => (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <h1>Courier Management</h1>
        <CourierList />
    </div>
);

export default App;
