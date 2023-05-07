interface MyElement<P> {
  type: string;
  props: P;
}

export function createElement<P>(
  type: string,
  config: P,
  ...children: Array<MyElement<P> | string>
): MyElement<P> {
  const element = {
    type: type,
    props: {
      ...config,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };

  return element;
}

function createTextElement(text: string): object {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export function render<P extends {}>(
  element: MyElement<P>,
  rootNode: HTMLElement | Text
): void {
  const isTextElement = element.type === 'TEXT_ELEMENT';
  const node = isTextElement
    ? document.createTextNode('')
    : document.createElement(element.type);
  const isProperty = (key: string): boolean => key !== 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => (node[name] = element.props[name]));

  element.props.children.forEach((child: MyElement<P>) => render(child, node));

  rootNode.appendChild(node);
}
