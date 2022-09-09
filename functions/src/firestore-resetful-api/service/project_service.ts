/*
 * Project service: define all the services for endpoints
 */
import { NotFoundRestException, BadRequestRestException } from '../../helper/error_exceptions'
import Project from '../model/project'
const ProjectRepository = require('../repository/project_repository')

class ProjectService {
  static async getProjectList() {
    return await ProjectRepository.findAll()
  }
  static async getProject(id: number) {
    const project = await ProjectRepository.findById(id)
    if (!project) throw new NotFoundRestException('Project')
    return project
  }
  static async updateProject(id: number, dto: Partial<ProjectModel>) {
    // TODO: better to have validation
    const project = await ProjectRepository.update(id, dto)
    if (!project) throw new BadRequestRestException('Project')
    return project
  }
  static async createProject(dto: Partial<ProjectModel>) {
    // TODO: better to have validation
    const payload = new Project(dto)
    const project = await ProjectRepository.create(payload.sql_dto)

    if (!project) throw new BadRequestRestException('Project')
    return project
  }
  static async deleteProject(id: number) {
    await ProjectRepository.delete(id)
  }
}

module.exports = ProjectService
