import { useContext, createContext, useState } from "react";

// Create a context
const UserContext = createContext<any>(undefined);

// Create the provider
const UserProvider = ({ children }: any) => {
  const [email, setEmail] = useState<string>("");

  const updateEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <UserContext.Provider value={{ email, updateEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// Create the custom hook to use the context easily
const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

export { UserProvider, useUserContext };
