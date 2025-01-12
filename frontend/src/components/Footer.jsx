import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {

  return (
   <Container fluid>
    <div className="row">
        <div className="col-12 py-2 text-center">
            <span>Designed & Developed by <span className="text-success">Diwa</span></span>
        </div>
    </div>
   </Container>
  )
}

export default Footer
