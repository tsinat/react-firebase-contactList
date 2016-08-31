var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var AddForm = React.createClass({
    render: function() {
        return (
            <div className='well'>
              <h3>Add Contact</h3>
              <form>
                  <div className='form-group'>
                      <input type='text' ref='name' className='form-control' placeholder='Add contact Name...'/>
                  </div>
                  <div className='form-group'>
                      <input type='text' ref='name' className='form-control' placeholder='Add contact Phone...'/>
                  </div>
                  <div className='form-group'>
                      <input type='text' ref='email' className='form-control' placeholder='Add contact email...'/>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
              </form>
            </div>
        );
    },
    handleSubmit : function(e) {
        e.preventDefault();

        var contact = {
            name: this.refs.name.value.trim(),
            phone: this.refs.phone.value.trim(),
            email: this.refs.email.value.trim()
        }

        AppActions.saveContact(contact); 
    }
});

module.exports = AddForm;
