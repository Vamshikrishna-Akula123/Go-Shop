import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios  from "axios";

export function AdminDeleteProduct(){

    const [products, setProducts] = useState([{Id:0, Title:'', Image:'', Price:0, Description:'', Rating:{ Rate: 0, Count: 0 }, Category:''}]);                                               

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5070/get-product/${params.id}`)
        .then(response=>{
            setProducts(response.data);
        })
    }, [])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5070/delete-product/${params.id}`);
        navigate('/admin-dashboard');
    }

    return(
        <div className="bg-light m-3 p-2 w-25">
            <h3>Are you sure? want to delete !</h3>
            <dl>
                <dt>Title</dt>
                <dd>{products[0].Title}</dd>
                <dt>Description</dt>
                <dd>{products[0].Description}</dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger">Yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning ms-2">No</Link>
        </div>
    )
}