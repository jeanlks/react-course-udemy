import React from 'react';

export default Option = (props) => {
    return (
        <div>
            <p>{props.option}</p>
            <button onClick={(e) => {
                props.handleDeleteOption(props.option)
            }}>
                remove
            </button>
        </div>
    );
}