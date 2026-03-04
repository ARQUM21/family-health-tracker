import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(false)

  const value = {
    backendUrl,
    token,
    setToken,
    user,
    setUser,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider