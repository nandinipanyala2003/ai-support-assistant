import { Link } from "react-router-dom";

const NotFound = () => {

    return (

        <div className="center-page">

            <h1>404</h1>

            <p>Page Not Found</p>

            <Link to="/dashboard">

                Go Home

            </Link>

        </div>

    );

};

export default NotFound;