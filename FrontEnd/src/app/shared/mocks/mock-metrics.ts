/**
 * Mocks METRICSITEM.
 * We use this mock into first page of the metrics part (metrics component) in order to fill
 * each m-panel (metrics/panelComponent)
 * @type {{name: string, pathImage: string, color: string}[]}
 */
export var METRICSITEM: string[] = [
    {name: "News", pathImage: '../../../../assets/metrics/news.png',
        color: '#0063A7', description:"Consult all the last news about Metrics",
        responsive:"large-5 large-offset-1  medium-5 medium-offset-1  small-5 small-offset-1"},
    {name: "Projects & Sessions", pathImage: '../../../../assets/metrics/projectSession.png',
        color: '#D57157',  description:"Manage projects and sessions",
        responsive:"large-5  medium-5 small-5 end"},
    {name: "Statistics", pathImage: '../../../../assets/metrics/statistics.png',
        color: '#0DB3B3', description:"Manage statistics",
        responsive:"large-5 large-offset-1 medium-5 medium-offset-1 small-5 small-offset-1"},
    {name: "Settings", pathImage: '../../../../assets/metrics/settings.png',
        color: '#5A5A5A',  description:"Edit your profile",
        responsive:"large-5 medium-5 small-5 end"}
];