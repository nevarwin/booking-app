'use client';

import { useState } from 'react';

export default function Counter({ user }) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{user.length}</p>
            <button onClick={() => setCount((c) => c + 1)}> {count}</button>
        </div>
    );
}
