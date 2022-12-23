import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import ErrorMessage from './ErrorMessage'
import { forgotPassword } from '../actions/auth'

const style = (theme) => ({
  root: {
    background: 'linear-gradient(to right, #5390d9, #4ea8de)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    minWidth: '340px',
    maxWidth: '500px',
    padding: theme.spacing.unit * 2
  },
  title: {
    whiteSpace: 'nowrap'
  },
  input: {
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  success: {
    color: 'green'
  }
})

class ForgotPassword extends Component {
  state = {
    email: this.props.auth.email
  };

  validate = () => this.state.email.length > 0;

  handleChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch(forgotPassword(this.state.email))
  };

  render () {
    const { classes } = this.props

    const { sendingResetCode, resetCodeError, resetCodeSent } = this.props.auth

    const validEmail = resetCodeSent ? <Redirect to="/confirm-forgot-password" /> : null

    const errorItem = resetCodeError
      ? (
        <Grid item>
          <ErrorMessage messageId={resetCodeError.id} />
        </Grid>
        )
      : null

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={8}
            >
              <Grid item>
                <Typography variant="h3" className={classes.title}>Password Reset</Typography>
              </Grid>
              <Grid item>
                <Typography>NOTE: When you reset your password, we will send a code to the email address you provide. Once you enter this code, you will be able to select a new password.</Typography>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  id="email"
                  label="Email"
                  autoComplete="username"
                  onChange={this.handleChange}
                />
              </Grid>
              {errorItem}
              <Grid item>
                <Button
                  id="reset-password-btn"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={classes.button}
                  disabled={sendingResetCode || !this.validate}
                >
                  {sendingResetCode ? 'Sending code...' : 'Reset Password'}
                </Button>
              </Grid>
              {validEmail}
              <Grid item>
                <Typography>
                  Remember password? <Link to="/login">Log in here</Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(withStyles(style)(ForgotPassword))
