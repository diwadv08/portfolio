import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {

  return (
   <Container fluid className='bg-dark footer' style={{borderTop:'1px solid var(--bs-black3)'}}>
    <div className="row">
        <div className="col-12 py-5 text-center">
            <b>Designed & Developed by <span className="text-success">Diwa</span></b>
        </div>
    </div>
   </Container>
  )
}

export default Footer
