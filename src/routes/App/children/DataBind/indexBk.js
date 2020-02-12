import React from 'react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
const NODE_NUM = 4
const EDGE_NUM = 1
let nodeCache = null
let simulation = null
let context = null
let height = window.innerHeight;
let graphWidth =  window.innerWidth;
let dataContainer = null
let dataBinding = null
let isTickEnd = false
let newElements = null

let graphData1 = {
  "vertices": [
      {
          "_tag": "START",
          "increaseFields": {},
          "_id": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "_label": "万科企业股份有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/64DE3547F44B095CE10B0B7BFAA7BAEA",
          "_label": "郁亮",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/9B8DECCD3A024C998CA7B890E32923DE",
          "_label": "张旭",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/C4C26D7B281DD11570C48864E2726E1D",
          "_label": "吴嘉宁",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/009E36C388137DE8A19175C46DB1BF1C",
          "_label": "孙盛典",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/27CBEA0824D5A52BD59F46470722F2DA",
          "_label": "李强",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/E9A25A501B6EA852DF7AE960041C6BB6",
          "_label": "周清平",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/ABCEADD1B64F035E6A3494F7F851C103",
          "_label": "武汉市万科房地产有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/A957CC3EA32CA63E4C8A5705E2B1CD83",
          "_label": "上海万科投资管理有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/3821DA7591C844D04437C2D71A805297",
          "_label": "大连万科置业有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/624CC52490FF5B87C9565B83ABBC4C28",
          "_label": "上海中城联盟投资管理股份有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/FCB7A0AA5AD2C595570D94B59B295BAE",
          "_label": "扬州万科房地产有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/CD1173C4564D7C5D5174F0DF7A479635",
          "_label": "江西万科益达置业投资有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/D15E237A31956C992039A163773E1074",
          "_label": "沈阳万科房地产开发有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/80641489A7A28CECE024713EF90AEA76",
          "_label": "康典",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/4FF6BFB9FAB2D50461D422195C2AF4D4",
          "_label": "郑英",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/5D825F0C71ACCC18AD5183FBBBFBF819",
          "_label": "王文金",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/587BB2A338E408A1527D9652F745A269",
          "_label": "林茂德",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/26C58EABC39545C6B1E7557F09A87DC3",
          "_label": "刘姝威",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/EF0B7A27076F8F47669AC0E9FCCF3AD9",
          "_label": "肖民",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/2E31EA9719ABD380DF9E899139DA3C06",
          "_label": "解冻",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Person/942BBD52409B04E39ABC7B9E35A2C532",
          "_label": "陈贤军",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3049,
              "style": "10",
              "color": "7",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": 1559232000000,
          "schemaInfo": {
              "schemaName": "Person",
              "schemaNameCn": "自然人",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/79BC92FBEF3820983D21C237568BE0EA",
          "_label": "北京万科企业有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/99CE550C46870C2DAB1D1C30983D76B4",
          "_label": "深圳前海基础设施投资基金管理有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/6710857F3ABBDC3F378F6094FEF2693F",
          "_label": "江西万科青山湖房地产发展有限公司",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/B67B57EFF64E9679F718D56D6A4BE29E",
          "_label": "有限售条件的流通股",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      },
      {
          "_tag": null,
          "increaseFields": {},
          "_id": "Company/7715E307C9722B6477A5E351DAD7EAC3",
          "_label": "无限售条件的流通股",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3048,
              "style": "10",
              "color": "6",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "Company",
              "schemaNameCn": "公司",
              "directed": true
          }
      }
  ],
  "edges": [
      {
          "source": "Person/64DE3547F44B095CE10B0B7BFAA7BAEA",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/92AB545136619C818CD976DA2342860B",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/9B8DECCD3A024C998CA7B890E32923DE",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/128DBB11DEC191A6D2658A613AF95960",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/C4C26D7B281DD11570C48864E2726E1D",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/0CE08DA7879DE2E1A8EEEBE91A236787",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/009E36C388137DE8A19175C46DB1BF1C",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/27E6CF99C33C58387FC650AB822CA892",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/27CBEA0824D5A52BD59F46470722F2DA",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/FFB85C1213E3BEEB18799925D05C36B0",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/E9A25A501B6EA852DF7AE960041C6BB6",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/578498DA6F5A25468CB4F044DD1CB08F",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/ABCEADD1B64F035E6A3494F7F851C103",
          "increaseFields": {},
          "_id": "invest/2CD47D8C6E749C9A3A51CE494E9FD813",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/A957CC3EA32CA63E4C8A5705E2B1CD83",
          "increaseFields": {},
          "_id": "invest/CB319A38DAADCA25F2FF56C08CD375CA",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/3821DA7591C844D04437C2D71A805297",
          "increaseFields": {},
          "_id": "invest/C7ED9B11BE71BE4861978C95DA568AF7",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/624CC52490FF5B87C9565B83ABBC4C28",
          "increaseFields": {},
          "_id": "invest/E53370EE6C20AF0C6A88D0E6C2D8DED1",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/FCB7A0AA5AD2C595570D94B59B295BAE",
          "increaseFields": {},
          "_id": "invest/93E7E94188F38C870970E3EF262E0CC0",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/CD1173C4564D7C5D5174F0DF7A479635",
          "increaseFields": {},
          "_id": "invest/0934740634C5E02C6839F284A5208C1A",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/D15E237A31956C992039A163773E1074",
          "increaseFields": {},
          "_id": "invest/E95F7163019A68A1866DF736C89246CE",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Person/64DE3547F44B095CE10B0B7BFAA7BAEA",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/BE044AA0B239925ADF75D976BFBA80B4",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/80641489A7A28CECE024713EF90AEA76",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/1B0D7E900D6613FBE5B69D4C68874DF7",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/64DE3547F44B095CE10B0B7BFAA7BAEA",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/099B39FC84FB2016418289CE49820EA1",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/4FF6BFB9FAB2D50461D422195C2AF4D4",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/5B88D048BE7A6A95DC6AC677CD7E1F9D",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/5D825F0C71ACCC18AD5183FBBBFBF819",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/183178FB11B3C15F966DDE7D047E0216",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/587BB2A338E408A1527D9652F745A269",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/323A1F2C43A0A8D6EAAC5AF8E22A6603",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/26C58EABC39545C6B1E7557F09A87DC3",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/07D571A35654AB8C395240CAE2EB413F",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/EF0B7A27076F8F47669AC0E9FCCF3AD9",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/68C640E59F92866EAF7EDA7A8354B264",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/2E31EA9719ABD380DF9E899139DA3C06",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/B1834E4069413A00FDF1A0E09013C279",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Person/942BBD52409B04E39ABC7B9E35A2C532",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "officer/11C2A9EB2B3EC1C758ADBC814C7ECAA7",
          "_label": "officer",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3051,
              "style": null,
              "color": "4",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "officer",
              "schemaNameCn": "officer",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/79BC92FBEF3820983D21C237568BE0EA",
          "increaseFields": {},
          "_id": "invest/9BE8C6BA47F0C3F8C934D1A9106E7D30",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/99CE550C46870C2DAB1D1C30983D76B4",
          "increaseFields": {},
          "_id": "invest/286EF0603618DD908F6D3B2542EE03FF",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "target": "Company/6710857F3ABBDC3F378F6094FEF2693F",
          "increaseFields": {},
          "_id": "invest/521A40E366F2E0A5175DE3D02FDAB4CA",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/B67B57EFF64E9679F718D56D6A4BE29E",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "invest/FC31260F41566388002D421959F8D004",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      },
      {
          "source": "Company/7715E307C9722B6477A5E351DAD7EAC3",
          "target": "Company/48912D6F30923B4CBCAC3A908127C33B",
          "increaseFields": {},
          "_id": "invest/9EBF5B26C85529DB3FEED816983BAD6E",
          "_label": "invest",
          "uiConfig": {
              "ruleName": null,
              "remark": null,
              "ruleId": 3050,
              "style": null,
              "color": "3",
              "size": "3"
          },
          "fieldUiConfigs": [],
          "timelineFieldValue": null,
          "schemaInfo": {
              "schemaName": "invest",
              "schemaNameCn": "invest",
              "directed": true
          }
      }
  ]

}
  let nodeId = graphData1.vertices.length

let utils = {
  generateNode: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        _id: 'node+' + (++nodeId)
      })
    }, 1500)
  }),
  generateGraph: (nodeNum, edgeNum) => {
    const graphData = {
      vertices: [],
      edges: []
    }
    const tempArr = []
    d3.range(nodeNum).map((index) => {
      tempArr.push(index)
      graphData.vertices.push({
        _id: 'node_' + (index + 1)
      })
    })
    while(edgeNum > 0) {
      let upper = tempArr.length
      let lower = 0

      // [lower, upper)
      let srouceIndex = Math.floor(Math.random() * tempArr.length)
      let source = graphData.vertices[tempArr.splice(srouceIndex, 1)[0]]
      let targetIndex = Math.floor(Math.random() * tempArr.length)
      let target = graphData.vertices[tempArr.splice(targetIndex, 1)[0]]
      if (!source || !target) {
        debugger
      }
      graphData.edges.push({
        _id: 'edge_' + edgeNum,
        source: source._id,
        target: target._id
      })
      edgeNum--
    }
    console.log(graphData)
    return graphData


  }
}
graphData1 = utils.generateGraph(NODE_NUM, EDGE_NUM)
const RADIUS = 20


export const Home = (props: IProps) => {

  useEffect(() => {

    height = window.innerHeight;
    graphWidth =  window.innerWidth;

    dataContainer = d3.select(document.createElement("custom"));

    var graphCanvas = d3.select('#graphDiv').append('canvas')
    .attr('width', graphWidth + 'px')
    .attr('height', height + 'px')
    .node();

    context = graphCanvas.getContext('2d');

    simulation = d3.forceSimulation()
                  .force("center", d3.forceCenter(graphWidth / 2, height / 2))
                  .force("x", d3.forceX(graphWidth / 2).strength(0.1))
                  .force("y", d3.forceY(height / 2).strength(0.1))
                  .force("charge", d3.forceManyBody().strength(-50))
                  .force("link", d3.forceLink().strength(1).id(function(d) { return d._id; }))
                  .alphaTarget(0)
                  .alphaDecay(0.05)
                  .on('end', onEnd)
                  .on("tick",ticked);

    simulation.nodes(graphData1.vertices)
    // d3.timer(drawCanvas)
    drawCustomCircle(graphData1.vertices)
    // simulation.links(graphData1.edges);

    d3.select(graphCanvas)
    .call(d3.drag()
        .container(graphCanvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
  })

  function onEnd() {
    fixNodes()
    isTickEnd = true
    drawCanvas()
  }
  function drawCanvas() {

    // clear canvas
    context.fillStyle = "#fff";
    context.rect(0,0, graphWidth, height);
    context.fill();

    var elements = dataContainer.selectAll(".circle");
    // newElements.each(function(d, i) {
      elements.each(function(d, i) {
        debugger
      // start draw circle
      context.beginPath();
      context.arc(d.x, d.y, RADIUS, 0, 2 * Math.PI, true);
      context.fillStyle = "green"
      context.fill();

      // start draw text
      context.beginPath();
      context.font = "20px Georgia";
      context.fillStyle = "red"
      context.fillText(i + 1, d.x - 2 , d.y - 2);
      context.fill();

    });
  }


  function fixNodes() {
    graphData1.vertices.forEach(node => {

      // ox为固定后的旧坐标
      // node.fx = node.ox !== undefined ? node.ox : node.x
      // node.fy = node.oy !== undefined ? node.oy : node.y


      // node.ox = node.ox !== undefined ? node.ox : node.x
      // node.oy = node.oy !== undefined ? node.oy : node.y

      node.fx = node.x
      node.fy = node.y
    })
  }
  function drawCustomCircle(nodes) {
    // if (!isTickEnd) {
    //   return
    // }
    // isTickEnd = false

    dataBinding = dataContainer.selectAll(".circle")
      .data(nodes, function(d) { return d; });

    debugger
    // enter is same...
    newElements = dataBinding.enter()
    newElements.append("custom")
    .classed('circle', true)
    dataBinding.exit()
    .remove();
  }

  function ticked(isClearImmediately) {

    // 在tick阶段，隐藏调整位置的过程
    if (!isTickEnd || true) {
      drawCanvas()
    }

    // drawCanvas()
    // link.attr("x1", function(d) { return d.source.x; })
    //     .attr("y1", function(d) { return d.source.y; })
    //     .attr("x2", function(d) { return d.target.x; })
    //     .attr("y2", function(d) { return d.target.y; });
  }

  function dragsubject() {
    const subject = simulation.find(d3.event.x, d3.event.y);
    let inInScale = false
    if (subject) {
      if (Math.abs(subject.x - d3.event.x) > RADIUS
        || Math.abs(subject.y - d3.event.y) > RADIUS
      ) {
        inInScale = false
      } else {
        inInScale = true
      }
    }
    return inInScale ? subject : null
  }

  function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    // d3.event.subject.fx = d3.event.subject.x;
    // d3.event.subject.fy = d3.event.subject.y;
    isTickEnd = false
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;

  }

  function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    isTickEnd = true
    // d3.event.subject.fx = null;
    // d3.event.subject.fy = null;
  }

  const appendHandler = () => {
    utils.generateNode().then((d) => {
      graphData1.vertices.push(d)
      console.log(d)
      simulation.nodes(graphData1.vertices);
      drawCustomCircle(graphData1.vertices)
      simulation.alpha(1).restart()
    })
  }
  const removeHandler = () => {
    const node = graphData1.vertices.pop()
    debugger
    console.log(node)
    simulation.nodes(graphData1.vertices);
    drawCustomCircle(graphData1.vertices)
    simulation.alpha(1).restart()
  }
  const redrawHandler = (isClearImmediately) => {
    if (isClearImmediately) {
      context.save();
      context.clearRect(0, 0, graphWidth, height);
    }
    utils.generateNode().then(d => {
      graphData1.vertices.push(d);
      simulation.nodes(graphData1.vertices);
      if (!isClearImmediately) {
        context.save();
        context.clearRect(0, 0, graphWidth, height);
      }
      drawCustomCircle(graphData1.vertices)
      simulation.alpha(1).restart()
    })
  }


  return (
    <div>
        <button onClick={removeHandler}>remove one node</button>
        <button onClick={appendHandler}>append a new node</button>
        <br/>
        <button onClick={redrawHandler.bind(null, true)}>add a new node and redraw all(isClearImmediately: true)</button>
        <br/>
        <button onClick={redrawHandler.bind(null, false)}>add a new node and redraw all(isClearImmediately: false)</button>
        <div id="graphDiv"></div>

    </div>

  )
}
export default Home
