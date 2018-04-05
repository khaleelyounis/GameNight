import React, { Component } from 'react';
import { connect } from 'react-redux';

//HOC which prevents users from accessing lobbies and games if they're not logged in.
export default function (WrappedComponent) {
    class Auth extends Component {

        componentDidMount() {
            if (!this.props.auth) {
                const { origin } = location;
                location.href = `${origin}${'/'}`;
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.auth) {
                const { origin } = location;
                location.href = `${origin}${'/'}`;
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.user.auth
        }
    }

    return connect(mapStateToProps)(Auth);
}