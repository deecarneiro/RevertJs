// import React from 'react'
// import { render } from 'react-dom'

function convertToHTML ($virtualNode) {

  if(typeof $virtualNode === 'string'){
    return document.createTextNode($virtualNode)
  }
    const $domElement = document.createElement($virtualNode.tagName)

    $virtualNode.props.children.forEach(($virtualChild) => {
      $domElement.appendChild(convertToHTML($virtualChild))
    });

    return $domElement
}

function render (initialVirtualTree, $domRoot) {
  const $appHtml = convertToHTML(initialVirtualTree)
  $domRoot.appendChild($appHtml)
}

function createElement (elementType, props, ...children) {
  console.log(elementType, props, ...children)

  const virtualElementProps = {
    ...props,
    children
  }

  if (typeof elementType === 'function') {
    return elementType(props)
  }

  return {
    tagName: elementType,
    props: virtualElementProps
  }
}

const React = {
  createElement
}

// ====================================

function Title(){
  return  React.createElement('h1', null, 'Contador')

}

function App (props) {
  return React.createElement(
    'section',
    {
      className: 'App'
    },
    React.createElement(Title, null),
    React.createElement('div', null),
    React.createElement('div', null, '0'),
    React.createElement('button', null, 'Incrementar'),
    React.createElement('button', null, 'Decrementar')
  )
  // return (
  //   <section className='App'>
  //     <h1>Counter</h1>
  //     <div>
  //       <div>0</div>
  //       <button>Incrementar</button>
  //       <button>Decrementar</button>
  //     </div>
  //   </section>
  // )
}

render(React.createElement(App, null), document.querySelector('#root'))
