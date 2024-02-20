import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class HeaderComponent extends Component {
    handleLogout = () => {
        localStorage.removeItem('USER_KEY'); // Adjust if your token storage key differs
        this.props.history.push('/login');
    };

    render() {
        const isLoggedIn = !!localStorage.getItem('USER_KEY');
        const isLoginPage = this.props.location.pathname === '/login';

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">Employee Management App</Link>
                        {isLoggedIn && !isLoginPage && ( // Only show logout button if logged in and not on login page
                            <div className="ml-auto">
                                <button onClick={this.handleLogout} className="btn btn-info">Logout</button>
                            </div>
                        )}
                    </nav>
                </header>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);
