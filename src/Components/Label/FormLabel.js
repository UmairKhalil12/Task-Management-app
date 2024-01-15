import React from 'react'
import './styles.css'

function FormLabel({ text }) {
    return (
        <div>
            <label className='label-form'>{text}</label>
        </div>
    )
}

export default FormLabel;
