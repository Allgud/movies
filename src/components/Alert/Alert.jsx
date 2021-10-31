import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'antd'

import "antd/dist/antd.css"

const AlertMessage = (props) => {

    const { error, onClose } = props

    return (
        <Alert 
            message={ error.message }
            type="error"
            closable
            afterClose = { onClose }
        /> 
    )

    }

AlertMessage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    error: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}


    
    export default AlertMessage


