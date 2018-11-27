import React from 'react';
import PropType from 'prop-types';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

import Disqus from '../components/Disqus/Disqus';
import Layout from '../components/Layout';

const Post = (props) => {
  const { data: { wordpressPost: post } } = props;
  
  return (
    <Layout location={props.location}>
      <Link to="/">Go Back</Link>
      <article>
        <header>
          <div className="background-bar">
            { post.featured_media && (
            <Img
              src={post.featured_media.localFile.childImageSharp.sizes.src}
              sizes={post.featured_media.localFile.childImageSharp.sizes}
              className="img-fluid"
              alt={post.title}
            />
            )}
            <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          </div>
        </header>
        <section className="container-fluid main-body">
          <section className="row">
            <div className="hidden-xs col-sm-1 col-md-2" />
            <div className="col-xs-12 col-sm-10 col-md-8">
              <div className="content-holder">
                <div className="content-description">
                  <div className="author-avatar">
                    <img alt="" src={post.author.avatar_urls.wordpress_48} className="img-circle" />
                  </div>
                  <div className="author-name">
                    <h3>{post.author.name}</h3>
                  </div>
                  <div className="row blog-info">
                    <div className="col-xs-12 col-sm-6">
                      <span className="lead text-muted">
                        <i className="fa fa-clock-o" />
                        {' '}
                        Published:
                        {' '}
                        {post.date}
                      </span>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <span className="lead text-muted">
                        <i className="fa fa-tags" />
                        {post.categories && post.categories.map(category => category.name)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="content-body">
                  <p dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </div>
            <div className="hidden-xs col-sm-1 col-md-2" />
          </section>
        </section>
      </article>
      <Disqus postNode={post} />
    </Layout>
  );
};

Post.propTypes = {
  data: PropType.shape({}).isRequired,
};
export default Post;

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "DD, MMM YYYY")
      categories {
        id
        name
      }
      author {
        name
        description
        avatar_urls{
          wordpress_48
        }
      }
      slug
    }
  }
`;