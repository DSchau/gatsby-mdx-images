import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import Layout from '../components/layout'

export default function BlogPost({ data }) {
  const { post } = data
  return (
    <Layout>
      <MDXRenderer>{post.code.body}</MDXRenderer>
    </Layout>
  )
}

export const blogPostQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post:mdx(fields: { slug: { eq: $slug }}) {
      code {
        body
      }
    }
  }
`