import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardGame from '../../../components/CardGame.vue'
import { setupTestingVueAndVuetify } from '~/tests/setup'
import {
  textExistsInWrapper,
  transformWrapperToDOM,
} from '~/tests/test-utils/dom-related'

describe('module', () => {
  // The component to test
  test('displays message', () => {
    // mount() returns a wrapped Vue component we can interact with

    const wrapper = shallowMount(CardGame, {
      propsData: {
        game: {
          name: 'gameName',
          description: 'Description',
          image: 'image',
          mechanic_name: 'DiceMech',
          category_name: 'CategName',
          price: 12,
          id: 'id',
        },
        user: {
          pseudo: 'xd',
        },
      },
      computed: {
        pageIsRentsAsRenterOrRentsAsOwner() {
          return true
        },
      },
      ...setupTestingVueAndVuetify(),
    })

    const wrapperHTML = transformWrapperToDOM(wrapper)
    expect(textExistsInWrapper(wrapper, 'gameName')).toBe(true)
  })
})
