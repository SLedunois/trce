import vine from '@vinejs/vine'

export const createTeamValidator = vine.create({
  teamName: vine.string(),
})
