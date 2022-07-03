import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function InputField({ type, accept, id, name, value, placeholder, handleChange, inputClassName='', inputStyle={}, inputWrapperClassName='mb-3', inputWrapperStyle={}, ...props}) {
    return (
        <Wrapper className={inputWrapperClassName} style={inputWrapperStyle}>
            <Input 
                name={name} 
                id={id}
                type={type} 
                placeholder={placeholder} 
                onChange={handleChange}
                style={inputStyle}
                className={inputClassName}
                value={value}
                accept={accept}    
            />
        </Wrapper>
    )
}

const Wrapper = styled.div``;

InputField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    inputWrapperClassName: PropTypes.string,
    inputWrapperStyle: PropTypes.object,
    handleChange: PropTypes.func,
    value: PropTypes.any,
    accept: PropTypes.string,
}

const Input = styled.input`
    width: 100%;
    padding: 8px 15px;
    border: 1px solid #000;
    border-radius: 3px;

    &:focus,&:hover {
        outline: none;
        box-shadow: none;
    }
`;

export default InputField
