import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Init Code`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    const setSocialMeta = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setSocialMeta('og:title', `${title} | Init Code`);
    setSocialMeta('og:description', description);
  }, [description, title]);

  return null;
}

PageMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

