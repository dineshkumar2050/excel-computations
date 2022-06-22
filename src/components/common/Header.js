import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import { LOGOUT } from '../../actions/types';

function generateNavBar(isAuthenticated=null, isAdmin=null){
    let arr = [];
    if(isAuthenticated){
        if(isAdmin){
            arr = [
                {
                    path: '/admin/all-users',
                    value: 'All users'
                },
                {
                    path: '/admin/all-cars',
                    value: 'All cars'
                },
                {
                    path: '/admin/transactions',
                    value: 'Transactions'
                }
            ]
        } else {
            arr = [
                {
                    path: '/available-cars',
                    value: 'Available Cars'
                },
                {
                    path: '/book-cars',
                    value: 'Book car'
                }
            ]
        }
    } else {
        arr = [
            {
                path: '/home',
                value: 'Home'
            },
            {
                path: '/login',
                value: 'Login'
            },
            {
                path: '/register',
                value: 'Register'
            }
        ]
    }

    return arr;
}

// function Header({ isAuthenticated, user }){
function Header({ ...props }){
    const [navList, setNavList] = useState([]);
    const history = useHistory();
    useEffect(() => {
        // setNavList(generateNavBar(isAuthenticated, user.isAdmin))
        let arr = [
            {
                path: '/admin/all-users',
                value: 'All users'
            },
            {
                path: '/admin/all-cars',
                value: 'All cars'
            },
            {
                path: '/admin/transactions',
                value: 'Transactions'
            }
        ]
        setNavList(arr)
    },[])
    // },[isAuthenticated,user.isAdmin])
    const logout = e => {
        e.preventDefault();
        // store.dispatch({ type: LOGOUT })
        history.push({
            pathname: '/'
        })
    }
    return(
        <Wrapper>
            <div className={'container-fluid p-3'}>
                <div className='content d-flex align-items-center justify-content-between'>
                    <div className='logo'>
                        <h2 className={'mb-0'}>
                            <span className='d-inline-block text-uppercase' style={{ color: '#fff' }}>
                                <b>
                                    CAR
                                    <GreenText>SERVICE</GreenText>
                                </b>
                            </span>
                        </h2>
                    </div>
                    <div className='navlinks'>
                        <List className={'d-flex align-items-center px-0'}>
                            {
                                navList && navList.length > 0  && navList.map((link,index) => {
                                    return(
                                        <li className={`${index < navList.length - 1 && index > 0 ? 'px-4' : ''}`} key={index}>
                                            <Link to={link.path}>{link.value}</Link>
                                        </li>
                                    )
                                })
                            }
                        </List>
                    </div>
                    {
                        // isAuthenticated &&
                        <div className={'right'}>
                            <LogoutButton className={'bg-primary px-4 py-2'} onClick={logout}>
                                Logout
                            </LogoutButton>
                        </div>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

Header.propTypes = {
    // isAuthenticated: PropTypes.bool,
    // user: PropTypes.object
}

const List = styled.ul`
    list-style: none;
    margin: 0;
`;

const GreenText = styled.span`
    color: green;
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    color: #fff;
    border-radius: 4px;
`;

const Wrapper = styled.div`
    background: #000;
    height: 72px;

    .navlinks ul li a{
        color: #fff;
        text-decoration: none;
    }
`;

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    // user: state.auth.user
})

export default connect(mapStateToProps,{})(Header);
