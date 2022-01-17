import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }œœ

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error.toString()}</p>
                    <br />
                </div>
            );
        }

        return this.props.children
    }
}

export default ErrorBoundary;