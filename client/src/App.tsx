import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/Home");
  }, []);

  return <></>
}