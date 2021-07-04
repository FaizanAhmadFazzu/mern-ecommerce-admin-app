import React from 'react'

import { Jumbotron } from "react-bootstrap";
import Layout from '../../components/Layout'

function Home() {
    return (
        <Layout>
            <Jumbotron style={{marginTop: "5rem", backgroundColor: "#fff" }} className="text-center">
                <h1> Welcome to Admin Dashboard</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequatur possimus quod, cum veniam at, minima iure ad dolor fugit ipsa beatae rem vero obcaecati, hic praesentium? Dolorem, accusamus animi ab error aspernatur itaque rerum explicabo expedita assumenda debitis ipsam commodi voluptate distinctio laboriosam tempora cupiditate optio culpa quaerat excepturi!</p>
            </Jumbotron>
        </Layout>
    )
}

export default Home
