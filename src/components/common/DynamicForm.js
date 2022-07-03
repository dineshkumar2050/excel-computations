import React,{ useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'
import InputLabel from './InputLabel'
import styled from 'styled-components'

function DynamicForm({ formWrapperStyle={}, formWrapperClassName='p-4', fieldsInfo=[], buttonData={}, ...props }) {
    const [formData, setFormData] = useState({});
    const [fieldsData, setFieldsData] = useState([])
    useEffect(() => {
        if( fieldsInfo && fieldsInfo.length === 0){
            const handleChange = e => {
                e.preventDefault();
                const { name, value } = e.target;
                switch(name){
                    case 'userId':
                        setFormData({ ...formData, userId: value });
                        break;
                    case 'password':
                        setFormData({ ...formData, password: value });
                        break;
                    default:
                        break;
                }
            }
            
            const fields = [
                {
                    inputInfo: {
                        type: 'text',
                        placeholder: 'Username',
                        name: 'username',
                        handleChange: handleChange
                    },
                    labelInfo: {
                        labelText: 'Username',
                        labelClassName: 'mb-2'
                    }
                },
                {
                    inputInfo: {
                        type: 'password',
                        placeholder: 'Password',
                        name: 'password',
                        handleChange: handleChange
                    },
                    labelInfo: {
                        labelText: 'Password',
                        labelClassName: 'mb-2'
                    }
                }
            ]
            setFieldsData(fields)
        } else {
            setFieldsData(fieldsInfo)
        }
    },[fieldsInfo])
    
    return (
        <Form className={formWrapperClassName} style={formWrapperStyle}>
            {
                fieldsData.map((field,index) => {
                    const { type, placeholder, name, handleChange } = field.inputInfo;
                    const { labelText, labelClassName } = field.labelInfo;
                    return(
                        <div key={index}>
                            <InputLabel 
                                labelText={labelText} 
                                labelClassName={labelClassName} 
                            />
                            <InputField 
                                type={type} 
                                placeholder={placeholder} 
                                name={name} 
                                handleChange={e => handleChange(e,fieldsInfo)} 
                            />
                        </div>
                    )
                })
            }
            <Button
                text={buttonData.text}
                handleClick={buttonData.handleClick}
            />
        </Form>
    )
}

const Form = styled.div`
    width: 500px;
    box-shadow: 0 0 10px #ddd;

    @media only screen and (max-width: 600px){
        width: calc(100% - 40px);
        margin: 0 auto;
    }
`;

DynamicForm.propTypes = {
    formWrapperStyle: PropTypes.object,
    formWrapperClassName: PropTypes.string,
    fieldsInfo: PropTypes.array,
    buttonData: PropTypes.object
}

export default memo(DynamicForm)

