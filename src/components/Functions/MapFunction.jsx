import { useState } from 'react';
import { UStates } from '../../data/states';

const MapFunction = (props) => {
  const { name } = props;
  console.log(name);
  const [array, setArray] = useState(UStates);

  return (
    <div>
      Map Function
      <div
        style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        {array.map((state, index) => {
          const { abbreviation, name } = state; // destructuring
          return <span key={name}>{name}</span>;
        })}
      </div>
    </div>
  );
};

export default MapFunction;
