import NewsLandingPage from "../pages/newslandingpage/NewsLandingPage";
import Register from "../auth/registeration/Register";
import Login from "../auth/login/Login";
import DinaTalksDashboard from "../components/dinatalksdashboard/DinaTalksDashboard";
import PublishBlog from "../components/publishblog/PublishBlog";

const NEWS_UPDATES_ROUTES = [
  {
    path: '',
    element: <NewsLandingPage />,
    children: [
      {
        path: '/',
        element: <NewsLandingPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login/>,
  },

  {
    path:'/dinatalksdashboard',
    element: <DinaTalksDashboard/>
  },
  {
    path: '/create',
    element: <PublishBlog/>
  }
];
export default NEWS_UPDATES_ROUTES;