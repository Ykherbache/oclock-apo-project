// lists
import listGame from '~/components/lists/ListGames.vue'
import listUser from '~/components/lists/ListMessageByUser.vue'
// Modals
import ConfirmationModal from '~/components/modals/ConfirmationModal.vue'
import ModalForgottenPassword from '~/components/modals/ModalForgottenPassword.vue'
import ModalGameList from '~/components/modals/ModalGameList.vue'
import ModalSignIn from '~/components/modals/ModalSignIn.vue'
import ModalSignUp from '~/components/modals/ModalSignUp.vue'
import ModalUserAddGame from '~/components/modals/ModalUserAddGame.vue'
// sidebars
import UnauthenticatedUserSidebar from '~/components/sidebars/UnauthenticatedUserSidebar.vue'
import UserSidebar from '~/components/sidebars/UserSidebar.vue'
// root components
import CardGame from '~/components/CardGame.vue'
import filterBar from '~/components/FilterBar.vue'
import HomePres from '~/components/HomePres.vue'

// pages
import userPage from '~/pages/users/_id.vue'
import message from '~/pages/users/message/index.vue'
import rentsAsOwner from '~/pages/users/rentsAsOwner/index.vue'
import rentsAsRenter from '~/pages/users/rentsAsOwner/index.vue'
import game from '~/pages/game-list/_id.vue'
import gameList from '~/pages/game-list/index.vue'
import err from '~/pages/_.vue'
import Error500 from '~/pages/Error500.vue'
import index from '~/pages/index.vue'
import legals from '~/pages/legals.vue'

it('name', () => {
  const pages = [
    listGame,
    listUser,
    ConfirmationModal,
    ModalForgottenPassword,
    ModalGameList,
    ModalSignIn,
    ModalSignUp,
    ModalUserAddGame,
    UnauthenticatedUserSidebar,
    UserSidebar,
    CardGame,
    filterBar,
    HomePres,
    userPage,
    message,
    rentsAsOwner,
    rentsAsRenter,
    game,
    gameList,
    err,
    Error500,
    index,
    legals,
  ]
  pages.map((page) => {
    expect(page.name).toBeTruthy()
  })
})
