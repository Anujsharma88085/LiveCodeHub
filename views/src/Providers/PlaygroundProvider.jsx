import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlaygroundContext = createContext();

export const defaultCodes = {
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
        code: defaultCodes['cpp'],
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
        code: defaultCodes['javascript'],
      },
    ],
  },
];

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem('data');
    if(localData)
      return JSON.parse(localData);
    return initialData;
  });

  const deleteFolder = (id) => {
    const updatedFolderList = folders.filter((folderItem) => {
      return folderItem.id !== id;
    })

    localStorage.setItem('data', JSON.stringify(updatedFolderList));
    setFolders(updatedFolderList)
  }

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

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      title: folderName,
      files: [],
    };

    const allFolders = [...folders];
    allFolders.push(newFolder);
    localStorage.setItem('data', JSON.stringify(allFolders));
    setFolders(allFolders);
  }

  const editFolderTitle = (newFolderName, id) => {
    const updatedFoldersList = folders.map((folderItem) => {
      if(folderItem.id === id)
        folderItem.title = newFolderName;
      return folderItem;
    });

    localStorage.setItem('data', JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  }

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = [...folders]
    for(let i = 0; i < copiedFolders.length; i++){
      if(folderId === copiedFolders[i].id){
        const files = copiedFolders[i].files;
        for(let j = 0; j < files.length; j++){
          if(fileId === files[j].id){
            files[j].title = newFileName;
            break;
          }
        }
        break;
      }
    }

    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  }

  const deleteFile = (foderId, fileId) => {
    const copiedFolders = [...folders];

    for(let i = 0; i < copiedFolders.length; i++){
      if(copiedFolders[i].id === foderId){
        const files = [...copiedFolders[i].files];
        copiedFolders[i].files = files.filter((file) => {
          return file.id != fileId;
        });
        break;
      }
    }
    setFolders(copiedFolders);
    localStorage.setItem('data', JSON.stringify(copiedFolders));
  }

  const createPlayground = (folderid, file) => {
    const copiedFolders = [...folders];

    for(let i = 0; i < copiedFolders.length; i++){
      if(copiedFolders[i].id === folderid){
        copiedFolders[i].files.push(file);
        break;
      }
    }

    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  }

  const getDefaultCode = (fileId, folderId) => {

    for(let i = 0; i < folders.length; i++){
      if(folders[i].id === folderId){
        for(let j = 0; j < folders[i].files.length; j++){
          const currentFile = folders[i].files[j];
          if(currentFile.id === fileId){
            return currentFile.code;
          }
        }
      }
    }
  }

  const updateLanguage = (fileId, folderId, language) => {
    const newFolders = [...folders]
    for(let i = 0; i < newFolders.length; i++){
      if(folderId === newFolders[i].id){
        for(let j = 0; j < newFolders[i].files.length; j++){
          const currentFile = newFolders[i].files[j];
          if(currentFile.id === fileId){
            currentFile.code = defaultCodes[language];
            currentFile.language = language;
          }  
        }
      }
    }
    localStorage.setItem('data', JSON.stringify(newFolders));
    setFolders(newFolders);
  }

  const getLanguage = (fileId, folderId) => {
    for(let i = 0; i < folders.length; i++){
      if(folderId === folders[i].id){
        for(let j = 0; j < folders[i].files.length; j++){
          const currentFile = folders[i].files[j];
          if(currentFile.id === fileId)
            return currentFile.language;
        }
      }
    }
  }

  useEffect(() => {
    if(!localStorage.getItem("data"))
      localStorage.setItem("data", JSON.stringify(folders));
  }, []);

  const playgroundFeatures = {
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
    getDefaultCode,
    getLanguage,
    updateLanguage,
  }

  return (
    <PlaygroundContext.Provider value={playgroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
