import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatPrice } from "../utils";
import { useState } from "react";
import Filters from "./Filters";

const ListviewItems=({products,filteredItems})=>{

  console.log("The type of products is :: ",products);
  const [imageSrc, setImageSrc] = useState('');


    
    return(
        <Wrapper>
            <div className="row justify-content-center">
              <div className="col-2">
                <Filters />
              </div>
              <div className="col-8 listItems">
                <div className="title">
                  <h3>MenuItems</h3>
                  <div className="underline"></div>
              </div>
              {
                  filteredItems.map((product)=>{
                      const{id,name,price,description,category,type,ratings,fileData} = product;
                      var img=null;
                      if(fileData){
                        img = fileData[0]?.name;
                      }
                      console.log("The name is :: and image is :: ",name,img);
                      return (
                          <article key={id}>
                              <img src= {`http://localhost:8080/api/files/path/${img}?${new Date().getTime()}`}  alt={name} />
                              <div>
                                  <h4>{name}</h4>
                                  <h5 className="price">{formatPrice(price)}</h5>
                                  <p>{description.substring(0,150)}...</p>
                                  <Link to={`/menuItems/${id}`} className="btn btn-info">Details</Link>
                              </div>
                          </article>
                      )
                  })
                }
              </div>
            </div>
       </Wrapper>
    )
}

const Wrapper = styled.section`
  
  .listItems{
    display: grid;
    row-gap: 3rem;
    place-items:center;
    margin-top:2rem;
  }

.underline{
    background:gray;
    height:3px;
    width:70px;
    margin:auto;
}
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: .6rem;
    padding: 0.25rem 0.5rem;

  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListviewItems;