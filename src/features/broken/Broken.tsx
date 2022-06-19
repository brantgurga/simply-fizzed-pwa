import { Link } from "react-router-dom";

function Broken() {
  return (
    <div>
      <h1>Broken</h1>
      <p>
        You've reached a bad destination. <Link to="/">Try starting over.</Link>
      </p>
    </div>
  );
}

export default Broken;
