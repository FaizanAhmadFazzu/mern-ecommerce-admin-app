import React from 'react'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

import { login } from '../../actions'
import { useDispatch } from 'react-redux'

function Signin() {

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault()

        const user = {
            email: "faizan@example.com",
            password: "123456"
        }
        dispatch(login(user));
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop: "50px"}}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
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

export default Signin
