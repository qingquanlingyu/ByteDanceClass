const ListAdd = {
    list: [],
    //订阅
    subscribe(cb) {
        this.list.push(cb);
    },
    //发布
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};
const ListDel = {
    list: [],
    //订阅
    subscribe(cb) {
        this.list.push(cb);
    },
    //发布
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};
const ViewShow = {
    list: [],
    //订阅
    subscribe(cb) {
        this.list.push(cb);
    },
    //发布
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};

function Item(props) {
    return <li className="item" style={props.style}> {props.children} < a href="#" onClick={props.onRemoveItem} > X </a ></li >;
}

class View extends Component {
    constructor(props) {
        super(props);
        ViewShow.subscribe(this.handleShowSwitch.bind(this));
        this.state = { show: true };
        if ("show" in this.props) {
            this.state.show = this.props.show;
        }
    }
    handleShowSwitch(id) {
        if (typeof (this.props.id) !== "undefined" && this.props.id == id) {
            console.log(this.state);
            let tmpstate = JSON.parse(JSON.stringify(this.state));
            tmpstate.show = !tmpstate.show;
            console.log(tmpstate);
            this.setState(tmpstate);
        }
    }
    render() {
        return <div className="view" style={this.state.show ? this.props.style : "display: none"}>{this.props.children}</div>;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    text: 'aaa',
                    color: 'pink'
                },
                {
                    text: 'bbb',
                    color: 'orange'
                },
                {
                    text: 'ccc',
                    color: 'yellow'
                }
            ]
        }
        ListAdd.subscribe(this.handleAdd.bind(this));
        ListDel.subscribe(this.handleItemRemove.bind(this));
    }

    handleItemRemove(edata) {
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listdel"]) {
            this.setState({
                list: this.state.list.filter((item, i) => i !== edata["index"])
            });
        }
    }

    handleAdd(edata) {
        //console.log(edata);
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listadd"]) {
            if (edata["value"] == "__fail__to__long__") {
                window.alert("名字长度过长，不应超过16");
            }
            else {
                this.setState({
                    list: [
                        ...this.state.list,
                        {
                            text: edata["value"]
                        }
                    ]
                });
            }
        }
    }

    render() {
        return <View>
            <ul className="list">
                {this.state.list.map((item, index) => {
                    return <Item style={{ background: item.color, color: this.props.textColor }} onRemoveItem={() => {
                        let tmp = { listdel: this.props.id, index: index };
                        logicWorker.postMessage(JSON.stringify(tmp));
                    }}>{item.text}</Item>
                })}
            </ul>
            <View>
                <input ref={(ele) => { this.ref = ele }} />
                <button onclick={() => {
                    let tmp = { listadd: this.props.id, value: this.ref.value };
                    logicWorker.postMessage(JSON.stringify(tmp));
                }}>Add</button>
            </View>
        </View>;
    }

}

var logicWorker;
if (typeof Worker !== "undefined") {
    if (typeof logicWorker == "undefined") {
        logicWorker = new Worker("logic.js");
    }
    logicWorker.onmessage = (e) => {
        console.log(e.data);
        var edata = JSON.parse(e.data);
        if ("listdel" in edata) {
            ListDel.publish(edata);
        }
        if ("listadd" in edata) {
            ListAdd.publish(edata);
        }
    };
} else {
    alert("错误：你的浏览器不支持WebWorker!");
}
