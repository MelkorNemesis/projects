const spy = sinon.spy(logger, 'log');
// later
assert(spy.calledWith('User saved'));