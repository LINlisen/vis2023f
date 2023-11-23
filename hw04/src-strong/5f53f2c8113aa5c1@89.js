function _1(md){return(
md`# HW04-Strong baseline(3pt)`
)}

function _artist(FileAttachment){return(
FileAttachment("artist-1.csv").csv()
)}

function _artist1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artist-1.csv"),{from:{table:"artist-1"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _columnKey1(artist){return(
Object.keys(artist[0])[9]
)}

function _columnKey2(artist){return(
Object.keys(artist[0])[10]
)}

function _Column1(artist,columnKey1){return(
artist.map(row => row[columnKey1])
)}

function _Column2(artist,columnKey2){return(
artist.map(row => row[columnKey2])
)}

function _scatterplotData(Column1,Column2){return(
Column1.map((value, index) => {
    return { x: value, y: Column2[index] };
})
)}

function _scatterplotData_counts(scatterplotData){return(
scatterplotData.reduce((counts, point) => {
    const key = `${point.x}-${point.y}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
}, {})
)}

function _finalData(scatterplotData_counts){return(
Object.keys(scatterplotData_counts).map((key) => {
    const [x, y] = key.split('-');
    return { x, y, count: scatterplotData_counts[key] };
})
)}

function _createSVG(d3,finalData)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // X 軸的比例尺
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(finalData, (d) => +d.x) ]) // 根據 x 的值設定範圍
    .range([0, width]);

  // Y 軸的比例尺
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(finalData, (d) => +d.y) ]) // 根據 y 的值設定範圍
    .range([height, 0]);

  // 創建 SVG 元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 20);

  // 在 SVG 中添加一個包含所有內容的 g 元素
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // 定義半徑的比例尺
  const radiusScale = d3
    .scaleLinear()
    .domain([1, 10, 20, 30, 40, 50, 51]) // 根據 count 的區間設定
    .range([2, 4, 6, 8, 10, 12, 14]); // 對應的半徑值

  // 繪製點
  g.selectAll("circle")
    .data(finalData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(+d.x)) // 使用 xScale 將 x 值映射到位置
    .attr("cy", (d) => yScale(+d.y)) // 使用 yScale 將 y 值映射到位置
    .attr("r", (d) => radiusScale(d.count)) // 根據 count 設定半徑
    .attr("fill", "#E98B2A") // 點的顏色
    .append("title") // 加入 title 元素
    .text((d) => `Count: ${d.count}`);

  // X 軸
  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5)); // 設定刻度數量

  // X 軸標籤
  g.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .style("text-anchor", "middle")
    .text("您對於「台灣 2050 淨零排放」政策的瞭解在那個相對位置？");

  // Y 軸
  g.append("g").call(d3.axisLeft(yScale).ticks(5)); // 設定刻度數量

  // Y 軸標籤
  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("您認為藝術跟台灣 2050 淨零排放政策的相關度為何？");

  // 顯示 SVG
  return svg.node();
}


function _12(md){return(
md`<h2>結論</h2>
<h3>從上圖中，我們可以看出：
  <ul>
    <li>x軸與y軸所呈現的結果為正相關，代表回答者針對這兩題的了解程度是差不多的。</li>
    <li>大部分的人對於 2050 淨零排放的了解程度大約為2，代表說該政策目前對於大部分的人來說不太了解。</li>
    <li>極少數的人了解該政策內容</li>
  </ul>
</h3>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist-1.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("artist1")).define("artist1", ["__query","FileAttachment","invalidation"], _artist1);
  main.variable(observer("columnKey1")).define("columnKey1", ["artist"], _columnKey1);
  main.variable(observer("columnKey2")).define("columnKey2", ["artist"], _columnKey2);
  main.variable(observer("Column1")).define("Column1", ["artist","columnKey1"], _Column1);
  main.variable(observer("Column2")).define("Column2", ["artist","columnKey2"], _Column2);
  main.variable(observer("scatterplotData")).define("scatterplotData", ["Column1","Column2"], _scatterplotData);
  main.variable(observer("scatterplotData_counts")).define("scatterplotData_counts", ["scatterplotData"], _scatterplotData_counts);
  main.variable(observer("finalData")).define("finalData", ["scatterplotData_counts"], _finalData);
  main.variable(observer("createSVG")).define("createSVG", ["d3","finalData"], _createSVG);
  main.variable(observer()).define(["md"], _12);
  return main;
}
