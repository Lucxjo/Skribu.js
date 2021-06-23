import { createContext } from "react";

export const UserContext = createContext<{user?: firebase.default.User | null, username?: string | null}>( { user: null, username: null } )