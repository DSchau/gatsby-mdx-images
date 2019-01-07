/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") }
    }
  });
};

exports.onCreateNode = function onCreateNode({ actions: { createNodeField }, node, getNode }) {
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async function createPages({ actions: { createPage }, graphql }) {
  const result = await graphql(`
    {
      posts:allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
    .then(res => res.data)

  const postTemplate = path.resolve('src/templates/blog-post.js')

  result.posts.edges.forEach(({ node }) => {
    const { slug } = node.fields
    createPage({
      component: postTemplate,
      path: slug,
      context: {
        slug
      }
    })
  })
}
