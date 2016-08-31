var AppActions = require('../actions/AppActions');
var Firebase = require('firebase');

module.exports = {
    saveContact: function(contact) {
        this.firebaseRef = new Firebase('https://console.firebase.google.com/project/contactlist-4c6a5/database/data');
        this.firebaseRef.push({
            contact:contact
        });
    },
    getContacts: function() {
        this.firebaseRef = new Firebase('https://console.firebase.google.com/project/contactlist-4c6a5/database/data');
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
                AppActions.receiveContacts(contacts);
            })
        });
    }
}
