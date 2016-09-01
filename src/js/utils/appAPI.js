var Firebase = require('firebase');
var AppActions = require('../actions/AppActions');

module.exports = {
    saveContact: function(contact) {
        this.firebaseRef = new Firebase('https://contactlist-4c6a5.firebaseio.com/contacts');
        this.firebaseRef.push({
            contact:contact
        });
    },
    getContacts: function() {
        this.firebaseRef = new Firebase('https://contactlist-4c6a5.firebaseio.com/contacts');
        this.firebaseRef.once("value", function(snapshot) {
            var contacts = [];
            snapshot.forEach(function(childSnapshot) {
                var contact = {
                    id: childSnapshot.key(),
                    name: childSnapshot.val().contact.name,
                    phone: childSnapshot.val().contact.phone,
                    email: childSnapshot.val().contact.email
                }
                contacts.push(contact);
                console.log(contacts);
                AppActions.receiveContacts(contacts);
            });
        });
    },
    removeContact: function(contactId) {
        this.firebaseRef = new Firebase('https://contactlist-4c6a5.firebaseio.com/contacts/' + contactId);
        this.firebaseRef.remove();
    }
}
