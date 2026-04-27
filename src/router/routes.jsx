import HomePage from '../pages/homepage/HomePage.jsx';
import Fireworks from '../pages/fireworks/Fireworks.jsx';
import NotFound from '../component/notfound/NotFound.jsx'
import FireworksSimulator from '../pages/fireworks2/FireworksSimulator.jsx';
import Dologin from '../pages/dologin/Dologin.jsx';
import Game from '../pages/game/Game.jsx';
import Travel from '../pages/game/Travel.jsx';
import Food from '../pages/game/Food.jsx';

export const routes = [
  {
    path: '/',
    element: <Dologin />,
    title: '登录'
  },
  {
    path: '/login',
    element: <Dologin />,
    title: '登录'
  },
  {
    path: '/home',
    element: <HomePage />,
    title: '这是俺嘞首页'
  },
  {
    path: '/fireworks',
    element: <Fireworks />,
    title: '烟花'
  },
  {
    path: '/fireworks2',
    element: <FireworksSimulator />,
    title: '烟花2'
  },
  // {
  //   path: '/game',
  //   element: <Game />,
  //   title: '游戏',
  // },
  // {
  //   path: '/game/travel',
  //   element: <Travel />,
  //   title: '旅游'
  // },
  // {
  //   path: '/game/food',
  //   element: <Food />,
  //   title: '美食'
  // },
  {
    path: '/game',
    element: <Game />,  // 父页面：菜单 + 返回按钮永远保留
    children: [         // 子页面：只变化内容
      {
        path: 'travel',
        element: <Travel />,
      },
      {
        path: 'food',
        element: <Food />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    title: '页面被偷走了~~'
  }
];