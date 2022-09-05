// /*
//  * User service: define all the services for endpoints
//  */
const UserRepository = require('../repository/user_repository')

class UserService {
  static async find_all() {
    return await UserRepository.find_all()
  }

  static async find_by_id(id: string) {
    return await UserRepository.find_by_id(id)
  }

  static async update(id: string, body: Partial<UserModel>) {
    return await UserRepository.update(id, body)
  }
}

module.exports = UserService
