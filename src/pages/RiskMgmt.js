import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import "./RiskMgmt.css";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


class RiskPerTrade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      capital: 50000,
      riskPercentage: 1,
      risk: 1
    };
  }

  handleCapitalChange = (event) => {
    const value = event.target.value;
    this.setState({
      capital: value
    });
  }

  handleRiskPercentageChange = (event) => {
    const value = event.target.value;
    this.setState({
      riskPercentage: value
    });
  }

  handleRiskChange = (event) => {
    const value = event.target.value;
    this.setState({
      risk: value
    });
  }

  render() {
    const { capital, riskPercentage, risk} = this.state;
    const riskAmount = (capital * riskPercentage)/100;
    const quantity = riskAmount / risk;

    const classes = this.props.className;

    return (
      <div>
        <form  noValidate autoComplete="off" className={classes}>
        <TextField
          id="capital"
          required
          label="Enter the capital"
          value={this.state.capital}
          onChange={this.handleCapitalChange}
          className="risk-per-trade-item"
        />

        <TextField
          id="risk-percentage"
          required
          label="Enter the risk percentage"
          value={this.state.riskPercentage}
          onChange={this.handleRiskPercentageChange}
          className="risk-per-trade-item"
        />

      <TextField
          id="risk-amount"
          disabled
          label="Total risked amount"
          value={riskAmount}
          className="risk-per-trade-item"
        />

        <TextField
          id="stoploss"
          required
          label="Enter the stop loss"

          value={this.state.risk}
          onChange={this.handleRiskChange}
          className="risk-per-trade-item"
        />

        <TextField
          id="quantity"
          disabled
          label="Quantity"
          value={quantity}
          className="risk-per-trade-item"
        />
        </form>
      </div>
    );

  }
}
const RiskMgmt = () => {
  const classes = useStyles();

  return <div>
    <h1>Risk Management</h1>
    <RiskPerTrade className={classes.root}/>
  </div>
}

export default RiskMgmt;