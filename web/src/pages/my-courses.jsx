import { Helmet } from 'react-helmet-async';

import { MyCoursesView } from 'src/sections/my-courses/view';

// ----------------------------------------------------------------------

export default function MyCoursesPage() {
  return (
    <>
      <Helmet>
        <title> My Courses </title>
      </Helmet>

      <MyCoursesView />
    </>
  );
}
