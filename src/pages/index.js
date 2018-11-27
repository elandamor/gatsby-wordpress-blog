import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
// import get from 'lodash/get'

import Bio from '../components/Bio'
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography'

class Blog extends React.Component {
  render() {
    // const posts = get(this, 'props.data.allWordpressPost.edges');
    // console.log(this.props, { posts });

    // return null;

    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressPost(sort: { fields: [date], order:DESC }) {
              edges {
                node {
                  id
                  title
                  content
                  excerpt
                  date(formatString: "DD, MMM")
                  categories {
                    id
                    name
                  }
                  author{
                    name
                    description
                    avatar_urls{
                      wordpress_48
                    }
                  }
                  slug
                }
              }
            }
          }
        `}
        render={(data) => {
          const posts = data.allWordpressPost.edges;

          return (
            <Layout location={this.props.location}>
            {
              posts.map(({ node }) => {
                const title = node.title
                
                return (
                  <div key={node.slug}>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link style={{ boxShadow: 'none' }} to={node.slug}>
                        {title}
                      </Link>
                    </h3>
                    <small>{node.date}</small>
                    <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  </div>
                )
              })
            }
            </Layout>
          )
        }}
      />
    );
  }
}

export default Blog;