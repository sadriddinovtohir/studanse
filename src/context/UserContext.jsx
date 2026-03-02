import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children, user }) => {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
