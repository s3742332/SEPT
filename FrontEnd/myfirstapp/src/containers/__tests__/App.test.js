import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { App } from '../../App'
import { ItalicOutlined } from '@ant-design/icons'
import { Provider } from 'react-redux'
import store from "../../store";
    
describe('App', () => {
  test('renders without crashing given the required props', () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }
    const wrapper = shallow(<Provider store={store}><App {...props} /></Provider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})