var systemEvents = Application('System Events');
var currentApp = systemEvents.processes().find((app) => {
    return app.frontmost();
});
if (currentApp) {
    JSON.stringify({
        name: currentApp.name(),
        shortName: currentApp.shortName()
    });
}
