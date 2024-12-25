import React from 'react'
import { Row,Container,Col} from 'react-bootstrap';
function Login() {
  return (
        <Container className='w-75 my-5' style={{height:"450px"}}>
            <div className='row bg-dark p-5 text-light' style={{borderRadius:"30px",boxShadow:"0px 0px 30px grey"}}>
                <div className="col-12">
                    <h1>Login Form</h1>
                </div>
                <div className="col-12">
                    <form>
                        <div className="col-12 my-4">
                            <label htmlFor="">User Name</label>
                            <input type="text" className='form-control' placeholder='Enter User Name' />
                        </div>
                        <div className="col-12 my-4">
                            <label htmlFor="">Password</label>
                            <input type="text" className='form-control' placeholder='Enter Password' />
                        </div>
                        <div className="col-12 mt-5 mb-4">
                            <input type="submit" className='btn btn-success form-control' />
                        </div>
                    </form>
                </div>
            </div>
        </Container>
  )
}

export default Login
