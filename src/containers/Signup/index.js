import React, { useState } from 'react'


import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions'

function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const dispatch = useDispatch();


    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    if (user.loading) {
        return <p>Loading...</p>
    }
    return (
        <Layout>
            { user.message }
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </Col>
                            </Row>

                            <Input
                                label="Email address"
                                placeholder="Email address"
                                value={email}
                                type="text"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
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
