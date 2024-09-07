import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteSweep } from "react-icons/md";
import { removeItem } from "../features/cart/cartSlice";




const Cart=()=>{

    const {numItemsInCart,cartTotal,cartItems} = useSelector(state=>state.cartState);
    const user = useSelector(state=>state.userState.user);

    const dispatch = useDispatch();

    if(numItemsInCart===0){
        return (
            <Wrapper className='page-100'>
                <div className='empty'>
                <h2>Your cart is empty</h2>
                <NavLink to='/menuItems' className='btn'>
                    fill it
                </NavLink>
                </div>
      </Wrapper>
        )
    }

    return(
        <>
            <div className="container">                
                <div className="contentbar">                
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <div className="card m-b-30">
                                    <div className="card-header">
                                        <h5 className="card-title">Cart</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-10 col-xl-8">
                                                <div className="cart-container">
                                                    <div className="cart-head">
                                                        <div className="table-responsive">
                                                            <table className="table table-borderless">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Action</th>                                               
                                                                        <th scope="col">Photo</th>
                                                                        <th scope="col">Product</th>
                                                                        <th scope="col">Qty</th>
                                                                        <th scope="col">Price</th>
                                                                        <th scope="col" className="text-right">Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        cartItems.map(cart=>{
                                                                          const imageUrl = cart.Image[0].url;
                                                                         
                                                                            return (
                                                                                <tr>
                                                                                    <td><span onClick={()=>dispatch(removeItem(cart.cartId))} className="text-danger"><MdDeleteSweep /></span></td>
                                                                                    <td><img src={imageUrl} className="img-fluid" width="35" alt="product"/></td>
                                                                                    <td>{cart.name}</td>
                                                                                    <td>
                                                                                        <div className="form-group mb-0">
                                                                                            <input type="number" className="form-control cart-qty" name="cartQty1" id="cartQty1" value={cart.amount}/>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>${cart.price}</td>
                                                                                    <td className="text-right">${cart.price*cart.amount}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="cart-body">
                                                        <div className="row">
                                                            <div className="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                                                                <div className="order-note">
                                                                    <form>
                                                                        <div className="form-group">
                                                                            <div className="input-group">
                                                                                <input type="search" className="form-control" placeholder="Coupon Code" aria-label="Search" aria-describedby="button-addonTags" />
                                                                                <div className="input-group-append">
                                                                                    <button className="input-group-text" type="button" id="button-addonTags">Apply</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label for="specialNotes">Special Note for this order:</label>
                                                                            <textarea className="form-control" name="specialNotes" id="specialNotes" rows="3" placeholder="Message here"></textarea>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                                                                <div className="order-total table-responsive ">
                                                                    <table className="table table-borderless text-right">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Sub Total :</td>
                                                                                <td>${cartTotal}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Shipping :</td>
                                                                                <td>$0.00</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="f-w-7 font-18"><h4>Amount :</h4></td>
                                                                                <td className="f-w-7 font-18"><h4>${cartTotal}</h4></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cart-footer text-right">
                                                        {
                                                            user?.name ? 
                                                            <a href="/" className="btn btn-success my-1">Proceed to Checkout</a>
                                                            :
                                                            <NavLink to="/login" className="btn btn-success my-1">Login to Continue</NavLink>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default Cart;