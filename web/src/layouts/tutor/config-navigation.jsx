import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/tutor',
    icon: icon('ic_analytics'),
  },
  {
    title: 'my courses',
    path: '/tutor/my-courses',
    icon: <Iconify icon="bxs:videos" />,
  },
];

export default navConfig;
