import React from 'react'

import { Spin } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"

import './spinner.css'

const Spinner = () => {

   const spinner = <LoadingOutlined style={{ fontSize: 96 }} spin />

     return (
        <div className="spinner">
            <Spin indicator={ spinner } />
        </div>
        
    )
}

export default Spinner