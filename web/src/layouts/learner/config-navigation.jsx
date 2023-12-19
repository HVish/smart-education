import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/learner',
    icon: icon('ic_analytics'),
  },
  {
    title: 'my courses',
    path: '/learner/my-courses',
    icon: <Iconify icon="bxs:videos" />,
  },
];

export default navConfig;
