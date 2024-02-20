import React, { Component } from 'react';
import './FooterComponent.css'; // Import the CSS file

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">React & Springboot Demo</span>
            </footer>
        );
    }
}

export default FooterComponent;
