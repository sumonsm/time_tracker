import React from 'react';
import { Timer } from './Timer';
import { shallow, mount, render } from 'enzyme';

// since Timer is an async component, mock the api call
jest.mock("../../_services/tracked_time.service");

describe('Timer component', () => {
  it('initially runningTime is 0', () => {
    const wrapper = shallow(<Timer />);
    const runningTime = wrapper.state().runningTime;
    expect(runningTime).toEqual(0);
  });

  it('initially history is empty', () => {
    const wrapper = mount(<Timer />);
    const history = wrapper.state('list');
    expect(history).toEqual([]);
  });

  it('timer shows initial value of 0', () => {
    const wrapper = shallow(<Timer />);
    const timerText = wrapper.find('div#timer').text();
    expect(timerText).toEqual('0 seconds');
  });

  it('has expected set of children', () => {
    const wrapper = shallow(<Timer />);
    expect(wrapper.childAt(0).text()).toEqual('0 seconds');
    expect(wrapper.childAt(1).text()).toEqual('<HistoryList />');
  });

    it('HistoryList is mounted', () => {
      const wrapper = shallow(<Timer />);
      const history = wrapper.find('div#history').text();
      expect(history).toEqual('<HistoryList />');
    });

    it('On API response, HistoryList is populated and store is updated', () => {
      const wrapper = mount(<Timer />); // remember to unmount()
      return Promise
            .resolve(wrapper)
            .then(() => {}) // there must be an intermediate then()
            .then(() => {
              wrapper.update()
              expect(wrapper.text()).toContain(["History","120 seconds","180 seconds"].join(''));
              expect(wrapper.state('list')).toEqual([180, 120]);
            });
      wrapper.unmount();
    });

});
