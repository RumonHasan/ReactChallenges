export let codeBlocks = {
  java: `class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}`,
  javascript: `var sys = require("sys");
sys.puts("Hello World");
`,
  jsx: `import React from 'react';
  import { codeBlocks } from './codeblocks';
  import { CodeBlock, dracula } from 'react-code-blocks';
  const CodeBlocksApp = () => {
    return (
      // eslint-disable-next-line react/jsx-no-undef
      <React.Fragment>
        <div className='demo' style={{ height: '100vh' }}>
          <CodeBlock
            language={'jsx'}
            text={codeBlocks.jsx}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      </React.Fragment>
    );
  };
  
  export default CodeBlocksApp;`,
};
