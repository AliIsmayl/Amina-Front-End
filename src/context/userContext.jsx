import React, { createContext, useState } from 'react'

export const userContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const data = {
        user,
        setUser
    }
    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider