function _1(md){return(
md`# HW2 Strong baseline-1`
)}

function _data(FileAttachment){return(
FileAttachment("../data.json").json()
)}

function _yCounts(){return(
[]
)}

function _Constellations(){return(
['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座']
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _6(yCounts,Constellations,data)
{
  yCounts.length = 0; //將yCounts清空
  for (var y=0; y<12; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:Constellations[y], gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({Constellation:Constellations[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> { 
    if(x.Gender == "男"){
        yCounts[x.Constellation*2].count++;
    }
    else if(x.Gender == "女"){
       yCounts[x.Constellation*2+1].count++;
    }
  })
  return yCounts
}


function _7(yCounts){return(
yCounts
)}

function _8(Plot,yCounts){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count"}),
  ]
})
)}

function _plot(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _10(Plot,plot,yCounts){return(
Plot.plot({
  marginTop: plot.mt,
  marginRight: plot.mr,
  marginBottom: plot.mb,
  marginLeft: plot.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/01d24d9aeda19b7590d996fac1553c965097547ebd857a93a21c0f86efc088993c6168f092b2353e6ec91202e5a6dead5ad66b688c1038a20deb6ec8d35e570d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("Constellations")).define("Constellations", _Constellations);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer()).define(["yCounts","Constellations","data"], _6);
  main.variable(observer()).define(["yCounts"], _7);
  main.variable(observer()).define(["Plot","yCounts"], _8);
  main.variable(observer("viewof plot")).define("viewof plot", ["Inputs"], _plot);
  main.variable(observer("plot")).define("plot", ["Generators", "viewof plot"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot","yCounts"], _10);
  return main;
}
