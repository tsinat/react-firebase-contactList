var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];
var _contact_to_edit = [];

var AppStore = assign({}, EventEmitter.prototype, {
    saveContact: function(contact) {
        _contacts.push(contact);
    },
    getContacts: function() {
        return _contacts;
    },
    setContacts: function(contacts) {
        _contacts = contacts;
    },
    removeContact: function(contactId) {
        var index = _contacts.findIndex(x => x.id ===contactId);
        _contacts.splice(index, 1);
    },
    setContactToEdit: function(contact) {
        _contact_to_edit = contact;
    },
    updateContact: function(contact) {
        for(var i=0; i< _contacts.length; i++) {
            if(_contacts[i].id == contact.id) {
                _contacts.splice(i, 1);
                _contacts.push(contact);
            }
        }
    },
    getContactToEdit: function() {
        return _contact_to_edit ;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actonType){
        case AppConstants.SAVE_CONTACT:
            console.log('Saving Contact...');
            // store save
            AppStore.saveContact(action.contact);
            //save to API
            AppAPI.saveContact(action.contact);
            //Emit change
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_CONTACTS:
            console.log('Recieving Contacts...');
            // store save
            AppStore.setContacts(action.contact);

            //Emit change
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_CONTACTS:
            console.log('Removing Contacts...');
            // store remove
            AppStore.removeContact(action.contactId);
            //Remove from API
            AppAPI.removeContact(action.contactId);
            //Emit change
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.EDIT_CONTACT:
            // store remove
            AppStore.setContactToEdit(action.contact);

            //Emit change
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.UPDATE_CONTACTS:
            console.log('updating Contacts...');
            // store update
            AppStore.updateContact(action.contactId);
            //update from API
            AppAPI.updateContact(action.contactId);
            //Emit change
            AppStore.emit(CHANGE_EVENT);
            break;
    }

    return true;
});

module.exports = AppStore;
