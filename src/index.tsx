import { MyReact } from './MyReact';

const root = document.getElementById('root');
const title = MyReact.createElement(
  'div',
  { style: 'background: salmon; width: 100px; height: 100px;' },
  MyReact.createElement('h1', {}, 'Hello World')
);
MyReact.render(title, root as HTMLElement);
