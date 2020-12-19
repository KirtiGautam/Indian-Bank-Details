import React from "react";
import axios from "axios";
import BASE_URL from "../Base";
import $ from "jquery";
import { withRouter } from "react-router-dom";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: [],
      offset: 0,
      limit: 5,
      q: "",
      count: 0,
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.pageDecrementHandle = this.pageDecrementHandle.bind(this);
    this.pageIncrementHandle = this.pageIncrementHandle.bind(this);
    this.getBanks = this.getBanks.bind(this);
  }
  componentDidMount() {
    $("#loader").removeClass("d-none");
    $("#banks").addClass("d-none");
    axios
      .get(
        `${BASE_URL}api/branches/?q=&limit=${this.state.limit}&offset=${this.state.offset}`
      )
      .then((res) => {
        this.setState({ banks: res.data.branches, count: res.data.count });
        $("#loader").addClass("d-none");
        $("#banks").removeClass("d-none");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  ddos = "";
  pageDecrementHandle() {
    let offset = this.state.offset - 1;
    this.setState({ offset });
    this.ddos = setTimeout(this.getBanks, 500);
  }
  pageIncrementHandle() {
    let offset = this.state.offset + 1;
    this.setState({ offset });
    this.ddos = setTimeout(this.getBanks, 500);
  }
  onChangeHandle(e) {
    if ((e.currentTarget.name === "limit") && !e.currentTarget.value > 0) {
      this.setState({
        [e.currentTarget.name]: 1,
        offset: 0,
      });
    } else {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
        offset: 0,
      });
    }
    clearTimeout(this.ddos);
    this.ddos = setTimeout(this.getBanks, 500);
  }
  getBanks() {
    $("#loader").removeClass("d-none");
    $("#banks").addClass("d-none");
    axios
      .get(
        `${BASE_URL}api/branches/?q=${this.state.q}&limit=${this.state.limit}&offset=${this.state.offset}`
      )
      .then((res) => {
        this.setState({ banks: res.data.branches, count: res.data.count });
        $("#loader").addClass("d-none");
        $("#banks").removeClass("d-none");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="m-5 col-12">
            <div className="row">
              <h1 className="font-weight-bold col-12">Bank Branches</h1>
              <div className="col-lg-3">
                <select
                  defaultValue=""
                  className="form-control"
                  name="q"
                  onChange={this.onChangeHandle}
                >
                  <option disabled value="">
                    Select city
                  </option>
                  <option value="Ludhiana">Ludhiana</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Amritsar">Amritsar</option>
                </select>
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text purple lighten-3"
                      id="basic-text1"
                    >
                      <i
                        className="fas fa-search text-white"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <input
                    className="form-control my-0 py-1"
                    name="q"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.q}
                    onChange={this.onChangeHandle}
                  />
                </div>
              </div>
              <div className="col-lg-9"></div>
              <label className="col-lg-3 mt-3">
                Results:
                <input
                  type="number"
                  min="1"
                  name="limit"
                  onChange={this.onChangeHandle}
                  className="form-control mt-2"
                  placeholder="limit"
                  value={this.state.limit}
                />
              </label>
              <table className="col-12 mt-5 table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">IFSC</th>
                    <th scope="col">Bank</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">District</th>
                    <th scope="col">State</th>
                  </tr>
                </thead>
                <tbody id="loader" className="d-none">
                  <tr className="text-center">
                    <td colSpan="8">
                      Loading data...
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody id="banks">
                  {this.state.banks.length > 0 ? (
                    this.state.banks.map((el, index) => (
                      <tr
                        key={el.ifsc}
                        onClick={() =>
                          this.props.history.push(`/banks/${el.ifsc}`)
                        }
                      >
                        <td>
                          {++index + this.state.offset * this.state.limit}
                        </td>
                        <td>{el.ifsc}</td>
                        <td>{el.bank}</td>
                        <td>{el.branch}</td>
                        <td>{el.address}</td>
                        <td>{el.city}</td>
                        <td>{el.district}</td>
                        <td>{el.state}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data to show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="col-12 text-center">
                <button
                  className="btn btn-small"
                  disabled={this.state.offset <= 0}
                  onClick={this.pageDecrementHandle}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <span>
                  {this.state.count === 0 ? 0 : this.state.offset + 1}
                </span>
                /<span>{Math.ceil(this.state.count / this.state.limit)}</span>
                <button
                  className="btn btn-small"
                  disabled={
                    this.state.offset * this.state.limit >= this.state.count
                  }
                  onClick={this.pageIncrementHandle}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
