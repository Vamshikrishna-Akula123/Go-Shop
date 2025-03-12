import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function AdminDashboard(){

    const[product, setProduct] = useState([{Id:0, Title:'', Image:'', Price:0, Description:'', Rating:{ Rate: 0, Count: 0 } , Category:''}]);                                               

    useEffect(()=>{

        axios.get(`http://127.0.0.1:5070/get-products`)
        .then(response=>{
            setProduct(response.data);
        });

    },[])

    return(
        <div className="bg-light p-3 m-5 ">
            <h3>Admin Dashboard</h3>
            <div className="mb-3">
                <Link to="/add-product" className="btn btn-primary bi bi-node-plus-fill"> Add Product </Link>
            </div>
            <div>
                <table className="table  table-hover ">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Preview</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map(product=>
                                <tr key={product.Id}>
                                    <td>{product.Category}</td>
                                    <td>
                                    <img src={product.Image} alt={product.Title} width="150px" height="100px" />
                                    </td>
                                    <td>
                                        <Link to={`/edit-product/${product.Id}`} className="bi bi-pen-fill btn btn-warning me-2"></Link>
                                        <Link to={`/delete-product/${product.Id}`} className="bi bi-trash-fill btn btn-danger"></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}