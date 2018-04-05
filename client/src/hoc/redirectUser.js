import React, { Component } from 'react';
import { connect } from 'react-redux';

//HOC which redirects users to lobby when they login.
export default function(WrappedComponent, location='/'){
    class Redirect extends Component {

        componentDidMount(){
            if(this.props.auth){
                this.props.history.push(location);
            }
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.auth){
                this.props.history.push(location);
            }
        }

        render(){
            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth
        }
    }

    return connect(mapStateToProps)(Redirect);
}