/*
 * Project service: define all the services for endpoints
 */
import { BadRequestRestException, NotFoundRestException } from '../../helper/error_exceptions'
const ProjectRepository = require('../repository/project_repository')
const omit = require('lodash/omit')

class ProjectService {
  static async getProjectList() {
    return await ProjectRepository.findAll()
  }
  static async getProject(id: number) {
    const project = await ProjectRepository.findById(id)
    if (!project) throw new NotFoundRestException('Project')
    return project
  }
  static async updateProject(
    id: number,
    dto: Partial<{ name: string; visibility: string; description: string; favorite: boolean; boards: [] }>,
  ) {
    // TODO: better to have validation
    const payload = omit(dto, ['boards'])
    if (dto.boards) {
      payload.boards = {
        set: dto.boards.map((item: BoardModel) => {
          item.id
        }),
      }
    }
    const project = await ProjectRepository.update(id, payload)
    if (!project) throw new BadRequestRestException('Project')
    return project
  }
  static async createProject(dto: { name: string; visibility: string; description: string; favorite: boolean }) {
    // TODO: better to have validation
    const project = await ProjectRepository.create(dto)

    if (!project) throw new BadRequestRestException('Project')
    return project
  }
  static async deleteProject(id: number) {
    await ProjectRepository.delete(id)
  }
}

module.exports = ProjectService
