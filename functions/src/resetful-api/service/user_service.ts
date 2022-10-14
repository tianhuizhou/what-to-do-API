/*
 * User service: define all the services for endpoints
 */
const UserRepository = require('../repository/user_repository')
const pick = require('lodash/pick')

class UserService {
  static async getUserList() {
    return await UserRepository.find_all()
  }

  static async getUserById(id: number) {
    return await UserRepository.find_by_id(id)
  }

  static async getUserByUID(uid: string) {
    return await UserRepository.find_by_uid(uid)
  }

  static createUser(dto: UserModel): void {
    // No open endpoint for creatUser; it is trigger by OAuth
    UserRepository.create(dto)
      .then(() => {
        console.log('User create successfully')
      })
      .catch(() => {
        console.log('Failed to create user')
      })
  }

  static async updateUser(uid: string, body: Partial<{ 'name': string; 'photo_b64': string }>) {
    const payload = pick(body, ['name', 'photo_b64'])
    return await UserRepository.update(uid, payload)
  }

  static deleteUser(uid: string): void {
    // No open endpoint for deleteUser; it is triggered by OAuth
    UserRepository.delete(uid)
      .then(() => {
        console.log('User create successfully')
      })
      .catch(() => {
        console.log('Failed to create user')
      })
  }
}

module.exports = UserService
