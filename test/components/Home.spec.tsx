import * as React from 'react';
import { shallow } from 'enzyme';

// TODO: PLS
import Home from '../../src/components/Home';

describe('Home component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeTruthy();
  });
});
