import React, { Component } from 'react'

export default class forgot extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form action="/forgot" method="POST">
                        <legend>Forgot Password</legend>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" autofocus className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" defaultValue="Reset Password" />
                        </div>
                    </form>
                </div>
            </div>

        )
    }   
}
