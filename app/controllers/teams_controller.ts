import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import TeamService from '#services/team_service'

import { createTeamValidator } from '#validators/team'
import Team from '#models/team'

@inject()
export default class TeamsController {
  constructor(private teamService: TeamService) {}

  async list({ inertia, auth }: HttpContext) {
    const teams = await this.teamService.list(auth.user as User)
    return inertia.render('teams', { teams })
  }

  async show(ctx: HttpContext) {}

  async create({ request, response }: HttpContext) {
    const { teamName } = await request.validateUsing(createTeamValidator)
    logger.debug(`Creating team ${teamName}`)

    await Team.create({
      name: teamName,
    })

    return response.redirect().toRoute('teams.list')
  }

  async update(ctx: HttpContext) {}

  async delete(ctx: HttpContext) {}
}
