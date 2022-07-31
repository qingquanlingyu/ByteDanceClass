const data = {
    item1: 'aa',
    ifShow: true,
    elements: ['one', 'two', 'three']
}

let jsx =
    <View id="main">
        <ul className="list">
            <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(1)}>{data.item1}</li>
            <li className="item">{data.ifShow ? 123 : ""}</li>
            {data.elements.map(item => <li className="item">{item}</li>)}
        </ul >
        <View id="data" show={data.ifShow}>
            <h2>123</h2>
        </View>
        <button onclick={() => ViewShow.publish("data")}>SHOW</button>
        <List id="list" textColor={'#fff'} />
    </View>;
render(jsx, document.getElementById('root'));



