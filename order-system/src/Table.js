import React, { Component } from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { ENDPOINT_URL } from "./constants";

export default class BasicTable extends Component {
  pollInterval = null;

  state = {
    rows: []
  }

  componentDidMount() {
    this.loadRows()

    this.props.loadRowsHook(this.loadRows);

    this.pollInterval = setInterval(this.loadRows, 10000);
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
  }

  loadRows = async () => {
    const { data } = await axios.get(ENDPOINT_URL);

    this.setState({ rows: data });
  }

  render() {
    const { rows } = this.state;

    return <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ name, order }) => <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{order}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  }
}