import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'antd'

import "antd/dist/antd.css"

const AlertMessage = (props) => {

    const { error } = props

    return (
        <Alert 
            message={ error.message }
            type="error"
            closable
        /> 
    )

    }

AlertMessage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    error: PropTypes.object.isRequired
}


    
    export default AlertMessage


