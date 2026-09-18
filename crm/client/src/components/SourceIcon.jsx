import Icon from './Icon.jsx';

// Sources are free-text (an admin can add custom ones in Catalog), so this
// maps known names to a fitting icon and falls back to a generic one
// rather than depending on an emoji stored per-row in the database.
const BY_NAME = {
  Instagram: 'camera',
  Facebook: 'thumbs-up',
  Google: 'search',
  TikTok: 'music',
  YouTube: 'play-circle',
  'Indicação': 'user-plus',
  Site: 'globe',
  WhatsApp: 'message-circle',
  Outros: 'more-horizontal',
};

export default function SourceIcon({ name, size = 16, ...rest }) {
  return <Icon name={BY_NAME[name] || 'more-horizontal'} size={size} {...rest} />;
}
