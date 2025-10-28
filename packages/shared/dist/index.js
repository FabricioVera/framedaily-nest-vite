'use strict';

// src/config/warframeComparison.config.ts
var WARFRAME_COMPARISON_CONFIG = [
  {
    key: "name",
    type: "exact",
    label: "Nombre",
    displayType: "text",
    isComparable: false
  },
  {
    key: "type",
    type: "exact",
    label: "Tipo",
    displayType: "text",
    isComparable: true
  },
  {
    key: "aura",
    type: "exact",
    label: "Aura",
    displayType: "text",
    isComparable: true
  },
  {
    key: "isPrime",
    type: "boolean",
    label: "Prime",
    displayType: "boolean",
    isComparable: true
  },
  {
    key: "releaseYear",
    type: "year",
    label: "A\xF1o",
    displayType: "year",
    isComparable: true
  },
  {
    key: "sex",
    type: "exact",
    label: "Sexo",
    displayType: "text",
    isComparable: true
  },
  {
    key: "exalted",
    type: "boolean",
    label: "Exaltado",
    displayType: "boolean",
    isComparable: true
  }
];

exports.WARFRAME_COMPARISON_CONFIG = WARFRAME_COMPARISON_CONFIG;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map