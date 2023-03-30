import md from 'markdown-it';

export default defineNuxtPlugin(() => {
  const markdown = md();

  const defaultRender =
    markdown.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      tokens[idx]!.attrs![aIndex][1] = '_blank'; // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  return {
    provide: {
      mdRenderer: markdown
    }
  };
});
