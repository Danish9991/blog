import React, {useEffect} from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
  } from "mdb-react-ui-kit";
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom'
import {getTour} from '../redux/features/tourSlice'
import moment from "moment";

const SingleTour = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, tour } = useSelector((state) => ({...state.tour}))


    useEffect(() => {
        if(id){
            dispatch(getTour(id))
        }
    }, [id])
    if(loading) return <div>loading...</div>
  return (
    <div>
        <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
    </div>
  )
}

export default SingleTour