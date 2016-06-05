import React from 'react';
import * as TestUtils from 'react/lib/ReactTestUtils'; 
import assert from 'power-assert';
import { Editor } from '../dist/umd'; 


describe('Editor', () => {
  describe('props', () => {
    it('renders without problems', () => {
      function handleSubmit(){}
      let editor = TestUtils.renderIntoDocument(<Editor onSubmit={handleSubmit}/>);
      assert(editor);
    });
  });
});
