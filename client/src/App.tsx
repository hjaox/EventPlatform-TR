import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>
}