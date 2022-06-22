import React,{ useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BodyWrapper from '../common/BodyWrapper'
import DynamicForm from '../common/DynamicForm'
import * as validators from '../../utils/validation'
import { connect } from 'react-redux';

function Register({ location,match,history, ...props }){
    const { pathname } = location;
    const [isAdmin, setIsAdmin] = useState();
    const [fields, setFields] = useState([])
    const { checkValidName, validateEmail, validatePassword } = validators;

    useEffect(() => {
        if(pathname.includes('/admin')){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    },[])
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        password: '',
        contact: '',
        address: ''
    });
    const [errors, setErrors] = useState({
        nameError: '',
        userIdError: '',
        passwordError: '',
        contactError: '',
        addressError: ''
    });
    const handleErrors = (name,value,fieldsArr) => {
        const isFieldPresent = fieldsArr.find(info => name === info.inputInfo.name)
        let result;
        if(isFieldPresent && isFieldPresent.inputInfo && isFieldPresent.inputInfo.validations){
            if(!isFieldPresent.inputInfo.validations.optional){   
                if(isFieldPresent.inputInfo.validations.customValidator){
                    result = isFieldPresent.inputInfo.validations.customValidator(value) ? true : false;
                }

                if(isFieldPresent.inputInfo.validations.minDigits && isFieldPresent.inputInfo.validations.maxDigits){
                    result = value.length >= isFieldPresent.inputInfo.validations.minDigits && value.length <= isFieldPresent.inputInfo.validations.maxDigits ? true : false;
                } else {
                    if(isFieldPresent.inputInfo.validations.minDigits){
                        result = value.length >= isFieldPresent.inputInfo.validations.minDigits ? true : false;
                    }else if(isFieldPresent.inputInfo.validations.maxDigits){
                        result = value.length <= isFieldPresent.inputInfo.validations.maxDigits ? true : false;
                    } 
                }
            }
        }
        return { result,isFieldPresent }
    }
    const handleChange = (e,arr) => {
        e.preventDefault();
        const { name, value } = e.target;
        const fieldResult = handleErrors(name, value, arr);
        switch(name){
            case 'name':
                if(fieldResult.result){
                    setErrors({ ...errors, nameError: '' })
                } else {
                    setErrors({ ...errors, nameError: fieldResult.isFieldPresent.inputInfo.validations.errorMsg })
                }
                setFormData({ ...formData, name: value });
                break;
            case 'userId':
                if(fieldResult.result){
                    setErrors({ ...errors, userIdError: '' })
                } else {
                    setErrors({ ...errors, userIdError: fieldResult.isFieldPresent.inputInfo.validations.errorMsg })
                }
                setFormData({ ...formData, userId: value });
                break;
            case 'password':
                if(fieldResult.result){
                    setErrors({ ...errors, passwordError: '' })
                } else {
                    setErrors({ ...errors, passwordError: fieldResult.isFieldPresent.inputInfo.validations.errorMsg })
                }
                setFormData({ ...formData, password: value });
                break;
            case 'contact':
                if(fieldResult.result){
                    setErrors({ ...errors, contactError: '' })
                } else {
                    setErrors({ ...errors, contactError: fieldResult.isFieldPresent.inputInfo.validations.errorMsg })
                }
                setFormData({ ...formData, contact: value });
                break;
            case 'address':
                if(fieldResult.result){
                    setErrors({ ...errors, addressError: '' })
                } else {
                    setErrors({ ...errors, addressError: fieldResult.isFieldPresent.inputInfo.validations.errorMsg })
                }
                setFormData({ ...formData, address: value });
                break;
            default:
                break;
        }
    }
    const handleClick = e => {
        e.preventDefault();
        if(isAdmin){
            history.push({
                pathname: '/login/admin'
            })
        } else {
            history.push({
                pathname: '/login/user'
            })
        }
    }
    const fieldsData = [
        {
            inputInfo: {
                type: 'text',
                placeholder: 'Name',
                name: 'name',
                handleChange: handleChange,
                validations: {
                    optional: false,
                    minDigits: 1,
                    maxDigits: null,
                    canBeEmpty: false,
                    emailValidation: false,
                    passwordValidation: false,
                    customValidator: false,
                    errorMsg: `Name cannot be empty` 
                }
            },
            labelInfo: {
                labelText: 'Name',
                labelClassName: 'mb-2'
            }
        },
        {
            inputInfo: {
                type: 'text',
                placeholder: 'User id',
                name: 'userId',
                handleChange: handleChange,
                validations: {
                    optional: false,
                    minDigits: 2,
                    maxDigits: null,
                    canBeEmpty: false,
                    emailValidation: false,
                    passwordValidation: false,
                    customValidator: true,
                    customValidatorFunction: checkValidName,
                    errorMsg: `user id cannot be empty & less than 2 characters` 
                }
            },
            labelInfo: {
                labelText: 'User Id',
                labelClassName: 'mb-2'
            }
        },
        {
            inputInfo: {
                type: 'password',
                placeholder: 'Password',
                name: 'password',
                handleChange: handleChange,
                validations: {
                    optional: false,
                    minDigits: 5,
                    maxDigits: 12,
                    canBeEmpty: false,
                    emailValidation: false,
                    passwordValidation: true,
                    customValidator: true,
                    customValidatorFunction: validatePassword,
                    errorMsg: `password cannot be empty & less than 5 characters & more than 12 characters` 
                }
            },
            labelInfo: {
                labelText: 'Password',
                labelClassName: 'mb-2'
            }
        },
        {
            inputInfo: {
                type: 'text',
                placeholder: 'Contact Number',
                name: 'contact',
                handleChange: handleChange,
                validations: {
                    optional: false,
                    minDigits: 1,
                    maxDigits: 10,
                    canBeEmpty: false,
                    emailValidation: false,
                    passwordValidation: true,
                    customValidator: false,
                    errorMsg: `Contact Number cannot be empty & less than 1 character & more than 10 characters` 
                }
            },
            labelInfo: {
                labelText: 'Contact',
                labelClassName: 'mb-2'
            }
        },
        {
            inputInfo: {
                type: 'text',
                placeholder: 'Address',
                name: 'address',
                handleChange: handleChange,
                validations: {
                    optional: false,
                    minDigits: 1,
                    maxDigits: null,
                    canBeEmpty: false,
                    emailValidation: false,
                    passwordValidation: true,
                    customValidator: false,
                    errorMsg: `Address cannot be empty` 
                }
            },
            labelInfo: {
                labelText: 'Address',
                labelClassName: 'mb-2'
            }
        }
    ]
    useEffect(() => {
        setFields(fieldsData)
    },[])
    return (
        <BodyWrapper className={'Register'}>
            <div className={'h-100 d-flex justify-content-center align-items-center'}>
                {/* <Form> 
                    <h3>Register</h3>
                    <InputField type={'text'} name={'userId'} placeholder={'User id'} handleChange={handleChange} />
                    <InputField type={'password'} name={'password'} placeholder={'Password'} handleChange={handleChange} />
                    <Button handleClick={handleClick} text={'Submit'} />
                </Form> */}
                <DynamicForm
                    fieldsInfo={fieldsData}
                    buttonData={{
                        text: 'Submit',
                        handleClick
                    }}
                />
            </div>
        </BodyWrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.div`
    box-shadow: 0 0 10px #ddd;
    width: 600px;
    padding: 30px 20px;

    @media only screen and (max-width: 650px){
        max-width: calc(100% - 40px);
        margin: 0 auto; 
    }
`;

Register.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object
}

const mapStateToProps = state => ({

})

export default connect( mapStateToProps, {} )(Register)
