(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a);
  new MutationObserver((a) => {
    for (const r of a) if (r.type === "childList") for (const l of r.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && o(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(a) {
    const r = {};
    return (
      a.integrity && (r.integrity = a.integrity),
      a.referrerPolicy && (r.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials" ? (r.credentials = "include") : a.crossOrigin === "anonymous" ? (r.credentials = "omit") : (r.credentials = "same-origin"),
      r
    );
  }
  function o(a) {
    if (a.ep) return;
    a.ep = !0;
    const r = i(a);
    fetch(a.href, r);
  }
})();
const f = {
  apiKey: "AIzaSyCr6TaP_TGv-HsG3as0aG2hVfyfQMdvw_c",
  authDomain: "nodemcu-dht22-88dfc.firebaseapp.com",
  databaseURL: "https://nodemcu-dht22-88dfc-default-rtdb.firebaseio.com",
  projectId: "nodemcu-dht22-88dfc",
  storageBucket: "nodemcu-dht22-88dfc.appspot.com",
  messagingSenderId: "845834709135",
  appId: "1:845834709135:web:2b14680ef986494206a8fa",
  measurementId: "G-177DKZJFGY",
};
firebase.initializeApp(f);
const c = firebase.database(),
  p = (t, e) =>
    Highcharts.chart(t, {
      chart: { type: "gauge", plotBackgroundColor: null, plotBackgroundImage: null, plotBorderWidth: 0, plotShadow: !1, height: "450px" },
      title: { text: e },
      pane: { startAngle: -90, endAngle: 89.9, background: null, center: ["50%", "75%"], size: "90%" },
      yAxis: {
        min: 0,
        max: 100,
        tickPixelInterval: 72,
        tickPosition: "inside",
        tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: { distance: 20, style: { fontSize: "20px" } },
        lineWidth: 0,
        plotBands: [
          { from: 0, to: 30, color: "#55BF3B", thickness: 20, borderRadius: "0%" },
          { from: 60, to: 100, color: "#DF5353", thickness: 20, borderRadius: "0%" },
          { from: 30, to: 65, color: "#DDDF0D", thickness: 20 },
        ],
      },
      credits: { enabled: !1 },
      series: [
        {
          name: "Celsius",
          data: [0],
          tooltip: { valueSuffix: " °C" },
          dataLabels: { format: "{y} °C", borderWidth: 0, color: (Highcharts.defaultOptions.title && Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || "#333333", style: { fontSize: "16px" } },
          dial: { radius: "80%", backgroundColor: "gray", baseWidth: 12, baseLength: "0%", rearLength: "0%" },
          pivot: { backgroundColor: "gray", radius: 6 },
        },
      ],
      responsive: { rules: [{ condition: { maxWidth: 500 }, chartOptions: { chart: { height: "300px" }, title: { style: { fontSize: "12px" } }, yAxis: { labels: { style: { fontSize: "10px" } } } } }] },
    }),
  g = (t, e) =>
    Highcharts.chart(t, {
      chart: { type: "gauge", plotBackgroundColor: null, plotBackgroundImage: null, plotBorderWidth: 0, plotShadow: !1, height: "450px" },
      title: { text: e },
      pane: { startAngle: -90, endAngle: 89.9, background: null, center: ["50%", "75%"], size: "90%" },
      yAxis: {
        min: 0,
        max: 100,
        tickPixelInterval: 72,
        tickPosition: "inside",
        tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: { distance: 20, style: { fontSize: "20px" } },
        lineWidth: 0,
        plotBands: [
          { from: 0, to: 32, color: "#DF5353", thickness: 20, borderRadius: "0%" },
          { from: 70, to: 100, color: "#55BF3B", thickness: 20, borderRadius: "0%" },
          { from: 30, to: 70, color: "#DDDF0D", thickness: 20 },
        ],
      },
      credits: { enabled: !1 },
      series: [
        {
          name: "Kelembapan",
          data: [0],
          tooltip: { valueSuffix: " %" },
          dataLabels: { format: "{y} %", borderWidth: 0, color: (Highcharts.defaultOptions.title && Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || "#333333", style: { fontSize: "16px" } },
          dial: { radius: "80%", backgroundColor: "gray", baseWidth: 12, baseLength: "0%", rearLength: "0%" },
          pivot: { backgroundColor: "gray", radius: 6 },
        },
      ],
      responsive: { rules: [{ condition: { maxWidth: 500 }, chartOptions: { chart: { height: "300px" }, title: { style: { fontSize: "12px" } }, yAxis: { labels: { style: { fontSize: "10px" } } } } }] },
    }),
  s = p("container1", "Suhu (Celsius)"),
  n = g("container2", "Kelembapan"),
  m = (t, e) => {
    s && !s.renderer.forExport && s.series[0].points[0].update(t), n && !n.renderer.forExport && n.series[0].points[0].update(e);
  },
  b = () => {
    c.ref("DHT/data").on("value", (e) => {
      const i = e.val();
      i && m(i.temperature, i.humidity);
    });
  };
let d = Highcharts.stockChart("container3", { rangeSelector: { selected: 1 }, title: { text: "Data Suhu Greentech" }, credits: { enabled: !1 }, series: [{ name: "Suhu", data: [], tooltip: { valueDecimals: 2 } }] }),
  h = Highcharts.stockChart("container4", { rangeSelector: { selected: 1 }, title: { text: "Data Kelembapan Greentech" }, credits: { enabled: !1 }, series: [{ name: "Kelembapan", data: [], tooltip: { valueDecimals: 2 } }] });
function y() {
  const t = new Date(),
    e = t.getTimezoneOffset() * 6e4;
  return t.getTime() - e;
}
c.ref("DHT/data").on("value", (t) => {
  const e = t.val(),
    i = y();
  if (e) {
    const o = [i, e.temperature];
    d.series[0].addPoint(o, !0, !1);
    const a = [i, e.humidity];
    h.series[0].addPoint(a, !0, !1);
  } else console.log("Data kosong atau tidak tersedia.");
  k();
});
function k() {
  localStorage.setItem("data", JSON.stringify(data));
}
b();
const u = () => {
  const t = window.innerWidth < 600 ? 300 : 450;
  s.update({ chart: { height: t } }), n.update({ chart: { height: t } }), d.update({ chart: { height: t } }), h.update({ chart: { height: t } });
};
window.addEventListener("resize", u);
u();
