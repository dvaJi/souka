import { shallow } from 'enzyme';
import * as React from 'react';

// TODO: PLS
import Home from '../../src/components/Home';

describe('Home component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeTruthy();
  });
});
