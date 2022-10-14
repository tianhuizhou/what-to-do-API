import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class UserRepository {
  static async find_all() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photo_b64: true,
        tasks: true,
      },
    })
  }

  static async find_by_id(id: number) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo_b64: true,
        tasks: true,
      },
    })
  }

  static async find_by_uid(uid: string) {
    return await prisma.user.findUnique({
      where: {
        user_uid: uid,
      },
      include: {
        tasks: true,
      },
    })
  }

  static async create(dto: { 'uid': string; 'name': string; 'email': string }) {
    return await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        user_uid: dto.uid,
      },
    })
  }

  static async update(uid: string, args: Partial<{ 'name': string; 'photo_b64': string }>) {
    return await prisma.user.update({
      data: {
        ...args,
      },
      where: {
        user_uid: uid,
      },
    })
  }

  static async delete(uid: string) {
    await prisma.user.update({
      data: {
        tasks: { set: [] },
      },
      where: {
        user_uid: uid,
      },
    })

    await prisma.user.delete({
      where: {
        user_uid: uid,
      },
    })
  }
}

module.exports = UserRepository
