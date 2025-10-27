import { useUserContext } from "../hooks/userEmailContext";

const Card = () => {
  const { email } = useUserContext();

  return <div>Email: {email}</div>;
};

export default Card;
