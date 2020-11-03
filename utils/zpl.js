let tmpMain = (data) => {
  let {name, brand, model, color, size, id} = data;
  return `CT~~CD,~CC^~CT~
^XA
~TA008
~JSN
^LT0
^MNW
^MTT
^PON
^PMN
^LH0,0
^JMA
^PR8,8
~SD15
^JUS
^LRN
^CI27
^PA0,1,1,0
^XZ
^XA
^MMT
^PW464
^LL320
^LS0
^FT449,176^A@I,23,22,TT0003M_^FH\\^CI28^FDБренд: ^FS^CI27
^FT449,141^A@I,23,22,TT0003M_^FH\\^CI28^FDМодель: ^FS^CI27
^FT449,106^A@I,23,22,TT0003M_^FH\\^CI28^FDЦвет:^FS^CI27
^FT449,71^A@I,23,22,TT0003M_^FH\\^CI28^FDРазмер:^FS^CI27
^FT355,176^A@I,23,22,TT0003M_^FH\\^CI28^FD${brand}^FS^CI27
^FT355,141^A@I,23,22,TT0003M_^FH\\^CI28^FD${model}^FS^CI27
^FT355,106^A@I,23,22,TT0003M_^FH\\^CI28^FD${color}^FS^CI27
^FT355,71^A@I,23,22,TT0003M_^FH\\^CI28^FD${size}^FS^CI27
^FT25,211^BQN,2,5
^FH\\^FDLA,${id}^FS
^FT449,263^A@I,28,27,TT0003M_^FH\\^CI28^FD${name}^FS^CI27
^FO2,231^GB462,0,1^FS
^FO186,0^GB0,231,1^FS
^PQ1,0,1,Y
^XZ`
};

let tmpWil = (data) => {
  let {name, brand, model, color, size, composition, owner, country, created_at, barcode} = data;
  return `CT~~CD,~CC^~CT~
^XA
~TA008
~JSN
^LT0
^MNW
^MTT
^PON
^PMN
^LH0,0
^JMA
^PR8,8
~SD15
^JUS
^LRN
^CI27
^PA0,1,1,0
^XZ
^XA
^MMT
^PW464
^LL320
^LS0
^FT450,290^A@I,17,18,TT0003M_^FH\^CI28^FDНаименование:^FS^CI27
^FT450,264^A@I,17,18,TT0003M_^FH\^CI28^FDБренд: ^FS^CI27
^FT450,238^A@I,17,18,TT0003M_^FH\^CI28^FDМодель: ^FS^CI27
^FT450,212^A@I,17,18,TT0003M_^FH\^CI28^FDЦвет:^FS^CI27
^FT450,186^A@I,17,18,TT0003M_^FH\^CI28^FDРазмер:^FS^CI27
^FT305,290^A@I,17,18,TT0003M_^FH\^CI28^FD${name}^FS^CI27
^FT305,264^A@I,17,18,TT0003M_^FH\^CI28^FD${brand}^FS^CI27
^FT305,238^A@I,17,18,TT0003M_^FH\^CI28^FD${model}^FS^CI27
^FT305,212^A@I,17,18,TT0003M_^FH\^CI28^FD${color}^FS^CI27
^FT305,186^A@I,17,18,TT0003M_^FH\^CI28^FD${size}^FS^CI27
^FO15,170^GFA,25,56,56,:Z64:eJz7/58c8IABADUZNqs=:A5CE
^FO15,249^GFA,201,708,12,:Z64:eJxjYCANcK1iWsHVoKUBYsv/Z/whf6D+B4TN/IP/wH8om/EDP1TcHlUcSX0zXJyhHqSeEcK2B6lnhIkD1WMVx6X+A1z9/mZi1JNq/g9k8/sPNMLE/8YfCIWp//8f4S8gux6bOLJ6oPnMA+J+apgPid/3sPj9iRS/cP8CxeHhAFSPVRyYrlatali1goEMAABVs8Kb:E33F
^FT450,146^A@I,14,13,TT0003M_^FH\^CI28^FDСостав: ${composition}^FS^CI27
^FT450,120^A@I,14,13,TT0003M_^FH\^CI28^FDИзготовитель: ${owner}^FS^CI27
^FT450,72^A@I,14,13,TT0003M_^FH\^CI28^FDСтрана производства: ${country}^FS^CI27
^FT202,72^A@I,14,13,TT0003M_^FH\^CI28^FDИзготовлено: ${created_at}^FS^CI27
^BY3,3,21^FT416,41^BCI,,Y,N
^FH\\^FD>;${barcode}>66^FS
^PQ1,0,1,Y
^XZ`
};


let getZpl = (data) => {
  let {product_name, barcode, size, color, art, date} = data;
  console.log(777, {product_name, barcode, size, color, art, date})
  return `CT~~CD,~CC^~CT~
^XA
~TA008
~JSN
^LT0
^MNW
^MTT
^PON
^PMN
^LH0,0
^JMA
^PR8,8
~SD15
^JUS
^LRN
^CI27
^PA0,1,1,0
^XZ
^XA
^MMT
^PW464
^LL320
^LS0
^FT457,180^A@I,23,22,TT0003M_^FH\\^CI28^FDРазмер: ${size}^FS^CI27
^FT457,145^A@I,23,22,TT0003M_^FH\\^CI28^FDЦвет: ${color}^FS^CI27
^FT457,110^A@I,23,22,TT0003M_^FH\\^CI28^FDАртикул: ${art}^FS^CI27
^FT457,75^A@I,23,22,TT0003M_^FH\\^CI28^FDДата: ${date}^FS^CI27
^FT457,275^A@I,25,25,TT0003M_^FH\\^CI28^FD${product_name}^FS^CI27
^FO1,250^GB462,0,8^FS
^FT48,214^BQN,2,6
^FH\\^FDLA,${barcode}^FS
^FO226,0^GB0,251,8^FS
^PQ1,0,1,Y
^XZ`;
};



module.exports = { tmpMain, tmpWil };
