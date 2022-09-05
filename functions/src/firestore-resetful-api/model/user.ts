/*
 * User Schema for Database
 *
 * */
class User implements UserModel {
  readonly uid: string
  email: string
  name: string

  constructor(args: UserModel) {
    this.uid = args.uid || ''
    this.name = args.name || ''
    this.email = args.email || ''
  }
}

module.exports = User
