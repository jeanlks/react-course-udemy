import React from 'react';

export default Option = (props) => (
        <div className="option"> 
            <p className="option__text">{props.count}. {props.option}</p>
            <button className="button button--link" onClick={(e) => {
                props.handleDeleteOption(props.option)
            }}>
                remove
            </button>
        </div>
);