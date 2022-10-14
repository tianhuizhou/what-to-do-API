import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class ProjectRepository {
  static async findAll() {
    return await prisma.project.findMany()
  }

  static async findById(id: number) {
    return await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        boards: {
          include: {
            tasks: {
              include: {
                tags: true,
                users: true,
              },
            },
          },
        },
      },
    })
  }

  static async create(project: {
    name: string
    visibility: string
    description: string
    favorite: boolean
    background: string
  }) {
    return await prisma.project.create({
      data: { ...project },
    })
  }

  static async update(
    id: number,
    args: Partial<{
      name: string
      visibility: string
      description: string
      favorite: boolean
      board_order: []
      background: string
    }>,
  ) {
    return await prisma.project.update({
      data: {
        ...args,
      },
      where: {
        id: id,
      },
    })
  }

  static async delete(id: number) {
    await prisma.project.delete({
      where: {
        id: id,
      },
    })
  }
}

module.exports = ProjectRepository
