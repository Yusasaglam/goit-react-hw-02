import React from 'react'
import './Option.css'

function Options({ options, onLeaveFeedback, showReset, onReset }) {

    return (
        <div>

            {options.map((option) => (
                <button className='allButton' key={option} onClick={() => onLeaveFeedback(option)}>
                    <span className='button'> {option} </span>
                </button>
            ))}

            {showReset && (
                <button onClick={onReset} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                    Reset
                </button>
            )}

        </div>
    );
}

export default Options;