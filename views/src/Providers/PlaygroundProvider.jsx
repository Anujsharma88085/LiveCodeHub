import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

const defaultCodes = {
  'cpp': `
#include <iostream>
int main()
{
  std::cout<<"Hello World";
  return 0;
}`,

  'java': `
public class Main
{
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,

  'python': `print ('Hello World')`,

  'javascript': `console.log('Hello World');`,
}

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

  const createNewPlayground = (newPlayground) => {
    const newFolders = [...folders];
    newFolders.push(
      {
        id: v4(),
        title: newPlayground.folderName,
        files: [
          {
            id: v4(),
            title: newPlayground.fileName,
            language: newPlayground.language,
            code: defaultCodes[newPlayground.language],
          },
        ],
      }
    )
    localStorage.setItem('data', JSON.stringify(newFolders));
    setFolders(newFolders);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, []);

  const playgroundFeatures = {
    folders,
    createNewPlayground,
  }

  return (
    <PlaygroundContext.Provider value={playgroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
