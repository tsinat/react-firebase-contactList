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
                <td><a href="#" className='btn btn-default' onClick={this.handleEdit.bind(this, this.props.contact)}>Edit</a></td>
                <td><a href="#" className='btn btn-danger' onClick={this.handleRemoved.bind(this, this.props.contact.id)}>Delete</a></td>
            </tr>
        )
    },
    handleRemove(i, j) {
        AppActions.removeContact(i);
    },
    handeEdit(contact) {
        AppActions.editContact(contact);
    }
})

module.exports = Contact;
