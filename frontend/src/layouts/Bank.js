import React from "react";
import axios from "axios";
import BASE_URL from "../Base";
import { Link } from "react-router-dom";

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifsc: props.match.params.ifsc,
      bank: "",
      branch: "",
      address: "",
      city: "",
      district: "",
      state: "",
    };
    axios
      .get(`${BASE_URL}api/bank/${this.state.ifsc}/`)
      .then((res) => {
        this.setState({ ...res.data.bank });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container mt-5 ml-5">
        <div className="row mt-5 ml-5">
          <div className="col-lg-3"></div>
          <div className="card text-center shadow p-3 mb-5 bg-white rounded mt-5 col-lg-9">
            <div className="card-header">
              <span>
                <Link className="btn btn-lg float-left" to="/">
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </Link>
              </span>
              <h2>Bank Details</h2>
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.state.bank}</h5>
              <p className="card-text row">
                <div className="col-lg-1"></div>
                <table className="table col-lg-10">
                  <tr>
                    <th>IFSC</th>
                    <td>{this.state.ifsc}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>{this.state.ifsc}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      {this.state.address || (
                        <div>
                          Please wait fetching data...
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>
                      {this.state.city || (
                        <div>
                          Please wait fetching data...
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>
                      {this.state.state || (
                        <div>
                          Please wait fetching data...
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>District</th>
                    <td>
                      {this.state.district || (
                        <div>
                          Please wait fetching data...
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bank;
