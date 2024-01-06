'use client';

import { useEffect, useState } from "react";

export default function Page() {
    const [state, setState] = useState(0);

    useEffect(() => {
        setState(1);
        console.log('Start!');
    }, []);

    return (
        <>
            <div>Count: {state}</div>
            <button onClick={() => setState(state + 1)}>Increment</button>
        </>
    );
}