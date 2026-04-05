import vine from '@vinejs/vine'

export const changePasswordValidator = vine.create({
  password: vine.string().minLength(8),
  password_confirmation: vine.string().confirmed({ as: 'password_confirmation' }),
})

export const forgotValidator = vine.create({
  email: vine.string().email(),
})

export const resetValidator = vine.create({
  token: vine.string(),
  password: vine.string().minLength(8),
  password_confirmation: vine.string().confirmed({ confirmationField: 'password' }),
})
