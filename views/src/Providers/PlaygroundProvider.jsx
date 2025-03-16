import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

const initialData = [
  {
    id: v4(),
    title: "DSA",
    files: [
      {
        id: v4(),
        title: "index",
        language: "cpp",
        code: `cout<<"hello world";`,
      },
    ],
  },

  {
    id: v4(),
    title: "Frontend",
    files: [
      {
        id: v4(),
        title: "test",
        language: "javascript",
        code: `console.log("hello world");`,
      },
    ],
  },
];

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(initialData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, []);

  return (
    <PlaygroundContext.Provider value={{folders}}>
      {children}
    </PlaygroundContext.Provider>
  );
};
