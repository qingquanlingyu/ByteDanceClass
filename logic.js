onmessage = (e) => {
    console.log(e.data);
    edata = JSON.parse(e.data);
    postMessage(JSON.stringify(edata));
}