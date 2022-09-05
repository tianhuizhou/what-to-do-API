import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

const UserCollection = require('firebase-admin').firestore().collection('users')

class UserRepository {
  static async find_all() {
    const query_snapshot = await UserCollection.get()
    const user_list: UserModel[] = []
    query_snapshot.forEach((doc: QueryDocumentSnapshot) => {
      user_list.push(<UserModel>doc.data())
    })
    return user_list
  }

  static async find_by_id(id: string) {
    const user = await UserCollection.doc(id).get()
    return user.data()
  }

  static async update(id: string, body: Partial<UserModel>) {
    await UserCollection.doc(id).set({ name: body.name }, { merge: true })
    return await this.find_by_id(id)
  }
}

module.exports = UserRepository
