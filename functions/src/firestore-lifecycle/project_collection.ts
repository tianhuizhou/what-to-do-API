/* Define functions that should execute directly in the lifecycle of Firestore Database actions */
import { firestore } from 'firebase-admin'
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot
import { Change } from 'firebase-functions'

const functions = require('firebase-functions')
const isEqual = require('lodash/isEqual')
const omit = require('lodash/omit')

class ProjectCollection implements FirestoreCollectionEvent {
  onUpdate = functions.firestore.document('/projects/{documentId}').onUpdate((snap: Change<QueryDocumentSnapshot>) => {
    const data = omit(snap.after.data(), ['updated_at', 'created_at'])
    const previous_data = omit(snap.before.data(), ['updated_at', 'created_at'])

    // This is crucial to prevent infinite loops.
    if (isEqual(data, previous_data)) return null

    return snap.after.ref.update({ updated_at: new Date().toISOString() })
  })
}

module.exports = new ProjectCollection()
