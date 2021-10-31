import React from "react";
import PropTypes from 'prop-types'

import { Pagination } from "antd"

import "antd/dist/antd.css"
import "./pagination.css"

const Paginator = (props) => {

    const { total, current, onChangePage } = props
   
    return(
        <div className="pagination">
            <Pagination 
                size="small"
                current={ current }
                total={ Math.ceil(total / 2) }
                onChange = {(evt) => onChangePage(evt)}
            />
        </div>
    )        
}

Paginator.defaultProps = {
    current: 1
}

Paginator.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number,
    onChangePage: PropTypes.func.isRequired
}

export default Paginator