import React, { useState} from 'react';
import SanityBlock from '../block-text-serializer';

import ContentWrapper from '../content-wrapper';
import TitleBreadcrumb from './title-breadcrumb';

/*const sanityQuery = `*[_type == "page"][0] {
  ...,
  body[]{
    ...,
    _type == 'reference' => @-> {
      ...,
      blocks[] {
        ...,
        _type == 'reference' => @ -> {
          ...,
          'image': mainImage.asset->url,
          'header': title,
          'link': slug.current
        }
      }
    },
    markDefs[] {
      ...,
      _type == 'internalLink' => {
          'slug': @.reference->slug.current
      },
      _type == 'asset' => {
          'url': @.reference->file.asset->url
      }
    }
  },
  'mainImage': mainImage.asset->url
}`
*/


export default function SanityPage(sanityPagesData, slug) {
  const [title, setTitle] = useState(sanityPagesData.sanityPagesData.title); //eslint-disable-line
  
  /*function handleSubmit() {
    console.log('Submitting...');
  }*/

  return (
    <section>
      <TitleBreadcrumb title={title ? title : 'Registration'} breadcrumbs={[['Home', '/']]} />
      <ContentWrapper width="wide">
        <SanityBlock blocks={sanityPagesData.sanityPagesData.body} />
      </ContentWrapper>
    </section>
  );
}
