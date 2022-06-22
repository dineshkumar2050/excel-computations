import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BodyWrapper from '../common/BodyWrapper';

const  Home = ({ ...props }) => {
    let history = useHistory();
    const perform = (e,type) => {
        e.preventDefault();
        if(type === 'login as user'){
            history.push({
                pathname: '/login/user'
            })
        } else if(type === 'login as admin'){
            history.push({
                pathname: '/login/admin'
            })
        } else if(type === 'register as user'){
            history.push({
                pathname: '/register/user'
            })
        } else if(type === 'register as admin'){
            history.push({
                pathname: '/register/admin'
            })
        }
    }
    return(
        <BodyWrapper>
            <div className={'home h-100 text-center d-flex flex-column justify-content-center align-items-center'}>
                <h1 className={'mb-3'}>Welcome,please login or register to continue</h1>
                <div className={'button'}>
                    <Button className={'mr-3'} onClick={e => perform(e,'login as user')}>Login as user</Button>
                    <Button className={'mr-3'} onClick={e => perform(e,'login as admin')}>Login as Admin</Button>
                    <Button className={'mr-3'} onClick={e => perform(e,'register as user')}>Register as user</Button>
                    <Button onClick={e => perform(e,'register as admin')}>Register as admin</Button>
                </div>
            </div>
        </BodyWrapper>
    )
}

const Button = styled.button`
    background: blue;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff; 

    &.mr-3{
        margin-right: 16px;
    }
`;

Home.propTypes = {

}

export default Home;
