onmessage = e => {
  console.log(e.data);
  edata = JSON.parse(e.data);

  if ("listadd" in edata) {
    if (edata["value"].length > 16) {
      edata.value = "__fail__to__long__";
      postMessage(JSON.stringify(edata));
    } else {
      postMessage(JSON.stringify(edata));
    }
  } else {
    postMessage(JSON.stringify(edata));
  }
};