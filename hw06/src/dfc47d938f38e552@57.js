function _1(md){return(
md`# HW06`
)}

function _artistpublic1Artistpublic1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic (1) - artistPublic (1).csv"),{from:{table:"artistPublic (1) - artistPublic (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistver1Artistver1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer (1) - artistVer (1).csv"),{from:{table:"artistVer (1) - artistVer (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artist_columnKey(artistver1Artistver1){return(
Object.keys(artistver1Artistver1[0])[3]
)}

function _artist_Column(artistver1Artistver1,artist_columnKey){return(
artistver1Artistver1.map(row => row[artist_columnKey])
)}

function _artistver_uniqueValues(artist_Column){return(
[...new Set(artist_Column)].sort()
)}

function _artist_counts(artistver_uniqueValues,artist_Column){return(
artistver_uniqueValues.map(val => ({
  value: val,
  count: artist_Column.filter(v => v === val).length
}))
)}

function _artistpublic_columnKey(artistpublic1Artistpublic1){return(
Object.keys(artistpublic1Artistpublic1[0])[4]
)}

function _artistpublic_Column(artistpublic1Artistpublic1,artistpublic_columnKey){return(
artistpublic1Artistpublic1.map(row => String(row[artistpublic_columnKey]))
)}

function _artistpublic_uniqueValues(artistpublic_Column){return(
[...new Set(artistpublic_Column)].sort()
)}

function _artistpublic_counts(artistpublic_uniqueValues,artistpublic_Column){return(
artistpublic_uniqueValues.map(val => ({
  value: val,
  count: artistpublic_Column.filter(v => v === String(val)).length
}))
)}

function _data(artist_counts,artistpublic_counts){return(
artist_counts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artist'
  },
  {
    value: item.value,
    count: artistpublic_counts[index].count,
    series: 'artistpublic'
  }
]))
)}

function _13(Plot,artist_columnKey,data){return(
Plot.plot({
  height: 600,
  title: artist_columnKey,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#4F4F48', '#005CAF'], 
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => d.series), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _chart(data,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => (d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#4F4F48', '#005CAF']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)

          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart1(data,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => (d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#4F4F48', '#005CAF']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(2000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart2(data,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => (d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#4F4F48', '#005CAF']);
   // .range(['lightblue', 'lightblue']);
     //d3.scaleLinear().domain([舊的範圍]).range([新的範圍]) 
    //就是把舊範圍縮放到新的範圍內 

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  // 添加陰影濾鏡效果
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 8) //水平位移量
      .attr("dy", 8) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //


  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#516E41");

            
              
          
              
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
        d3.select(".tooltip").remove();

        });
});

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic (1) - artistPublic (1).csv", {url: new URL("./artistPublic (1) - artistPublic (1).csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer (1) - artistVer (1).csv", {url: new URL("./artistVer (1) - artistVer (1).csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistpublic1Artistpublic1")).define("artistpublic1Artistpublic1", ["__query","FileAttachment","invalidation"], _artistpublic1Artistpublic1);
  main.variable(observer("artistver1Artistver1")).define("artistver1Artistver1", ["__query","FileAttachment","invalidation"], _artistver1Artistver1);
  main.variable(observer("artist_columnKey")).define("artist_columnKey", ["artistver1Artistver1"], _artist_columnKey);
  main.variable(observer("artist_Column")).define("artist_Column", ["artistver1Artistver1","artist_columnKey"], _artist_Column);
  main.variable(observer("artistver_uniqueValues")).define("artistver_uniqueValues", ["artist_Column"], _artistver_uniqueValues);
  main.variable(observer("artist_counts")).define("artist_counts", ["artistver_uniqueValues","artist_Column"], _artist_counts);
  main.variable(observer("artistpublic_columnKey")).define("artistpublic_columnKey", ["artistpublic1Artistpublic1"], _artistpublic_columnKey);
  main.variable(observer("artistpublic_Column")).define("artistpublic_Column", ["artistpublic1Artistpublic1","artistpublic_columnKey"], _artistpublic_Column);
  main.variable(observer("artistpublic_uniqueValues")).define("artistpublic_uniqueValues", ["artistpublic_Column"], _artistpublic_uniqueValues);
  main.variable(observer("artistpublic_counts")).define("artistpublic_counts", ["artistpublic_uniqueValues","artistpublic_Column"], _artistpublic_counts);
  main.variable(observer("data")).define("data", ["artist_counts","artistpublic_counts"], _data);
  main.variable(observer()).define(["Plot","artist_columnKey","data"], _13);
  main.variable(observer("chart")).define("chart", ["data","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["data","d3"], _chart1);
  main.variable(observer("chart2")).define("chart2", ["data","d3"], _chart2);
  return main;
}
