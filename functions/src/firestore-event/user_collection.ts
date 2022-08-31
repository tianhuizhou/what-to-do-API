/* Define functions that should execute directly in the lifecycle of Firestore Database actions */
const firestore = require('firebase-admin').firestore()
const functions = require('firebase-functions')

// create a document in user-collection if the user is just created
export const userCreated = functions.auth.user().onCreate((user: any) => {
  const new_user = { name: user.displayName, email: user.email, uid: user.uid }
  return firestore.collection('users').doc(user.uid).set(new_user)
})
