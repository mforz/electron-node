const { app, BrowserWindow, Menu, ipcMain, Notification } = require("electron");

const INDEX_HTML = "html/index.html";
const STATIC_CLOSE = "closed";
const STATIC_NOTIFY_TITLE = "网络状态变化通知";
const STATIC_ONLINE_CHANGE = "online-status-changed";
const STATIC_READY_SHOW = "ready-to-show";

var notifyicon = null;
var windowsEle = null;
/*隐藏electron创听的菜单栏*/
// Menu.setApplicationMenu(null);
// 创建窗口
function createWindow() {
  try {
    // 创建通知
    notifyicon = new Notification();
    // 创建浏览器窗口
    windowsEle = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      minWidth: 650,
      minHeight: 520,
      backgroundColor: "#fff",
    });
    windowsEle.once(STATIC_READY_SHOW, windowsEle.show);

    windowsEle.loadFile(INDEX_HTML); //  加载index.html
    windowsEle.once(STATIC_CLOSE, app.quit); // 监听退出

    // windowsEle.on(STATIC_WILL_RESIZE, (event, status) => {
    //   event.preventDefault(); //拦截，使窗口先不变
    //   const currentSize = event.sender.getSize();
    //   const widthChanged = currentSize[0] != status.width; //判断是宽变了还是高变了，两者都变优先按宽适配
    //   if (widthChanged) {
    //     event.sender.setContentSize(status.width, status.width / (520 / 650));
    //   } else {
    //     event.sender.setContentSize((520 / 650) * status.height, status.height);
    //   }
    // });
  } catch (e) {
    app.quit();
  }
}

// 网络状态变化
ipcMain.on(STATIC_ONLINE_CHANGE, (event, status) => {
  notifyicon.title = STATIC_NOTIFY_TITLE;
  notifyicon.body = status;
  notifyicon.show();
});

app.whenReady().then(createWindow);
