/*
 * Tag service: define all the services for endpoints
 */
import { BadRequestRestException, NotFoundRestException } from '../../helper/error_exceptions'
const pick = require('lodash/pick')
const TagRepository = require('../repository/tag_repository')

class TagService {
  static async getTagList(query?: string) {
    if (query) return await TagRepository.findAllByQuery(query)
    return await TagRepository.findAll()
  }

  static async getTag(id: number) {
    const tag = await TagRepository.findById(id)
    if (!tag) throw new NotFoundRestException('Tag')
    return tag
  }

  static async createTag(dto: { 'name': string; 'theme': string }) {
    const payload = pick(dto, ['name', 'theme'])
    const tag = await TagRepository.create(payload)
    if (!tag) throw new BadRequestRestException('Tag')
    return tag
  }

  static async updateTag(id: number, dto: Partial<{ 'name': string; 'theme': string }>) {
    const payload = pick(dto, ['name', 'theme'])
    const tag = await TagRepository.update(id, payload)
    if (!tag) throw new BadRequestRestException('Tag')
    return tag
  }

  static async deleteTag(id: number) {
    await TagRepository.delete(id)
  }
}

module.exports = TagService
