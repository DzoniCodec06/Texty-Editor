const { app, BrowserWindow } = require("electron");
const ipc = require("electron").ipcMain;

ipc.on("create-new-win", () => {
    createWindow();
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
        icon: "./images/icon.png"
    });

    win.loadFile("./src/index.html");
    //win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
});

console.log("App's running");