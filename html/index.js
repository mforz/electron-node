class MainLoad {
  constructor() {
    this.dropbox = document.getElementById("drag");
  }
  isDragenter() {
    const _dropbox = this.dropbox;
    _dropbox.addEventListener(
      "dragenter",
      function (e) {
        _dropbox.style.borderColor = "gray";
        _dropbox.style.backgroundColor = "white";
        _dropbox.innerHTML = "松开上传";
      },
      false
    );
    _dropbox.addEventListener(
      "dragleave",
      function (e) {
        _dropbox.style.borderColor = "#ccc";
        _dropbox.style.backgroundColor = "transparent";
        _dropbox.innerHTML = "拖动图片到这里";
      },
      false
    );
    _dropbox.addEventListener(
      "drop",
      function (e) {
        e.stopPropagation();
        e.preventDefault();
        _dropbox.innerHTML = "拖动图片到这里";
        console.log(e.dataTransfer.files);
      },
      false
    );
  }
  isOnline() {
    const { ipcRenderer } = require("electron");
    const updateOnlineStatus = () => {
      ipcRenderer.send(
        "online-status-changed",
        navigator.onLine ? "online" : "offline"
      );
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  }

  init() {
    this.isOnline();
    this.isDragenter();
  }
}

function fileOnUpload() {
  console.log("file");
}
function playAddress() {
  console.log("play");
}
