import React, { Component } from 'react';
import '../componentcss/deleteaccount.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default class deleteaccount extends Component {
    constructor(props) {
        super(props)
        this.confirmFunction = this.confirmFunction.bind(this);

        this.state = {
            deleterequest: false,
        }
    }

    confirmFunction(e) {
        var check = window.confirm("Are you sure, you wanna delete this account permenantly?");
        if (check) {
            e.preventDefault();
            this.state.deleterequest = true;
            const request = {
                deleterequest: this.state.deleterequest
            }
            axios.post('http://localhost:3000/users/deactivate', request)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Your account is schdeuled for Deletion!");
                    document.getElementById('confirmdel').setAttribute("disabled","disabled");

                }).catch((error) => {
                    toast.error("You account is already scheduled for deletion");
                    document.getElementById('confirmdel').setAttribute("disabled","disabled");
                });

        }
    }

    render() {
        return (
            <div className="canvasdelete">
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="deletebox">
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <div className="icon-box">
                                <i className="material-icons"></i>
                            </div>
                            <h4 className="modal-title w-100">Delete Account?</h4>
                            <div >
                                <p id="deletetext" >You'll permanently loose your</p>
                                <ul class="list-disc inline-block text-left pt-2 ml-2" id="deletelist">
                                    <li>&nbsp;Profile</li>
                                    <li>&nbsp;Tours</li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" onClick={this.confirmFunction} className="btn btn-danger" id="confirmdel">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            // </div>




        )
    }
}
