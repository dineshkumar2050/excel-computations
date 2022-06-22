import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function BodyWrapper({ headerHeight=72,footerHeight=0,children,...props }) {
    return (
        <Wrapper style={{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }}>
            <Container>
                { children }
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    overflow-y: scroll;
`;

const Container = styled.div`
    height:100%;
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    &::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #0f6dfa;
    }
`;

BodyWrapper.propTypes = {
    headerHeight: PropTypes.number,
    footerHeight: PropTypes.number,
    children: PropTypes.node
}

export default BodyWrapper
