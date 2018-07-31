import React from 'react';

export default class Button extends React.Component {
    render() {
        return (
            <button
                style={{ backgroundColor: 'orange' }}
                type="button"
                onClick={() => { this.props.clickHandler() }}>{this.props.name}
            </button>
        )
    }
}