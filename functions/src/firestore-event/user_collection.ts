import { UserRecord } from 'firebase-functions/v1/auth'

/* Define functions that should execute directly in the lifecycle of Firestore Database actions */
const firestore = require('firebase-admin').firestore()
const functions = require('firebase-functions')

class UserCollection implements FirestoreCollectionEvent {
  onCreate = functions.auth.user().onCreate((user: UserRecord) => {
    const new_user = { name: user.displayName, email: user.email, uid: user.uid }
    return firestore.collection('users').doc(user.uid).set(new_user)
  })
}

module.exports = new UserCollection()
