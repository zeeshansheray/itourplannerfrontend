import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import '../componentcss/transport.css';
const Notfound = (props) => {
    return (
        <div className="deletebox" id="novehiclesbox" style={props.style }>
            <div className="modal-content" style={{backgroundColor: '#001529'}}>
                <div className="modal-header flex-column" style={{ textAlign: 'center' }}>
                    <div id="notfoundicon" style={{animation: 'none', marginLeft:'38%'}}>
                        <i className="material-icons"> <ErrorIcon style={{ fontSize: '80px', color: 'red' }} /></i>
                    </div>
                    <h4 className="modal-title w-100" style={{color:'white'}}>{props.message}</h4>
                    <div >
                        <p id="deletetext" style={{color:'white'}} >{props.sidemessage}</p>
                    </div>
                </div>
                <div className="modal-body">
                    {/* <p>Go to <strong>Provides Services </strong>and add up your own vehicles to earn.</p> */}
                    <p style={{color:'white'}}>{props.detail}</p>
                </div>
            </div>
        </div>

    );


}
export default Notfound;