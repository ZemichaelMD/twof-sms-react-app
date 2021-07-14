import { Container } from '@material-ui/core'
import React from 'react'

export default function HandleRole(role) {
    if (role === 'admin'){
        return <Container> This is for admin </Container>
    }
    else if (role === 'clerk') {
        return <Container> This is for clerk </Container>
    }
}
