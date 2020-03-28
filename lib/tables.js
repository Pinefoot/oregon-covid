"use strict";

function renderCasesTable(table, reports, attribute) {
  var dateFormatter = d3.timeFormat("%m/%d");

  var access = function access(report) {
    return report[attribute];
  }; //todo JOIN??


  var positiveTableRows = table.selectAll("tbody > tr").data(reports).enter().append("tr");
  positiveTableRows.append("td").attr("class", ["case-table-date"]).text(function (report) {
    return dateFormatter(report.date);
  });
  positiveTableRows.append("td").attr("class", ["numeral case-table-cumulative"]).text(access);
  positiveTableRows.append("td").attr("class", ["numeral case-table-delta"]).text(function (report, i) {
    if (i == 0) {
      return 0;
    }

    return changeFormatter(access(report) - access(reports[i - 1]));
  });
}

function changeFormatter(n) {
  var number = d3.format(",");
  if (n < 0) return "-" + number(n);
  if (n > 0) return "+" + number(n);
  return " " + number(n);
}