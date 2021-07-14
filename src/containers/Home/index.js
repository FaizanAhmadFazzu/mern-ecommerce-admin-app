import React from 'react'

import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import Layout from '../../components/Layout'

import './style.css'

function Home() {
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        Sidebar
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>
                        Dashboard
                    </Col>
                </Row>
            </Container>

            {/* <Jumbotron style={{marginTop: "5rem", backgroundColor: "#fff" }} className="text-center">
                <h1> Welcome to Admin Dashboard</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequatur possimus quod, cum veniam at, minima iure ad dolor fugit ipsa beatae rem vero obcaecati, hic praesentium? Dolorem, accusamus animi ab error aspernatur itaque rerum explicabo expedita assumenda debitis ipsam commodi voluptate distinctio laboriosam tempora cupiditate optio culpa quaerat excepturi!</p>
            </Jumbotron> */}
        </Layout>
    )
}

export default Home
