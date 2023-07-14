import userPage from '~/pages/users/_id.vue'
import message from '~/pages/users/message/index.vue'
import rentsAsOwner from '~/pages/users/rentsAsOwner/index.vue'
import game from '~/pages/game-list/_id.vue'

it('auth', () => {
  const pages = [userPage, message, rentsAsOwner, game]
  expect(pages).toHaveLength(4)
})
