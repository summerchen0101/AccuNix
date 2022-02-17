import {mount} from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login Test',()=>{
  test('container button',()=>{
    const wrapper = mount(Login)
    expect(wrapper.html).toContain('Sign In')
  })
})