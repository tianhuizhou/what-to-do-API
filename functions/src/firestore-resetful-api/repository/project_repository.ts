import { DatabaseConnection } from '../../config/database_connection'
import { Project } from '../model/project'
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
  static async create(project: Project) {
    return await prisma.project.create({
      data: project,
    })
  }
  static async update(project: Project, args: Partial<Project>) {
    return await prisma.project.update({
      data: {
        ...args,
      },
      where: {
        id: project.id,
      },
    })
  }
  static async delete(project: Project) {
    await prisma.project.delete({
      where: {
        id: project.id,
      },
    })
  }
}

module.exports = ProjectRepository
