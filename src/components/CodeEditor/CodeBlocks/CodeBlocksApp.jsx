import React, { useState } from 'react';
import { codeBlocks } from './codeblocks';
import { CodeBlock, dracula } from 'react-code-blocks';
const CodeBlocksApp = () => {
  const [codes, setCodes] = useState(codeBlocks);
  const [languageDemo, setLanguageDemo] = useState(codes.jsx);
  const [languageKey, setLanguageKey] = useState('jsx');
  const [inputSnippet, setInputSnippet] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // functions
  const getCodeSnippet = (language) => {
    const languageDemoSelected = codeBlocks[language];
    setLanguageDemo(languageDemoSelected);
    setLanguageKey(language);
  };

  const addSelectedLanguage = (lang) => {
    setSelectedLanguage(lang);
  };

  const addSnippet = () => {
    if (inputSnippet === '') return;
    if (inputSnippet && selectedLanguage) {
      setCodes((prevCode) => ({
        ...prevCode,
        [selectedLanguage]: inputSnippet,
      }));
      setLanguageDemo(codes[selectedLanguage]);
    }
  };

  // styles
  const selectButtonStyles = {
    marginRight: 10,
    fontSize: 15,
    padding: 4,
    cursor: 'pointer',
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <React.Fragment>
      <div
        className="demo"
        style={{ fontSize: 15, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ display: 'flex', overflow: 'auto', maxWidth: 500 }}>
          {Object.keys(codes).map((language, index) => {
            return (
              <button
                style={selectButtonStyles}
                key={index}
                onClick={() => getCodeSnippet(language)}
              >
                {language}
              </button>
            );
          })}
        </div>
        <div style={{ margin: 10, height: 600 }}>
          <CodeBlock
            language={languageKey}
            text={languageDemo}
            theme={dracula}
            showLineNumbers={true}
            wrapLines={true}
            codeBlock
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <textarea
              placeholder="add new snippet"
              value={inputSnippet}
              onChange={(e) => {
                setInputSnippet(e.target.value);
              }}
            ></textarea>
            {Object.keys(codes).map((language, index) => (
              <button key={index} onClick={() => addSelectedLanguage(language)}>
                {language}
              </button>
            ))}
          </div>

          <button
            style={{ width: 100, margin: 10 }}
            onClick={() => addSnippet()}
          >
            Add Snippet
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CodeBlocksApp;
