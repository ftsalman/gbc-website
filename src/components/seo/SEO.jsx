import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'GBC Corporate';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || 'GBC Corporate offers premier business setup, legal advisory, and corporate tax services in the UAE.';
  const metaImage = image || '/images/LOGO_GBC.png';
  const metaUrl = url || 'https://gbccorporate.com/';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />

      {/* OpenGraph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};
