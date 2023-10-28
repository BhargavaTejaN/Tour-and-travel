import { useEffect, useState } from 'react';
import {Container,Row,Col,Form,Button,FormGroup} from 'reactstrap';
import {Link,useNavigate} from 'react-router-dom';

import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import {BASE_URL} from '../config';
import {useAuthContext} from '../hooks/useContextHook';

const Login = () => {

  const {dispatch} = useAuthContext();

  const navigate = useNavigate();

  const [credentials,setCredentials] = useState({
    email : '',
    password : ''
  });

  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };

  const handleClick = async(e) => {
    e.preventDefault();
    dispatch({type : 'LOGIN_START'})

    try {

      const options = {
        method : "POST",
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(credentials),
        credentials : 'include'
      }

      const response = await fetch(
        `${BASE_URL}/auth/login`,options
      );

      const result = await response.json();

      if(!response.ok){
        console.log("Error While Login");
        alert(result.message)
        return;
      }

      //console.log("result : ",result.data);

      dispatch({
        type : 'LOGIN_SUCCESS',
        payload : result.data
      })

      if(response.ok){
        navigate("/home",{replace : true});
      }

    } catch (error) {
      dispatch({
        type : 'LOGIN_FAILURE',
        payload : error.message
      })
      console.log("Error While Login : ",error);
      throw new Error("Failed To Login " + error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user !== "null" && user !== undefined){
      navigate('/home',{replace : true})
    }
  },[navigate])

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img
                  src={loginImg}
                  alt="loginImg" 
                />
              </div>

              <div className="login__form">
                <div className="user">
                  <img
                  src={userIcon}
                  alt="userIcon"
                  />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
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
                  >Login</Button>
                </Form>
                <p>
                  Don't have An Account?
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;