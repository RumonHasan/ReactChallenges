import React, { useState } from 'react';
import './style.css';
//nested folder structure using recursive concept
const NestedFolder = () => {
  const [mainFolderState, setMainFolderState] = useState(false);
  const [newFileInput, setNewFileInput] = useState('');
  const [folders, setFolders] = useState({
    name: 'Src',
    children: [
      {
        name: 'Components',
        children: [
          {
            name: 'Counter App',
            children: [
              {
                name: 'Counter.jsx',
              },
            ],
          },
          {
            name: 'Different App',
            children: [
              {
                name: 'Different.jsx',
              },
            ],
          },
        ],
      },
    ],
  });
  // adding new children
  const addNewChildren = () => {
    if (newFileInput) {
      const fileName = newFileInput;
      const newApp = {
        name: 'JS App',
        children: [
          {
            name: 'Js.jsx',
          },
        ],
      };
      let folderCopies = { ...folders };
      while (folderCopies.children) {
        //adding at the component level
        if (folderCopies.children[0].name === fileName) {
          folderCopies.children[0].children.push(newApp);
        }
        // adding at the subcomponent level
        if (folderCopies.children.length > 1) {
          folderCopies.children.map((subChild) =>
            subChild.name === fileName
              ? { ...subChild, children: subChild.children.push(newApp) }
              : subChild
          );
        }
        folderCopies.children = folderCopies.children[0].children;
      }
    }
    setNewFileInput('');
  };

  // recursive approach to dig deep into the children of the files
  const FetchNestedChildren = ({ folder }) => {
    // use state is placed here for reinitialisation of inner children
    const [folderExpansion, setFolderExpansion] = useState(false);
    return (
      <div
        style={{
          borderLeft: '2px solid green',
          paddingLeft: 10,
          paddingTop: 10,
        }}
      >
        {folder.children ? (
          <button
            className="folder-button"
            onClick={() => setFolderExpansion(!folderExpansion)}
          >
            {folder.name}
          </button>
        ) : (
          <div
            className="general-file"
            style={{ marginLeft: '30px', fontSize: '15px' }}
          >
            {folder.name}
          </div>
        )}
        {folderExpansion && (
          <div style={{ marginLeft: '30px' }}>
            {folder.children?.map((innerNode, innerChildIndex) => {
              return (
                <div key={innerChildIndex}>
                  <FetchNestedChildren folder={innerNode} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex' }}>
        <input
          value={newFileInput}
          onChange={(e) => setNewFileInput(e.target.value)}
          placeholder="Enter the File Name to Add To"
        />
        <button onClick={() => addNewChildren()}>Add New Child</button>
      </div>
      NestedFolder
      <button
        onClick={() => setMainFolderState(!mainFolderState)}
        style={{ marginTop: 50 }}
        className="folder-button"
      >
        {folders.name}
      </button>
      {mainFolderState && (
        <div style={{ marginLeft: '30px' }}>
          {folders.children?.map((folder, index) => {
            return (
              <div key={index}>
                <FetchNestedChildren folder={folder} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NestedFolder;
