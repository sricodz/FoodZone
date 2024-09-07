import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../context/productContext";
import { useEffect, useState } from "react";
import { formatPrice, single_product_url } from "../utils";
import styled from "styled-components";
import { PageHero, ProductImages, Stars } from "../components";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { publicAxios } from "../axios_Instances/AxiosInstances";

const SingleItem=()=>{

    const{fetchSingleProduct,single_product} = useProductsContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[amount,setAmount] = useState(1);
    const[rateRes,setRateRes] = useState();

    useEffect(()=>{
        fetchSingleProduct(`/v1/menuItem/id/${id}`)
    },[id]);

    useEffect(()=>{
      const reviews=async()=>{
        if(!rateRes){
          try{
            const res = await publicAxios.get(`/v1/rating/menuItem/${id}`);
            console.log("the res of ratings ",res);
            if(res.status===200){
              setRateRes(res.data);
              console.log("The reviews rews os :: ",res.data);
            }
          }catch(error){
            console.log("Error getting while fetching ratings :: ",error);
          }
        }
      }
      reviews();
    },[id]);

    let rateVal = 0;
    let reviewArray = [];

    rateRes?.map(r=>{
      rateVal+=r.rate;
      reviewArray.push(r.review);
    })
    rateVal = rateVal/rateRes?.length;

    console.log("The rateVal amd rateRev is :: ",rateVal,reviewArray,rateRes?.length);

    const {
      name,price,available,category,type,fileData,description
    } = single_product;

    const images = fileData?.map(data=>data.name);

    console.log("The images are :: ",images);

    const cartProduct = {
      cartId : id,
      Image : images,
      name : name,
      price,
      category,
      type,
      amount
    };

    const addToCart=()=>{
      dispatch(addItem({item:cartProduct}));
      navigate("/menuItems");
    }

    const handleAmount=(e)=>{
      setAmount(parseInt(e.target.value));
    }

    return(
        <Wrapper>
            <PageHero title={name} product={single_product} />
            <div className="section sectioni-center page">
                <Link to="/menuItems" className="btn btn-info">Back to MenuItems</Link>
                <div className="product-center">
                    <ProductImages images={images} />
                    <section className="content">
                        <h2>{name}</h2>
                        <Stars stars={rateVal} reviews={reviewArray} itemId={id}/>
                        <h5 className="price">{formatPrice(price)}</h5>
                        <p className="desc">{description}</p>
                        <p className="info">
                            <span>Category : </span> {category}
                        </p>
                        <p className='info'>
                            <span>Type :</span>
                            {type}
                        </p>
                        <hr />
                        <p className='info'>
                            <span>Quantity :</span>
                            <select className="btn btn-secondary" onChange={handleAmount}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                        </p>
                        <button className="btn" onClick={addToCart}>ADD To Cart</button>
                    </section>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
    place-items:center;
    margin-bottom:1rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;



export default SingleItem;