import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    date: 2010,
    total: 10
  },
  {
    date: 2011,
    total: 20
  },
  {
    date: 2012,
    total: 23
  },
  {
    date: 2013,
    total: 40
  },
  {
    date: 2014,
    total: 64
  },
  {
    date: 2015,
    total: 60
  },
  {
    date: 2016,
    total: 32
  }
];

export default class Example extends PureComponent {
  render() {
    return (
      <div className="container d-flex justify-content-center">
        <legend>Extended</legend>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
        <legend>Multiple</legend>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
