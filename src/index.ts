import { Application } from 'typedoc';

import { InlineSourcesPlugin } from './plugin';

export = (PluginHost: Application) => {
  const app = PluginHost.owner;
  app.converter.addComponent(
    'inline-sources',
    new InlineSourcesPlugin(app.converter)
  );
};
