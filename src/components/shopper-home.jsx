import { Link } from "react-router-dom";

export function ShopperHome(){
    return(
        <div className="d-flex flex-column mt-5 pt-5">
            <Link className="btn btn-light w-25 ms-4 mt-3" to="/admin-login">Admin Login</Link>
            <Link className="btn btn-warning w-25 ms-4 mt-3" to="/customer-login">Customer Login</Link>
            <Link className="btn btn-info w-25 ms-4 mt-3" to="/customer-register">Customer Register</Link>
        </div>
    )
}

