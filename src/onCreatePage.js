import defaultOptions from './defaultOptions';
import { getNewPage } from './getNewPage';

/**
 * Add context.slug and .langKey for react props
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {Promise} Promise
 */
const onCreatePage = ({ page, boundActionCreators }, pluginOptions) => {
  if (page.context.slug || page.componentPath.indexOf('/pages/') === -1) return null;

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createPage, deletePage } = boundActionCreators;

  return new Promise((resolve, reject) => {

    const newPage = getNewPage(page, options);

    deletePage({ path: page.path });
    createPage(newPage);

    resolve();
  });
};

export {
  onCreatePage
};
