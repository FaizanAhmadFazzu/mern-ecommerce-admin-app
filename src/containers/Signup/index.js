import React from 'react'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

function Signup() {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="First Name"
                                        placeholder="First Name"
                                        value=""
                                        type="text"
                                        onchange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input 
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value=""
                                        type="text"
                                        onchange={() => {}}
                                    />
                                </Col>
                            </Row>

                            <Input 
                                label="Email address"
                                placeholder="Email address"
                                value=""
                                type="text"
                                onchange={() => {}}
                            />

                            <Input 
                                label="Password"
                                placeholder="Password"
                                value=""
                                type="password"
                                onchange={() => {}}
                            />
                
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
