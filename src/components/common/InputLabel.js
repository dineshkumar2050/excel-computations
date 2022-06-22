import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function InputLabel({ labelStyle={}, labelClassName='', labelText, htmlFor, ...props}) {
    return (
        <Label style={labelStyle} className={labelClassName} htmlFor={htmlFor}>
            { labelText }
        </Label>
    )
}

const Label = styled.div``

InputLabel.propTypes = {
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    labelText: PropTypes.string,
    htmlFor: PropTypes.string,
}

export default InputLabel
