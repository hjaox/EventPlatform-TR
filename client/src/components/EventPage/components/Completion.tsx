import { useParams } from "react-router-dom";

function Completion() {
  const params = useParams();
  console.log(params);
    return <h1>Thank you! 🎉</h1>;
  }

  export default Completion;
