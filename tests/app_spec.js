import React from 'react';
import * as TestUtils from 'react/lib/ReactTestUtils'; //I like using the Test Utils, but you can just use the DOM API instead.
import assert from 'power-assert';
import { Editor } from '../index.js'; //my root-test lives in components/__tests__/, so this is how I require in my components.

describe('editor', function () {
  it('renders without problems', function () {
    let editor = TestUtils.renderIntoDocument(<Editor/>);
    assert(editor);
  });
});
