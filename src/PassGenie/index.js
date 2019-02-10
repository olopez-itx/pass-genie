import React, { Component } from "react";
import _ from "lodash";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RefreshIcon from "@material-ui/icons/Refresh";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";

import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/lab/Slider";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 99%;
  height: 98%;
  position: absolute;
  background: #55efc4;
  .card {
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
  h2 {
    text-align: right;
    font-weight: bolder;
    font-size: 1.5em;
  }
`;

const PasswordFieldContainer = styled.div`
  width: 98%;
  margin: auto;
  .field {
    width: 100%;
    input {
      text-align: center;
    }
  }
`;

const ControlsContainer = styled.div`
  height: 300px;
  .header .name {
    position: absolute;
  }
  .header .value {
    text-align: right;
  }
`;

const StrengthContainer = styled.div`
  height: 100px;
  margin-top: 40px;
`;

const SliderContainer = styled.div`
  margin-top: 40px;
`;

class PassGenie extends Component {
  MIN_LENGTH = 12;
  MAX_LENGTH = 64;
  MIN_DIGITS = 4;
  MAX_DIGITS = 10;
  MIN_SYMBOLS = 2;
  MAX_SYMBOLS = 10;

  state = {
    password: " ",
    showPassword: true,
    length: this.MIN_LENGTH,
    digits: this.MIN_DIGITS,
    symbols: this.MIN_SYMBOLS,
    strength: 0,
    copied: false
  };

  onShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onCopyPassword = () => {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", this.state.password);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    this.setState({ copied: true });
  };

  onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ copied: false });
  };

  // onChangeSlider = slider => (event, value) => {
  // this.setState({
  //   [slider]: value
  // });
  // this.calculate();
  // };

  guardLengthSlider = (event, value) => {
    if (value >= this.state.digits + this.state.symbols) {
      this.changeSlider("length", value);
    }
  };

  guardDigitsSlider = (event, value) => {
    if (value + this.state.symbols <= this.state.length) {
      this.changeSlider("digits", value);
    }
  };

  guardSymbolsSlider = (event, value) => {
    if (value + this.state.digits <= this.state.length) {
      this.changeSlider("symbols", value);
    }
  };

  changeSlider = (slider, value) => {
    this.setState({
      [slider]: value
    });
    this.calculate();
  };

  calculate = () => {
    this.setState({
      password: this.generatePassword(),
      strength: this.calculateStrength()
    });
  };

  randomDigit = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  randomSymbol = () => {
    const symbols = "!@#$%^&*()_+-{}[]|;:/?.,<>".split("");
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  randomLetter = () => {
    const TO_LOWER_OFFSET = 32;
    const UPPER_A = 65;
    const UPPER_Z = 90;

    return String.fromCharCode(
      this.randomDigit(UPPER_A, UPPER_Z) +
        (Math.random() >= 0.5 ? TO_LOWER_OFFSET : 0)
    );
  };

  generatePassword = () => {
    const pwDigits = Array.from(
      Array(this.state.digits),
      this.randomDigit.bind(null, 0, 9)
    );
    const pwSymbols = Array.from(Array(this.state.symbols), this.randomSymbol);

    const remainingLength =
      this.state.length - (this.state.digits + this.state.symbols);
    const pwLetters = Array.from(Array(remainingLength), this.randomLetter);

    return [...pwDigits, ...pwSymbols, ...pwLetters]
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  calculateStrength = () =>
    (this.state.length * 0.35) / this.MAX_LENGTH +
    (this.state.digits * 0.25) / this.MAX_DIGITS +
    (this.state.symbols * 0.4) / this.MAX_SYMBOLS;

  render() {
    return (
      <Wrapper>
        <Card className="card">
          <CardContent>
            <Typography component="h2">
              <span role="img" aria-label="music">
                🎸🎶🎵
              </span>
              Oh yeah yeah!
              <span role="img" aria-label="music">
                🎸🎶🎵
              </span>
            </Typography>
            <PasswordFieldContainer>
              <TextField
                id="outlined-adornment-password"
                className="field"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label="Password"
                margin="normal"
                value={this.state.password}
                onChange={this.onPasswordChange}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.onShowPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Generate another password"
                        onClick={this.calculate}
                      >
                        <RefreshIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Copy password to clipboard"
                        onClick={this.onCopyPassword}
                      >
                        <CopyIcon />
                      </IconButton>
                      <Snackbar
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left"
                        }}
                        open={this.state.copied}
                        autoHideDuration={3000}
                        onClose={this.onSnackBarClose}
                        ContentProps={{
                          "aria-describedby": "message-id"
                        }}
                        message={<span id="message-id">Password copied!</span>}
                        action={
                          <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.onSnackBarClose}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                      />
                    </InputAdornment>
                  )
                }}
              />
            </PasswordFieldContainer>
            <ControlsContainer>
              <StrengthContainer>
                <div className="header">
                  <Typography component="span" className="name">
                    Strength
                  </Typography>
                  <Typography component="span" className="value">
                    {this.state.strength.toLocaleString("en", {
                      style: "percent"
                    })}
                  </Typography>
                </div>
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.strength * 100}
                />
              </StrengthContainer>
              <Divider />
              <SliderContainer>
                <div className="header">
                  <Typography component="span" className="name">
                    Length
                  </Typography>
                  <Typography component="span" className="value">
                    {this.state.length}
                  </Typography>
                </div>
                <Slider
                  value={this.state.length}
                  min={this.MIN_LENGTH}
                  max={this.MAX_LENGTH}
                  step={1}
                  aria-labelledby="label"
                  onChange={_.throttle(this.guardLengthSlider, 200, {
                    leading: false,
                    trailing: true
                  })}
                />
              </SliderContainer>
              <SliderContainer>
                <div className="header">
                  <Typography component="span" className="name">
                    Digits
                  </Typography>
                  <Typography component="span" className="value">
                    {this.state.digits}
                  </Typography>
                </div>
                <Slider
                  value={this.state.digits}
                  min={this.MIN_DIGITS}
                  max={this.MAX_DIGITS}
                  step={1}
                  aria-labelledby="label"
                  onChange={_.throttle(this.guardDigitsSlider, 200, {
                    leading: false,
                    trailing: true
                  })}
                />
              </SliderContainer>
              <SliderContainer>
                <div className="header">
                  <Typography component="span" className="name">
                    Symbols
                  </Typography>
                  <Typography component="span" className="value">
                    {this.state.symbols}
                  </Typography>
                </div>
                <Slider
                  value={this.state.symbols}
                  min={this.MIN_SYMBOLS}
                  max={this.MAX_SYMBOLS}
                  step={1}
                  aria-labelledby="label"
                  onChange={_.throttle(this.guardSymbolsSlider, 200, {
                    leading: false,
                    trailing: true
                  })}
                />
              </SliderContainer>
            </ControlsContainer>
          </CardContent>
        </Card>
      </Wrapper>
    );
  }
}

export default PassGenie;
