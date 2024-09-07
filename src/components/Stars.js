import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { securedAxios } from '../axios_Instances/AxiosInstances';
const Stars = ({ stars, reviews,itemId }) => {

  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const[reviewData,setReview]=useState({
    id:0,
    rate:0,
    comment:''
  });

  const payload = {
    rate:reviewData.rate,
    comment:reviewData.comment
  }

  console.log("The reveiwData is :: ",reviewData);

  useEffect(()=>{
    const getReview = async()=>{
      try{
        const res = await securedAxios.get(`/api/rating/user/${user.userId}/menuItem/${itemId}`,{withCredentials:true});
        if(res.status===200){
          reviewData.id=res.data.id;
          reviewData.rate=res.data.rate;
          reviewData.comment=res.data.review;
        }
        console.log("The respons from get call of reviews are :: ",res);
      }catch(error){
        console.log("Error while fetching reviews :: ",error);
      }
    }
    getReview();
  },[]);

  const changeHandler=(e)=>{
    setReview({...reviewData,[e.target.name]:e.target.value});
  }

  const reviewSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
      const res = await securedAxios.post(`/api/rating/add/${itemId}/${user.userId}`,payload,{withCredentials:true});
      if(res.status===201){
        alert("Review Added Successfully");
        setShowReviewModal(false);
      }
      console.log("The response from the api adding review is  ",res);
    }catch(error){
      alert("Error while adding review");
      console.log("Error while adding Review !! ",error);
    }
    
  }

  const {user} = useSelector(state=>state.userState);

  const handleCloseModal=()=>{
    setShowModal(false);
    setShowReviewModal(false);
}

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })
  return (
    <Wrapper>
        <div className='reviews-top'>
          <div className='stars'>{tempStars}</div>
            <p className='reviews text-primary' onClick={()=>setShowModal(true)}>({reviews.length} customer reviews)</p>

            {/* Modal for image Uplaod */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title text-danger" id="editProfileModalLabel">Reviews</h5>
                                  <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                              <ul class="list-group list-group-flush">
                                {reviews.map((r)=><li class="list-group-item text-secondary">{r}</li>)}
                              </ul>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>handleCloseModal(false)}>Close</button>
                              </div>   
                          </div>
                      </div>            
              </div>
          </div>
        {
          user && 
          <div>
          <p className='reviews-sec text-primary mt-2' onClick={()=>setShowReviewModal(true)}>Add Review</p>
          {/* Modal for Review add/update */}
          <div className={`modal fade ${showReviewModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showReviewModal ? 'block' : 'none' }} aria-labelledby="editProfileModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title text-danger" id="editProfileModalLabel">Reviews</h5>
                                  <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                              
                              <form>
                                  <div className="row mb-4">
                                      <div className="col-12">
                                          <div data-mdb-input-init className="form-outline">
                                              <label className="form-label fs-5 text-secondary" for="ItemName">Ratings :</label>
                                              <select className="rating-options" name="rate" onChange={changeHandler} value={reviewData.rate}>
                                                <option className="form-control" value='1'>1</option>
                                                <option className="form-control" value='2'>2</option>
                                                <option className="form-control" value='3'>3</option>
                                                <option className="form-control" value='4'>4</option>
                                                <option className="form-control" value='5'>5</option>
                                            </select>                                           
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row mb-4">
                                    <div className="col-12">
                                        <div data-mdb-input-init className="form-outline">
                                            <label className="form-label fs-5 text-secondary" for="ItemName">Review :</label>
                                            <input type="text" name="comment" value={reviewData.comment} placeholder='Please Add your comments here...' onChange={changeHandler} className="form-control form-control" />                                           
                                        </div>
                                    </div>
                                </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>handleCloseModal(false)}>Close</button>
                                <button type="button" className="btn btn-success" onClick={reviewSubmitHandler} >Update</button>
                              </div>   
                          </div>
                      </div>            
            </div>
        </div>
        }

    </Wrapper>
  )
}

const Wrapper = styled.div`
  .reviews-top{
    display: flex;
    align-items: center;
  }
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
    cursor:pointer
  }
    .reviews-sec{
      margin-left:0;
    }
  .rating-options{
    width:100px;
    margin-left:1rem;
    cursor:pointer;
  }
  margin-bottom: 0.5rem;
`
export default Stars