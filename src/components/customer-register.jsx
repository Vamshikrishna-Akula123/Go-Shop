import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export function CustomerRegister(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            CustomerId: '',
            CustomerName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:5070/register-customer`, customer);
            alert('Customer Registered Successfully..');
            navigate('/customer-login');
        }
    })



    return(
        <div className="bg-light m-3 p-3 w-25">
            <h3>Register Customer</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Customer Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="CustomerId" /></dd>
                    <dt>Customer Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="CustomerName" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
                </dl>
                <button className="btn btn-warning">Register</button>
                <div className="my-2">
                    <Link to="/customer-login">Existing Customer Login</Link>
                </div>
                <div className="my-2">
                    <Link to="/admin-login">Admin Login</Link>
                </div>
            </form>
        </div>
    )
}