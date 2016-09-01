var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Contact = React.createClass({
    render:function() {
        return (
            <tr>
                <td>{this.props.contact.name}</td>
                <td>{this.props.contact.phone}</td>
                <td>{this.props.contact.email}</td>
                <td><a href="#" className='btn btn-default' onClick={this.handleEdit}>Edit</a></td>
                <td><a href="#" className='btn btn-danger' onClick={this.handleRemove}>Delete</a></td>
            </tr>
        )
    }
})

module.exports = Contact;
