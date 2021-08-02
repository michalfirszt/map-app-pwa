import React, { useEffect, useState } from 'react';

const FunctionCounter = ({ value }) => {
  const [counterValue, setCounterValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterValue((prevValue) => prevValue - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{counterValue}</div>;
};

export default FunctionCounter;
