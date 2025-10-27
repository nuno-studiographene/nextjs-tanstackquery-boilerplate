import { Input } from "@/components";
import { useUserContext } from "../hooks/userEmailContext";

const CardTwo = () => {
  const { email, updateEmail } = useUserContext();
  return (
    <div>
      <Input
        value={email}
        onChange={(e) => {
          updateEmail(e.target.value);
        }}
      />
    </div>
  );
};

export default CardTwo;
