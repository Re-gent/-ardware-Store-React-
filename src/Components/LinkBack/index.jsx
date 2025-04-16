import { Link } from "react-router-dom";
import "./index.css"

export const LinkBack = () => {
  return (
    <div className="linkBack">
      <Link to="/">
        <h3>Назад на главную</h3>
      </Link>
    </div>
  );
};
