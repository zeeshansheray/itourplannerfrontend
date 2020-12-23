import React, { Component } from 'react';
import '../componentcss/transport.css';
import '../componentcss/searchtransport.css';
import '../componentcss/hotel.css';

import Notfound from './Notfound';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import userImg from '../images/pngegg.jpg';
function RenderGuides({ Guides }) {
  if (Guides !== null && Guides.length > 0) {
    return (
      <div style={{ margin: '40px', marginTop: '50px' }}>
        <MDBRow>
          {Guides.map((guide, key) => {
            return (
              <MDBCol key={key} md="6">
                <MDBCard
                  testimonial
                  style={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    maxWidth: '25em',
                    minWidth: '0',
                  }}
                >
                  <div className="uperCard"></div>
                  <div
                    style={{
                      marginTop: '-60px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      className="rounded-circle img-responsive"
                      alt="woman avatar "
                      src={userImg}
                    />
                  </div>
                  <MDBCardBody>
                    <h4 className="card-title">
                      {guide.fullname.toUpperCase()}
                    </h4>
                    <hr />
                    <h5>{guide.city.toUpperCase()}</h5>{' '}
                    <h6>{guide.address.toUpperCase()}</h6>
                    <p>
                      <MDBIcon size="1x" icon="envelope-open">
                        {' '}
                        {guide.email}
                      </MDBIcon>
                      <br />
                      <MDBIcon size="1x" icon="mobile">
                        {' '}
                        {guide.phone}
                      </MDBIcon>
                    </p>
                    {guide.availability ? (
                      <MDBIcon icon="circle" style={{ color: 'green' }}>
                        {' '}
                        Available
                      </MDBIcon>
                    ) : (
                        <MDBIcon icon="circle" style={{ color: 'red' }}>
                          {' '}
                        Not avialable
                        </MDBIcon>
                      )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </div>
    );
  } else {
    return (
      <div >
        <Notfound
          detail={[
            <strong>No guides found</strong>,
          ]}
          style={{ marginTop: '15%' }}
        />
      </div>
    );
  }
}
const displayGuides = (props) => {
  if (props.guides !== null) {
    return (
      <div className="searchGuides">
        <RenderGuides Guides={props.guides} />
      </div>
    );
  } else {
    console.log('no data avialable');
    return <div> </div>;
  }
};

export default displayGuides;
