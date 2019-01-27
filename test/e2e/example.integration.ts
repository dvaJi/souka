import * as electronPath from 'electron';
import * as path from 'path';
import { Application } from 'spectron';

jest.setTimeout(20000);

describe('Main window', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({
      path: electronPath.toString(),
      args: [path.join(__dirname, '..', '..')]
    });

    return app.start();
  });

  afterEach(() => {
    if (app.isRunning()) {
      return app.stop();
    }
  });

  it('opens the window', async () => {
    const { client, browserWindow } = app;

    await client.waitUntilWindowLoaded();
    const title = await browserWindow.getTitle();

    expect(title).toBe('Souka');
  });
});
