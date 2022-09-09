import { DatabaseConnection } from '../../config/database_connection'

const prisma = DatabaseConnection.getInstance().get_prisma

class ProjectRepository {
  static async findAll() {
    return await prisma.project.findMany()
  }
  static async findById(project_id: number) {
    return await prisma.project.findUnique({
      where: {
        id: project_id,
      },
    })
  }
  static async create(project: Omit<ProjectModel, 'id'>) {
    return await prisma.project.create({
      data: { ...project },
    })
  }
  static async update(project_id: number, args: Partial<Omit<ProjectModel, 'id'>>) {
    return await prisma.project.update({
      data: {
        ...args,
      },
      where: {
        id: project_id,
      },
    })
  }
  static async delete(project_id: number) {
    await prisma.project.delete({
      where: {
        id: project_id,
      },
    })
  }
}

module.exports = ProjectRepository
