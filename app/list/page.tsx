"use client";

import { Button } from "@/components";
import { useCount } from "./hooks/useCount";
import Card from "./components/Card";
import CardTwo from "./components/CardTwo";
import { UserProvider } from "./hooks/userEmailContext";

const ListPage = () => {
  const { count, setCount, increment } = useCount();

  return (
    <div>
      Count:{count}
      <Button
        onClick={() => {
          setCount(1111);
        }}
      >
        Set to 1111
      </Button>
      <Button onClick={increment}>Add + 1</Button>
      <br></br>
      <UserProvider>
        <Card />
        <CardTwo />
      </UserProvider>
    </div>
  );
};

export default ListPage;
