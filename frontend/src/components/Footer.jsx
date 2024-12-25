import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {

  return (
   <Container fluid>
    <div className="row">
        <div className="col-12 py-2 text-center">
            <marquee direction="right">
            <b>Designed & Developed by <span className="text-success">Diwa</span></b>
            </marquee>
        </div>
    </div>
   </Container>
  )
}

export default Footer
