import { loadState } from '@/config/storej';
import React, { createContext, useState } from 'react'

export const ThemaContext = createContext(null);

export default function ThemaProvider({ children }) {
    const [thema, setThema] = useState("" || loadState("thema"));
    return (
        <ThemaContext.Provider value={{ thema, setThema }}>
            {children}
        </ThemaContext.Provider>
    )
}
