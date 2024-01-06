'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    const [state, setState] = useState('');

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => res.data)
            .then(data => {
                setState(data.name);
                console.log('Fetch!');
            });
    }, []);

    return (
        <div>hello {state}!</div>
    );
}