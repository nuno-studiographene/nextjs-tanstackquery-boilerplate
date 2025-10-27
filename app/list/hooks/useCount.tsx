"use client";

import { useState } from "react";

export const useCount = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  return { count, setCount, increment };
};
