import { UserRecord } from 'firebase-functions/v1/auth'

const functions = require('firebase-functions')
const UserRepository = require('../firestore-resetful-api/repository/user_repository')

class OAuthService implements FirestoreCollectionEvent {
  onCreate = functions.auth.user().onCreate((user: UserRecord) => {
    const new_user = { name: user.displayName, email: user.email, uid: user.uid }
    return UserRepository.create(new_user)
      .then(() => {
        console.log('User create successfully')
      })
      .catch(() => {
        console.log('Failed to create user')
      })
  })

  onDelete = functions.auth.user().onDelete((user: UserRecord) => {
    return UserRepository.delete(user.uid)
  })
}

module.exports = new OAuthService()
