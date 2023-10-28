import { useState} from 'react';
import {Container,Row,Col,Form,Button,FormGroup} from 'reactstrap';
import {Link,useNavigate} from 'react-router-dom';

import '../styles/login.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import {useAuthContext} from '../hooks/useContextHook';
import {BASE_URL} from '../config';

const Register = () => {

  const {dispatch} = useAuthContext();

  const navigate = useNavigate();

  const [credentials,setCredentials] = useState({
    username : '',
    email : '',
    password : '',
  });

  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };

  const handleClick = async(e) => {
    e.preventDefault();
    try {

      const options = {
        method : "POST",
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(credentials)
      }

      const response = await fetch(
        `${BASE_URL}/auth/register`,options
      );

      await response.json();

      if(!response.ok){
        console.log("response : ",response);
        return alert(response)
      };

      dispatch({
        type : 'REGISTER_SUCCESS'
      })
      navigate('/login',{replace : true});

    } catch (error) {
      console.log("Error While Registering : ",error);
      throw new Error("Failed To Register " + error);
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img
                  src={registerImg}
                  alt="registerImg" 
                />
              </div>

              <div className="login__form">
                <div className="user">
                  <img
                  src={userIcon}
                  alt="userIcon"
                  />
                </div>
                <h2>Signup</h2>

                <Form onSubmit={handleClick}>
                <FormGroup>
                    <input
                      type="text"
                      placeholder='Name'
                      required
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder='Email'
                      required
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder='Password'
                      required
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    className='btn secondary__btn auth__btn'
                  >Signup</Button>
                </Form>
                <p>
                  Already had Account?
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register;