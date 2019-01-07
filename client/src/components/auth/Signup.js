import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '../style/SignUp.css'
import { signUp } from '../../store/action/authActions';
import image from '../style/doctor.jpg'
import SweetAlert from 'sweetalert2-react'
import LinearProgress from '@material-ui/core/LinearProgress';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      specialist: "",
      phoneNumber: "",
      email: "",
      password: "",
      clinicName: "",
      clinicNumber: "",
      bio: "",
      location: "",
      show: false,
      progress: false,

    }

  }
  // function to get data from form
  takeValue = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  // funcation to submit data to server and signup
  submitValue = (e) => {
    e.preventDefault()
    this.setState({
      progress:true
    })

    // call sign up function from props that was maped from redux dispatch
    this.props.signUp(this.state)
  }

  //confirm sweet alert 
  onConfirmAlert = () => {
    this.props.history.push('/dashboard/' + this.props.user.id);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md="6" sm="12" id="RightUp">  <img src={image} /> </Col>
            <Col md="6" sm="12">
              <div id="signUpCss">
                <h4 className="text-center">Sign Up </h4>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >First Name</Label>
                      <Input type="text" name="firstName" id="firstName" placeholder="enter your first name" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >Last Name</Label>
                      <Input type="text" name="lastName" id="lastName" placeholder="enter your last name" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >Specialist</Label>
                      <Input type="text" name="specialist" id="specialist" placeholder="enter your specialty" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >Phone Number</Label>
                      <Input type="number" name="phoneNumber" id="phoneNumber" placeholder="enter your phone number" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="enter your Email" value={this.state.value} onChange={this.takeValue} />
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="enter your password" value={this.state.value} onChange={this.takeValue} />
                </FormGroup>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >Clinic Name</Label>
                      <Input type="text" name="clinicName" id="clinicName" placeholder="enetr your clinic name" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Label for="text" >Clinic Number</Label>
                      <Input type="number" name="clinicNumber" id="clinicNumber" placeholder="enter your clinic number" value={this.state.value} onChange={this.takeValue} />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input type="location" name="location" id="location" placeholder="enter your clinic location" value={this.state.value} onChange={this.takeValue} />
                </FormGroup>
                <FormGroup>
                  <Label for="bio">BIO</Label>
                  <Input type="textarea" name="bio" id="bio" placeholder="enter your biography" value={this.state.value} onChange={this.takeValue} />
                </FormGroup>
                <div>
                  <FormGroup>
                    <Button color="primary" id="btn" onClick={this.submitValue}>Sign up</Button>
                  </FormGroup>
                </div>
                <div className="text-center">
                  <a href="/signin">Already have an account ? Login </a>
                </div>
                <div className="text-center" style={{ marginTop: 20 }}>
                  {this.props.userExist &&
                    <Alert color="danger">
                      This user is already exist!
                    </Alert>
                  }
                  <SweetAlert
                    show={this.props.login}
                    title="Confirmation Email"
                    text={"the confirmation Email has been sent to your Email: "+this.props.user.email}
                    onConfirm={this.onConfirmAlert}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.progress && !this.props.userExist && !this.props.login && <LinearProgress></LinearProgress>}
      </div>
    )
  }
}

// map dispatch (actions) from reducer to component props
const mapDipatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user))
  }
}
// map state from reducer to component props
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userExist: state.auth.userExist,
    login: state.auth.login
  }
}

// use connect to pass mapDispatchToprops to reducer
export default connect(mapStateToProps, mapDipatchToProps)(Signup)