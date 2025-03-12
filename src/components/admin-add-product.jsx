import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function AdminAddProduct(){

    const [categories, setCategories] = useState([{Id:0, Category:''}]);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            Id: 0,
            Title: '',
            Image: '',
            Price:0,
            Description:'',
            Rating:{ Rate: 0, Count: 0 } ,
            Category:''
        },
        onSubmit: (product)=>{
            axios.post(`http://127.0.0.1:5070/add-product`, product)
            alert('Product Added Successfully..');
            navigate('/admin-dashboard');
        }
    })

    useEffect(()=>{

        axios.get(`http://127.0.0.1:5070/get-categories`)
        .then(response=>{
            response.data.unshift({
                Id: 0,
                Category: 'Select a Category'
            })
            setCategories(response.data);
        })

    }, []);



    return(
        <div className="m-3 p-3 bg-light w-25">
            <h3>Add New Product</h3>
            <form onSubmit={formik.handleSubmit} style={{height:"400px"}} className="overflow-auto">
                <dl>
                    <dt>Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Id" /></dd>                         
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                    <dt>Image</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Image" /></dd>
                    <dt>Price</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Price" /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows="2" onChange={formik.handleChange} cols="40" className="form-control" name="Description"></textarea></dd>
                    <dt>Rating</dt>
                    <dd>
                        <div className="d-flex gap-2"><input type="number" step="0.1" min="0" max="5" onChange={formik.handleChange} className="form-control" name="Rating.Rate" placeholder="Rate (0-5)" />
                            <input type="number" min="0" onChange={formik.handleChange} className="form-control" name="Rating.Count" placeholder="Count" />
                        </div>
                    </dd>
                    
                    <dt>Category</dt>
                    <dd>
                        <select className="form-select" name="Id" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option key={category.Id} value={category.Id}>{category.Category}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Add Video</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}




        