interface Props {
  [key: string]: any;
  children: object[];
}

interface MyElement {
  type: string;
  props: Props;
}

function createElement<P>(
  type: string,
  config: P,
  ...children: Array<MyElement | string>
): MyElement {
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

function render(element: MyElement, rootNode: HTMLElement | Text): void {
  const isTextElement = element.type === 'TEXT_ELEMENT';
  const node = isTextElement
    ? document.createTextNode('')
    : (document.createElement(element.type) as HTMLElement);
  const isProperty = (key: string): boolean => key !== 'children';

  if (node instanceof HTMLElement) {
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((propName) => {
        node.setAttribute(propName, element.props[propName]);
      });
  }

  element.props.children.forEach((child) => render(child as MyElement, node));

  rootNode.appendChild(node);
}

export const MyReact = {
  createElement,
  render,
};
