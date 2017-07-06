import { RootProjectPage } from './app.po';

describe('root-project App', () => {
  let page: RootProjectPage;

  beforeEach(() => {
    page = new RootProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
