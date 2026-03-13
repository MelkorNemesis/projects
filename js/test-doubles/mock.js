const mock = sinon.mock(emailSender);
mock.expects('send').once().withArgs('welcome');