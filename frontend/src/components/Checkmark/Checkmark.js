import React, { useState, useEffect } from 'react';
import checkmark from './checkmark.png'
import './checkmark.css'
function Checkmark() {

        return (
            <img className='checkmark' src={checkmark}></img>
        )
}
export default Checkmark
