import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;    
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.14);
    .card {
        margin-left: auto;
        width: 40%;
        margin-right: auto;
        margin-top: 150px;
    }
    h2 { 
       text-align: center;
       font-weight: 600; 
    }
`;

const TextFieldContainer = styled.div`
    width: 60%;
    margin: auto;
    .field {
        width: 100%;
        input {
            text-align: center;
        }
    }
`;

const ControllsContainer = styled.div`
    margin-top: 20px;
    height: 300px;
    .header .name {
        position: absolute;
    }
    .header .value {
        text-align: right;
    }
`;

const SliderContainer = styled.div`
    margin-top: 40px;
`;

const StrengthContainer = styled.div`
    height: 100px;
    margin-top: 70px;
`;

class PassGenie extends Component {
    state = {
        password: 'rt^266@2',
        maxLength: 64,
        maxDigits: 10,
        maxSymbold: 10,
        length: 12,
        digits: 4,
        symbold: 2
    }

    generatePassword() {
        var pwdChars = 'BASESTRING';
        var pwdLen = 10;
        return Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    }

    render() {
        return (
            <Wrapper>
                <Card className='card'>
                    <CardContent>
                        <Typography component="h2">
                            The Password Genie
                        </Typography>
                        <TextFieldContainer>
                            <TextField
                                className='field'
                                id="outlined-read-only-input"
                                label="Password"
                                defaultValue={this.state.password}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </TextFieldContainer>
                        <ControllsContainer>
                            <StrengthContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Name
                                    </Typography >
                                    <Typography component='span'  className='value'>
                                        Value
                                    </Typography>
                                </div>
                                <LinearProgress color="secondary"  variant="buffer" value={20} valueBuffer={20} />
                            </StrengthContainer>
                            <Divider />
                            <SliderContainer>
                                <div className='header'>
                                    <Typography component='span' className='name'>
                                        Name
                                    </Typography >
                                    <Typography component='span'  className='value'>
                                        Value
                                    </Typography>
                                </div>
                                <Slider
                                    value={50}
                                    aria-labelledby="label"
                                />
                            </SliderContainer>
                        </ControllsContainer>
                    </CardContent>
                </Card>
            </Wrapper>
        );
    }
}

export default PassGenie;
