const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    let win = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,  // **隱藏標題列，真正只有內容**
        alwaysOnTop: true, // **保持視窗在最上層**
        webPreferences: {
            nodeIntegration: false
        }
    });

    win.loadURL("file://" + __dirname + "/popup.html");

    win.on("closed", () => {
        win = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
