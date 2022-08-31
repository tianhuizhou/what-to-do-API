/* Define functions that should execute directly in the lifecycle of Firestore Database actions */
const functions = require('firebase-functions')
const isEqual = require('lodash/isEqual')
const omit = require('lodash/omit')

export const projectCreated = functions.firestore
  .document('/projects/{documentId}')
  .onCreate((doc: any, context: any) => {
    return doc.ref.update({ id: doc.id, created_at: new Date().toISOString() })
  })

export const projectUpdated = functions.firestore
  .document('/projects/{documentId}')
  .onUpdate((snap: any, context: any) => {
    const data = omit(snap.after.data(), ['updated_at'])
    const previous_data = omit(snap.before.data(), ['updated_at'])

    // This is crucial to prevent infinite loops.
    if (isEqual(data, previous_data)) return null

    return snap.after.ref.update({ updated_at: new Date().toISOString() })
  })
