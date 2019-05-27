import { assert } from 'chai';

import networkMiddleware from '../src';

describe('network middleware', () => {
  const doDispatch = () => {};
  global.Request = function Request (url) {
    this.url = url;
  };

  const nextHandler = networkMiddleware({ dispatch: doDispatch });

  it('must return a function to handle next', () => {
    assert.isFunction(nextHandler);
    assert.strictEqual(nextHandler.length, 1);
  });

  describe('handle next', () => {
    it('must return a function to handle action', () => {
      const actionHandler = nextHandler();

      assert.isFunction(actionHandler);
      assert.strictEqual(actionHandler.length, 1);
    });

    describe('handle action', () => {
      it('must make network request if payload is a Request object and pass action to next', done => {
        const actionObj = {
          type: 'NETWORK_REQUEST_ACTION',
          payload: new Request('REQUEST_URL'),
        };

        global.fetch = request => {
          assert.instanceOf(request, Request);
          assert.strictEqual(request, actionObj.payload);
          done();
        }

        const actionHandler = nextHandler(action => {
          assert.strictEqual(action, actionObj);
        });

        actionHandler(actionObj);
      });
    });
  });

  describe('handle errors', () => {
    it('must throw if argument is non-object', done => {
      try {
        networkMiddleware();
      } catch (err) {
        done();
      }
    });
  });
});
