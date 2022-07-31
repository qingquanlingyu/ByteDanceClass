const data = {
  item1: 'aa',
  ifShow: true,
  elements: ['one', 'two', 'three']
};
let jsx = createElement(View, {
  id: "main"
}, createElement("ul", {
  className: "list"
}, createElement("li", {
  className: "item",
  style: {
    background: 'blue',
    color: 'pink'
  },
  onClick: () => alert(1)
}, data.item1), createElement("li", {
  className: "item"
}, data.ifShow ? 123 : ""), data.elements.map(item => createElement("li", {
  className: "item"
}, item))), createElement(View, {
  id: "data",
  show: data.ifShow
}, createElement("h2", null, "123")), createElement("button", {
  onclick: () => ViewShow.publish("data")
}, "SHOW"), createElement(List, {
  id: "list",
  textColor: '#fff'
}));
render(jsx, document.getElementById('root'));