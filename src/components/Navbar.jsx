import { useState } from "react";
import {  NavLink } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import styled from "styled-components";
import {useSelector} from 'react-redux';
import Dropdown from "./Dropdown";

const Navbar=()=>{

    const[activeItem,setActiveItem]=useState(1);
    const numItemsInCart = useSelector(state=>state.cartState.numItemsInCart);
    const {token,userEmail,user} = useSelector(state=>state.userState);

    console.log("The userDetails are :: ",user);
    console.log("The value of token and userEmail is :: ",token ,userEmail);

    console.log("The vlaus of token is ",token);

    const list= [
        {
            id:1,
            name:"shop Online",
            route:"/"
        },
        {
            id:2,
            name:"Menu-Items",
            route:"/menuItems"
        },
        {
            id:3,
            name:"About-us",
            route:"/about"
        },
        {
            id:4,
            name:"Contact",
            route:"/contact"
        },
    ];

    

    return(
        <NavContainer>
            <nav>
                <h2 className="head"><NavLink to="/" className="food">FoodZoNe</NavLink></h2>
                <div className="items">
                    <ul>
                        {
                            list.map(l=>{
                                return (
                                    <li key={l.id}><NavLink className="list" onClick={()=>setActiveItem(l.id)} to={l.route}>{l.name}</NavLink> </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="cart">
                    <NavLink to="/cart"><FaCartArrowDown className="cart-icon"/></NavLink>
                    <span className="count">{numItemsInCart}</span>
                </div>
                {
                    !user ? 
                    <div className="auth">
                        <button ><NavLink className="auth-item" to="/login">Login</NavLink></button>
                        <button><NavLink className="auth-item" to="/register">Register</NavLink></button>
                    </div>
                    :
                    <div>
                        <Dropdown name={user.name} />
                    </div>
                }
                
            </nav>
        </NavContainer>
    )
}
const NavContainer=styled.nav`
    background:#ffede7;
    height:5rem;
    display : flex;
    align-items:center;
    nav{
        width:100%;
        display : flex;
        justify-content:space-between;
        align-items:center;
        h2{
            .food{
                margin-left:2rem;
                letter-spacing:.1rem;
                cursor:pointer;
                color:#a66d5b;
                text-decoration:none;
            }
        }
        ul{
         margin-top:1rem;
         display : flex;
         align-items:center;
         
         li{
            list-style-type:none;
            padding-left:1rem;
            .list{
                text-decoration:none;
                color:#82716c;
                font-size:1.1rem;
                cursor:pointer;
            }
            .list:hover{
                color:#d6a596;
            }
            active{
                color:#d6a596;
            }
         }
        }
         .cart{
            .cart-icon{
                font-size:1.9rem;
                color : #a66d5b;
                cursor:pointer
            }
            .count{
                background : #a66d5b;
                padding: 0px 5px; 
                border-radius:50%;
                position : absolute;
                top:12px;
                color:white;
            }
            .cart-icon:hover{
                color:#d6a596
            }
         }
        .auth{
            margin-right:2rem;
            button{
                margin-left:1rem;
                padding:3px;
                border:none;
                background:transparent;
            }
            .auth-item{
                text-decoration:none;
                font-size:1.2rem;
                color:#82716c;
            }
            .auth-item:hover{
                color:#d6a596;
            }
            
        }
    }
`


export default Navbar;