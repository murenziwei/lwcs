const updateManager = tt.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log('onCheckForUpdate', res.hasUpdate);
  if (res.hasUpdate) {
    tt.showToast({
      title: '即将有更新请留意'
    });
  }
});

updateManager.onUpdateReady(() => {
  tt.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否立即使用？',
    success: function (res) {
      if (res.confirm) {
        // 调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      } else {
        tt.showToast({
          icon: 'none',
          title: '小程序下一次「冷启动」时会使用新版本',
        });
      }
    }
  });
});

updateManager.onUpdateFailed(() => {
  tt.showToast({
    title: '更新失败，下次启动继续...'
  });
});
let lw=require('./utils/ports');
App({
  onLaunch: function () {

  },
  lw
})
