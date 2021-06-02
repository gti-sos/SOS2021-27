<script>
    import {
        Jumbotron,
        Navbar,
        Nav,
        NavItem,
        NavLink,
        NavbarBrand,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from "sveltestrap";
    let isOpen = false;

    var BASE_API_PATH = "/api/v2/azar-games-and-bet-activities";
    let activities = [];

    var container = document.getElementById("visualization");
var groups = new vis.DataSet();
groups.add({ id: 0, content: "group0" });
groups.add({ id: 1, content: "group1" });
groups.add({
  id: 2,
  content: "group2",
  options: { yAxisOrientation: "right" },
});

var items = [
  { x: "2014-06-11", y: 10, group: 0 },
  { x: "2014-06-12", y: 25, group: 0 },
  { x: "2014-06-13", y: 30, group: 0 },
  { x: "2014-06-14", y: 10, group: 0 },
  { x: "2014-06-15", y: 15, group: 0 },
  { x: "2014-06-16", y: 30, group: 0 },
  { x: "2014-06-11", y: 12, group: 1 },
  { x: "2014-06-12", y: 15, group: 1 },
  { x: "2014-06-13", y: 34, group: 1 },
  { x: "2014-06-14", y: 24, group: 1 },
  { x: "2014-06-15", y: 5, group: 1 },
  { x: "2014-06-16", y: 12, group: 1 },
  { x: "2014-06-11", y: 22, group: 2 },
  { x: "2014-06-12", y: 14, group: 2 },
  { x: "2014-06-13", y: 24, group: 2 },
  { x: "2014-06-14", y: 21, group: 2 },
  { x: "2014-06-15", y: 30, group: 2 },
  { x: "2014-06-16", y: 18, group: 2 },
];

var dataset = new vis.DataSet(items);
var options = {
  style: "bar",
  barChart: { width: 50, align: "center", sideBySide: true }, // align: left, center, right
  drawPoints: true,
  dataAxis: {
    left: {
      range: { min: -5, max: 30 },
    },
    right: {
      range: { min: -5 },
    },
    icons: true,
  },
  orientation: "top",
  start: "2014-06-10",
  end: "2014-06-18",
};
var graph2d = new vis.Graph2d(container, items, groups, options);
</script>
