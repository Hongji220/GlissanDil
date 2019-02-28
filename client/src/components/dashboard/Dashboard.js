import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import isEmpty from "../../validation/is-empty";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { stat, loading } = this.props.stat;
    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has stats
      if (!isEmpty(stat)) {
        let extTotal = [];
        let multTotal = [];
        for (let i = 0; i < stat.length; i++) {
          console.log(stat[i]);
          if (stat[i].qtype === "extended") {
            extTotal.unshift({
              id: i + 1,
              total: stat[i].total
            });
          } else {
            if (stat[i].qtype === "multiple") {
              multTotal.unshift({
                id: i + 1,
                total: stat[i].total
              });
            }
          }
        }

        dashboardContent = (
          <div className="container">
            <small className="lead text-muted mb-3">
              Welcome Back {user.name}!
            </small>
            <br />
            <br />
            {!isEmpty(extTotal) ? (
              <div className="container d-flex justify-content-center">
                <h2>Extended</h2>
                <LineChart
                  width={400}
                  height={300}
                  data={extTotal}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                </LineChart>
              </div>
            ) : (
              <p />
            )}
            {!isEmpty(multTotal) ? (
              <div className="container d-flex justify-content-center">
                <h2>Multiple</h2>
                <LineChart
                  width={400}
                  height={300}
                  data={multTotal}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                </LineChart>
              </div>
            ) : (
              <p />
            )}
          </div>
        );
      } else {
        //User is logged in but there is no stats
        dashboardContent = (
          <div className="container">
            <p className="lead text-muted">Welcome {user.name} back! </p>
            <p>You don't have any stats yet. Try out a quiz.</p>
            <Link to="/multiple" className="btn btn-lg btn-info mr-2">
              Multiple Choice
            </Link>
            <Link to="/extended" className="btn btn-lg btn-info mr-2 ">
              Extended
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard d-flex  ">
        <div className="container justify-content-center">
          <h1 className="d-flex">Dashboard</h1>
          {dashboardContent}
          {!isEmpty(stat) ? (
            <p className="text-center">These are your statistics</p>
          ) : (
            <p />
          )}
          <p>Contribute to the question pool:</p>
          <Link className="btn btn-info" to="/multiple/add">
            Add Multiple Choice Questions
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  stat: state.profile,
  errors: state.errors
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  stat: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
