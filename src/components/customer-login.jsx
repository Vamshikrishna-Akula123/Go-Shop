

import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export function CustomerLogin(){

    const [customers, setCustomers] = useState([{CustomerId:'', CustomerName:'', Password:'', Email:'', Mobile:''}]);                                           

    const [cookies, setCookie, removeCookie] = useCookies(['customername']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            CustomerId:'',
            Password:''
        },
        onSubmit: (customer)=>{
            axios.get(`http://127.0.0.1:5070/get-customers`)
            .then(response=>{
                var result = response.data.find(item=> item.CustomerId===customer.CustomerId)
                if(result){
                    if(result.Password===customer.Password){
                        setCookie('customername', result.CustomerName);
                        navigate('/customer-dashboard');
                    }
                    else{
                        alert('Invalid Password');
                    }
                }else{
                    alert('Invalid Customer Id')
                }
            })
        }
    })


    return(
        <div className="bg-light p-4 m-4 w-25">
            <h3>Customer Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Customer Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="CustomerId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning"> Login </button>
            <div className="my-2">
                <Link to="/customer-register">New Customer Register</Link>
            </div>
            </form>
            
        </div>
    )
}