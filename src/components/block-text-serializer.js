/** @jsx jsx */
//import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Styled, jsx } from 'theme-ui';
import urlFor from '../lib/sanityImg';
import { Form, validation } from '@newfrontdoor/form';
//import Form from './form';
import PropTypes from 'prop-types';

const CustomStyleSerializer = ({ children }) => {
  return <Styled.p>{children}</Styled.p>;
};

CustomStyleSerializer.propTypes = {
  children: PropTypes.string.isRequired
};

const AnchorSerializer = ({ children, mark }) => {
  return <span id={mark.id}>{children}</span>;
};

AnchorSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.object.isRequired
};

const ImageSerializer = ({ node }) => {
  return <img src={urlFor(node).url()} alt=""/>;
};

ImageSerializer.propTypes = {
  node: PropTypes.node.isRequired
};

const FormSerializer = ({ node }) => {
  return (
    <Form
      {...node}
      validationFn={values => validation(values, node)}
      blockText={val => <BlockText blocks={val} />}
      submitForm={values => console.log(values)}
    />
  );
};

FormSerializer.propTypes = {
  node: PropTypes.object.isRequired
};

const RegistrationFormSerializer = ({ node }) => {
  return (
    <Form
      {...node}
      validationFn={values => validation(values, node)}
      blockText={val => <BlockText blocks={val} />}
      submitForm={values => console.log(values)}
    />
  );
};

RegistrationFormSerializer.propTypes = {
  node: PropTypes.object.isRequired
};

const AssetSerializer = ({ mark, children }) => (
  <a href={mark.url}>
    <Styled.a>{children}</Styled.a>
  </a>
);

const InternalLinkSerializer = ({ mark, children }) => (
  <a href={mark.slug}>{children}</a>
);

const ExternalLinkSerializer = ({ mark, children }) => (
  <a href={mark.href} rel="noreferrer noopener" target="_blank">{children}</a>
);

AssetSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

InternalLinkSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired
};

ExternalLinkSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.shape({
    href: PropTypes.string
  }).isRequired
};

const BlockRenderer = props => {
  const style = props.node.style || 'normal';

  const elements = {
    h1: <Styled.h1>{props.children}</Styled.h1>,
    h2: <Styled.h2>{props.children}</Styled.h2>,
    h3: <Styled.h3>{props.children}</Styled.h3>,
    h4: <Styled.h4>{props.children}</Styled.h4>,
    h5: <Styled.h5>{props.children}</Styled.h5>,
    h6: <Styled.h6>{props.children}</Styled.h6>
  };

  if (/^h\d/.test(style)) {
    return elements[style];
  }

  if (style === 'blockquote') {
    return <blockquote>- {props.children}</blockquote>;
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

BlockRenderer.propTypes = {
  children: PropTypes.any,
  node: PropTypes.object.isRequired
};

const BlockText = ({ blocks }) => {
  return (
    <BlockContent
      sx={{
        lineHeight: '26px'
      }}
      blocks={blocks}
      serializers={{
        types: {
          block: BlockRenderer,
          p: CustomStyleSerializer,
          form: FormSerializer,
          image: ImageSerializer,
          RegistrationForm: RegistrationFormSerializer
        },
        marks: {
          anchor: AnchorSerializer,
          internalLink: InternalLinkSerializer,
          link: ExternalLinkSerializer,
          asset: AssetSerializer
        }
      }}
    />
  );
};

BlockText.propTypes = {
  blocks: PropTypes.array.isRequired
};

export default BlockText;
