import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/layout";

const Counter = () => {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount((state) => (state === 0 ? 15 : state - 1));
    }, 1000);

    return () => clearInterval(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Text>{count}</Text>;
};

export default Counter;
