import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'antd'

import "antd/dist/antd.css"

const AlertMessage = (props) => {
    const { ob } = props
    console.log(ob);
    return(
        <Alert 
            message=""
            type="warning"
            closable
        /> 
    )
}

AlertMessage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    ob: PropTypes.object.isRequired
}
    
    export default AlertMessage


