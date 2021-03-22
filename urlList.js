module.exports = {
  Login: 'api-user/wxapi/user/executeWX' //'用户登录接口'
    ,
  GetUserInfo: 'api-user/wxapi/user/getUserInfo' //'获取用户信息'
    ,
  CheckIn: 'api-ajplan/wxapi/tappsign/save' //'用户签到'
    ,
  CheckInStatus: 'api-ajplan/wxapi/tappsign/getCoordinate' //'用户签到状态'
    ,
  UserCheckInList: 'api-ajplan/wxapi/tappsign/list' // 用户签到列表
    ,
  TodayPlay: 'api-ajplan/wxapi/tappsign/getPlan' //'今日计划'
    ,
  TodayRejectList: 'api-workorder/wxapi/tbusworkorder/rejectList' //'今日驳回列表'
    ,
  GetMaterialList: 'api-ajplan/wxapi/tBusMaterial/list' //'获取物料列表'
    ,
  GetSelectList: 'api-user/wxapi/listRead' //获取字典值
    ,
  UploadImg: 'api-file/wxapi/files-anon' //上传图片
    ,
  UploadVideo: 'api-file/wxapi/files-anon/video' //上传视频
    ,
  FileDelete: 'api-file/wxapi/fileDelete' //文件删除
    ,
  PriceCompute: 'api-danger/wxapi/danger/calculation' //物料总价计算
    ,
  GetTaskSporadicList: 'api-danger/wxapi/TBusSporadicOrder/TBusSporadicOrderList' //'获取任务清单零星工单列表'
    ,
  GetRejectSporadicList: 'api-danger/wxapi/TBusSporadicOrder/TBusSporadicOrderListReject' //'获取任务驳回零星工单列表'
    ,
  GetCurrentSporadicList: 'api-danger/wxapi/TBusSporadicOrder/TBusSporadicOrderListCurrent' //'获取当前处理零星工单列表'
    ,
  GetSporadicInfo: 'api-danger/wxapi/TBusSporadicOrder/details' //'获取零星工单信息'
    ,
  GetSporadicOrder: 'api-danger/wxapi/TBusSporadicOrder/Collect' //'领取零星工单'
    ,
  GetTaskDangerList: 'api-danger/wxapi/danger/listingDanger' //'获取任务清单隐患工单列表'
    ,
  GetRejectDangerList: 'api-danger/wxapi/danger/rejectedDanger' //'获取任务驳回隐患工单列表'
    ,
  GetCurrentDangerList: 'api-danger/wxapi/danger/currentDanger' //'获取当前处理隐患工单列表'
    ,
  GetDangerInfo: 'api-danger/wxapi/danger/getBydangerOredrId' //'获取隐患工单信息'
    ,
  GetDangerOrder: 'api-danger/wxapi/danger/lingQuDangerOrder' //'领取隐患工单'
    ,
  SaveDangerOrder: 'api-danger/wxapi/danger/theStaging' //'暂存隐患工单'
    ,
  SubmitDangerOrder: 'api-danger/wxapi/danger/theSubmit' //'提交隐患工单'
    ,
  SaveSporadicOrder: 'api-danger/wxapi/TBusSporadicOrder/TemporaryStorage' //'暂存零星工单'
    ,
  SubmitSporadicOrder: 'api-danger/wxapi/TBusSporadicOrder/Submit' //'提交零星工单'
    ,
  ManometryBefore: 'api-danger/wxapi/danger/manometryQian' //'测压前'
    ,
  ManometryAfter: 'api-danger/wxapi/danger/manometryHou' //'测压后'
    ,
  GroupOrderList: 'api-workorder/wxapi/tbusworkorder/list' //'组合工单列表'
    ,
  GetGroupOrder: 'api-workorder/wxapi/tbusworkorder/receiveWorkorder' //'领取组合工单'
    ,
  GroupOrderDetail: 'api-workorder/wxapi/tbusworkorder/workorderDetail' //'组合工单详情'
    ,
  GroupOrderSave: 'api-workorder/wxapi/tbusworkorder/tempWorkorder' //'暂存组合工单'
    ,
  GroupOrderSubmit: 'api-workorder/wxapi/tbusworkorder/submitWorkorder' //'提交组合工单'
    ,
  GetUserList: 'api-customer/wxapi/tBusCustomer/list' //用户列表
    ,
  AddUserList: 'api-customer/wxapi/tBusCustomer/addCustomer' //新增用户
    ,
  ModificationUserList: 'api-customer/wxapi/tBusCustomer/UpdateCustomer ' //修改用户
    ,
  GetDistrictList: 'api-customer/wxapi/tBusCustomer/getDistrictList' //用户所属片区
    ,
  GetGasMater: 'api-customer/wxapi/tBusCustomer/getGasMater' //表型号下拉
    ,
  GetManufacturers: 'api-customer/wxapi/tBusCustomer/getManufacturers' //气表厂家下拉
    ,
  GetDangerSection: "api-danger/wxapi/danger/currentDanger" // 隐患板块列表
    ,
  GetGroupOrderStep: "api-workorder/wxapi/tbusworkorder/workorderDetailStep" // 组合工单分布详情
  ,
  GetDoneDangerList:"api-danger/wxapi/danger/findAllComplete" // 已完成隐患工单列表
  ,
  GetDoneSporadicList:"api-danger/wxapi/TBusSporadicOrder/TBusSporadicOrderListPass" // 已完成零星工单列表
};