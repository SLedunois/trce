import Team from '#models/team'
import User from '#models/user'

export default class TeamService {
  async list(user: User): Promise<Team[]> {
    if (user.isAdmin) return (await Team.all()).toSorted()

    return []
  }
}
