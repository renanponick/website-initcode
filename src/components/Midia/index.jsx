import PropTypes from 'prop-types';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

const networks = [
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCdHlZugvc3w3hfHBSTLTD5w?sub_confirmation=1', Icon: FaYoutube },
  { name: 'GitHub', url: 'https://github.com/initcodeexemplos', Icon: FaGithub },
  { name: 'Instagram', url: 'https://www.instagram.com/init_code', Icon: FaInstagram },
  { name: 'Facebook', url: 'https://www.facebook.com/people/Init-Code/61556939284040/', Icon: FaFacebook },
  { name: 'TikTok', url: 'https://www.tiktok.com/@init.code', Icon: FaTiktok },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/renan-ponick-9107a5174/', Icon: FaLinkedin },
];

export default function Midia({ size = 28 }) {
  return (
    <ul className="social-links" aria-label="Redes sociais da Init Code">
      {networks.map(({ name, url, Icon }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} da Init Code (abre em nova aba)`}>
            <Icon size={size} aria-hidden="true" focusable="false" />
          </a>
        </li>
      ))}
    </ul>
  );
}

Midia.propTypes = { size: PropTypes.number };
