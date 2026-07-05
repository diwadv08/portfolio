import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {

  return (
   <Container fluid className='bg-dark footer' style={{borderTop:'1px solid var(--bs-black3)'}}>
    <div className="row">
        <div className="col-12 py-5 text-center">
            <p>Designed & Developed by <a href="mailto:diwadv813@gmail.com"><span  className='text-success'>Diwa</span>🤍</a></p>
        </div>
    </div>
   </Container>
  )
}

export default Footer
