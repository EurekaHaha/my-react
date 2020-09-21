import React from 'react';

interface IProperties {
  name: string;
  age: number;
}

function App(properties: IProperties): JSX.Element {
  const { name, age } = properties;
  return (
    <div className='app'>
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
