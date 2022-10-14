import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class TagRepository {
  static async findAll() {
    return await prisma.tag.findMany({})
  }

  static async findAllByQuery(query: string) {
    return await prisma.tag.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    })
  }

  static async findById(tag_id: number) {
    return await prisma.tag.findUnique({
      where: {
        id: tag_id,
      },
      include: {
        tasks: true,
      },
    })
  }

  static async create(tag: { name: string; theme: string }) {
    return await prisma.tag.create({
      data: {
        name: tag.name,
        theme: tag.theme,
      },
    })
  }

  static async update(tag_id: number, args: Partial<{ name: string; theme: string }>) {
    return await prisma.tag.update({
      data: {
        ...args,
      },
      where: {
        id: tag_id,
      },
    })
  }

  static async delete(tag_id: number) {
    await prisma.tag.update({
      data: {
        tasks: { set: [] },
      },
      where: {
        id: tag_id,
      },
    })

    await prisma.tag.delete({
      where: {
        id: tag_id,
      },
    })
  }
}

module.exports = TagRepository
