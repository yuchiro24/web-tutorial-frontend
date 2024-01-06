'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    const [state, setState] = useState('');

    useEffect(() => {
        async function fetchData() {
            axios.get('/api/hello_db/backend/')
                .then(res => res.data)
                .then(data => {
                    setState(data.message);
                    console.log('Set!');
                });
        }
        return () => {
            fetchData();
        }
    }, []);

    return (
        <div>hello {state}!</div>
    );
}