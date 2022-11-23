import useAuth from 'app/hooks/useAuth'
import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {countries} from '../../../utils/_data/countries'
import {industries} from '../../../utils/_data/industries'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const { register } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = (event) => {
        try {
            // return false;
            register(state)
        } catch (e) {
            console.log(e)
        }
    }

    let { name, email, password, phone, company, industry, country, isTermsAnDConditionsAccepted, confirmPassword } = state

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/illustrations/logo.png"
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box p={4} height="100%">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    value={name || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'This field is required',
                                        'email is not valid',
                                    ]}
                                />

                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Phone"
                                    onChange={handleChange}
                                    type="number"
                                    name="phone"
                                    value={phone || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Company"
                                    onChange={handleChange}
                                    type="text"
                                    name="company"
                                    value={company || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <FormControl sx={{ mb: 3, width: '100%' }}>
                                    <InputLabel>Industry</InputLabel>
                                    <Select
                                    value={industry}
                                    size="small"
                                    onChange={handleChange}
                                    autoWidth
                                    label="Industry"
                                    name="industry"
                                    >
                                    {industries.length && industries.map((e, i) => {
                                        return( <MenuItem key={i} value={e}>{e}</MenuItem>)
                                    })}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ mb: 3, width: '100%' }}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                    value={country}
                                    size="small"
                                    onChange={handleChange}
                                    autoWidth
                                    name="country"
                                    label="country"
                                    >
                                    {countries.length && countries.map((e, i) => {
                                        return( <MenuItem key={i} value={e}>{e.name}</MenuItem>)
                                    })}
                                    </Select>
                                </FormControl>

                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />


                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword || ''}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <FormControlLabel
                                    sx={{ mb: '16px' }}
                                    name="isTermsAnDConditionsAccepted"
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'isTermsAnDConditionsAccepted',
                                                value: e.target.checked,
                                            },
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={isTermsAnDConditionsAccepted || false}
                                        />
                                    }
                                    label="I have read and agree to the terms of service."
                                />
                                <FlexBox>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Sign up
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/session/signin")}
                                    >
                                        Sign in
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </JWTRegister>
    )
}
export default JwtRegister