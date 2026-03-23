import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

const changePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(8),
    password_confirmation: vine.string().confirmed({ as: 'password_confirmation' }),
  })
)

export default class PasswordChangesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/password_change', {})
  }

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.user!
    const { password } = await request.validateUsing(changePasswordValidator)

    user.password = password
    user.temporaryPassword = false
    await user.save()

    session.flash('success', 'Password successfully updated.')
    return response.redirect('/')
  }
}
