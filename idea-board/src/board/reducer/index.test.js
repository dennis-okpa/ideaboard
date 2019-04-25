import React from 'react';

import { expect } from 'chai';
import reducer from './';

//Use currying to manipulate the factory function
const fakeMoment = (numericDate='NUMERIC_DATE_VALUE') => () => ({
  format: (option) => {
    switch(option){
      case 'x': {
        return numericDate;
      }
      case 'LLL': {
        return 'STRING_DATE_VALUE';
      }
    }
  }
});

const fakeReducer = reducer(fakeMoment());

describe('test reducer engine', () => {
  beforeEach(() => {
    // reset data
    fakeReducer([], {type:'reset'});
  });
  it('add then delete new idea', () => {
    const state = fakeReducer([], {type:'add'});
    expect(state).to.deep.equal([ { id: 'NUMERIC_DATE_VALUE',
      title: '',
      description: '',
      descCountDown: 50,
      created: 'NUMERIC_DATE_VALUE',
      creationDate: 'STRING_DATE_VALUE',
      lastUpdated: '' } ]);
    expect(fakeReducer(state, {type:'delete', payload:'NUMERIC_DATE_VALUE'})).to.deep.equal([]);
  });
  it('update description', () => {
    expect(fakeReducer(fakeReducer([], {type:'add'})
      , {type:'update', payload: {'id':'NUMERIC_DATE_VALUE', 'description': 'blah', 'title': ''}}))
      .to.deep.equal([ { id: 'NUMERIC_DATE_VALUE',
      title: '',
      description: 'blah',
      descCountDown: 46,
      created: 'NUMERIC_DATE_VALUE',
      creationDate: 'STRING_DATE_VALUE',
      lastUpdated: 'STRING_DATE_VALUE' } ]);
  });
  it('update title', () => {
    expect(fakeReducer(fakeReducer([], {type:'add'})
      , {type:'update', payload: {'id':'NUMERIC_DATE_VALUE', 'description': '', 'title': 'blah'}}))
      .to.deep.equal([ { id: 'NUMERIC_DATE_VALUE',
      title: 'blah',
      description: '',
      descCountDown: 50,
      created: 'NUMERIC_DATE_VALUE',
      creationDate: 'STRING_DATE_VALUE',
      lastUpdated: 'STRING_DATE_VALUE' } ]);
  });
  it('order by title', () => {
    const fakeReducer1 = reducer(fakeMoment(123));

    let state = fakeReducer1([], {type:'add'});
    fakeReducer1(state, {type:'update', payload: {'id':'123', 'description': 'blah', 'title': '3'}});

    const fakeReducer2 = reducer(fakeMoment(321));

    state = fakeReducer2([], {type:'add'});
    fakeReducer2(state, {type:'update', payload: {'id':'321', 'description': 'blah', 'title': '1'}});

    state = fakeReducer(state, {type:'orderByTitle'});

    expect(state[0].id).to.deep.equal(321);
  });
});
