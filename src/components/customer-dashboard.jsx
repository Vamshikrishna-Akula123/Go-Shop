import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux-slicer/slicer";



export function CustomerDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies(['customername']);
    const navigate = useNavigate();

    const [Items, setItems] = useState([]);
    const dispatch = useDispatch();

    const itemCount = useSelector(state => state.Cart.ItemsCount);

    function handleSignout(){
        removeCookie('customername');
        navigate('/customer-login');
    }

    function handleSaveClick(item){
        alert("Your Item added to Cart..");
        dispatch(addToCart(item));
    }


    const[products, setProducts] = useState([{Id:0, Title:'', Image:'', Price:0, Description:'', Rating:{ Rate: 0, Count: 0 }, Category:''}]);                                               

    useEffect(()=>{

        axios.get(`http://127.0.0.1:5070/get-products`)
        .then(response=>{
            setProducts(response.data);
        });

    },[])



    return(
        <div className="bg-light p-2 m-2">
            <h3 className="d-flex justify-content-between">
                <div>
                    <span>{cookies['customername']}</span> <span>Dashboard</span>
                </div>
                <div>
                    <button className="btn">{itemCount}</button>
                </div>
                <div>
                    <button onClick={handleSignout} className="btn btn-link">SignOut</button>                                                                                
                </div>
            </h3>
            <div className="row">
                <div className="col-2">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Search Products</label>
                        <div className="input-group">
                            <input type="text" className="form-control" />
                            <button className="bi bi-search btn btn-warning"></button>
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Select Category</label>
                        <div>
                            <select className="form-select">
                                <option>Select Category</option>
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                                <option>Toys</option>
                                <option>Home & Kitchen</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <section className="mt-4 d-flex flex-wrap">
                        {
                            products.map(product=>
                                <div key={product.Id} className="card m-2 p-2" style={{width:'250px'}}>
                                    <div className="card-Title" style={{height:'30px'}}>
                                        <h5>{product.Title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <img src={product.Image} className="w-100" height="150"></img>
                                    </div>
                                    <div className="card-footer">
                                        <span className="bi bi-currency-dollar"> {product.Price} </span>
                                        <span className="bi bi-star-fill mx-3"> {product.Rating?.Rate || 0} </span>
                                        <span className="bi bi-people-fill"> {product.Rating?.Count || 0} </span>
                                        <button onClick={()=> handleSaveClick(product)} className="bi bi-cart btn mt-2"> Add to Cart</button>
                                    </div>
                                </div>
                            )
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}