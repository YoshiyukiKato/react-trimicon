import React from 'react';
import * as TestUtils from 'react/lib/ReactTestUtils'; 
import assert from 'power-assert';
import { Editor } from '../dist/index.js'; 


describe('editor', function () {
  it('renders without problems', function () {
    let editor = TestUtils.renderIntoDocument(<Editor/>);
    assert(editor);
  });
});
