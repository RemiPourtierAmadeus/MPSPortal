/**
 * Mocks METRICSITEM.
 * We use this mock into first page of the metrics part (metrics component) in order to fill
 * each m-panel (metrics/panelComponent)
 * @type {{name: string, pathImage: string, color: string}[]}
 */
export var METRICSITEM: string[] = [
    {name: "News", pathImage: '../../../../assets/metrics/news.png', color: '#0063A7', responsive:"large-4 large-offset-2 "},
    {name: "Projects & Sessions", pathImage: '../../../../assets/metrics/projectSession.png', color: '#D57157', responsive:"large-4 end "},
    {name: "Statistics", pathImage: '../../../../assets/metrics/statistics.png', color: '#0DB3B3', responsive:"large-4 large-offset-2 "},
    {name: "Settings", pathImage: '../../../../assets/metrics/settings.png', color: '#5A5A5A', responsive:"large-4 end "}
];