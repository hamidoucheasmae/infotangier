"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.copyCommand = void 0;
const tslib_1 = require("tslib");
const utils_fs_1 = require("@ionic/utils-fs");
const path_1 = require("path");
const colors_1 = tslib_1.__importDefault(require("../colors"));
const common_1 = require("../common");
const cordova_1 = require("../cordova");
const errors_1 = require("../errors");
const log_1 = require("../log");
const plugin_1 = require("../plugin");
const promise_1 = require("../util/promise");
const copy_1 = require("../web/copy");
async function copyCommand(config, selectedPlatformName) {
    var _a;
    if (selectedPlatformName && !(await common_1.isValidPlatform(selectedPlatformName))) {
        const platformDir = common_1.resolvePlatform(config, selectedPlatformName);
        if (platformDir) {
            await common_1.runPlatformHook(config, selectedPlatformName, platformDir, 'capacitor:copy');
        }
        else {
            log_1.logger.error(`Platform ${colors_1.default.input(selectedPlatformName)} not found.`);
        }
    }
    else {
        const platforms = await common_1.selectPlatforms(config, selectedPlatformName);
        try {
            await promise_1.allSerial(platforms.map(platformName => () => copy(config, platformName)));
        }
        catch (e) {
            if (errors_1.isFatal(e)) {
                throw e;
            }
            log_1.logger.error((_a = e.stack) !== null && _a !== void 0 ? _a : e);
        }
    }
}
exports.copyCommand = copyCommand;
async function copy(config, platformName) {
    await common_1.runTask(colors_1.default.success(colors_1.default.strong(`copy ${platformName}`)), async () => {
        const result = await common_1.checkWebDir(config);
        if (result) {
            throw result;
        }
        await common_1.runPlatformHook(config, platformName, config.app.rootDir, 'capacitor:copy:before');
        const allPlugins = await plugin_1.getPlugins(config, platformName);
        let usesCapacitorPortals = false;
        if (allPlugins.filter(plugin => plugin.id === '@ionic-enterprise/capacitor-portals').length > 0) {
            usesCapacitorPortals = true;
        }
        if (platformName === config.ios.name) {
            if (usesCapacitorPortals) {
                await copyFederatedWebDirs(config, await config.ios.webDirAbs);
            }
            else {
                await copyWebDir(config, await config.ios.webDirAbs, config.app.webDirAbs);
            }
            await copyCapacitorConfig(config, config.ios.nativeTargetDirAbs);
            const cordovaPlugins = await cordova_1.getCordovaPlugins(config, platformName);
            await cordova_1.handleCordovaPluginsJS(cordovaPlugins, config, platformName);
        }
        else if (platformName === config.android.name) {
            if (usesCapacitorPortals) {
                await copyFederatedWebDirs(config, config.android.webDirAbs);
            }
            else {
                await copyWebDir(config, config.android.webDirAbs, config.app.webDirAbs);
            }
            await copyCapacitorConfig(config, config.android.assetsDirAbs);
            const cordovaPlugins = await cordova_1.getCordovaPlugins(config, platformName);
            await cordova_1.handleCordovaPluginsJS(cordovaPlugins, config, platformName);
            await cordova_1.writeCordovaAndroidManifest(cordovaPlugins, config, platformName);
        }
        else if (platformName === config.web.name) {
            if (usesCapacitorPortals) {
                log_1.logger.info('Capacitor Portals Plugin installed, skipping web bundling...');
            }
            else {
                await copy_1.copyWeb(config);
            }
        }
        else {
            throw `Platform ${platformName} is not valid.`;
        }
    });
    await common_1.runPlatformHook(config, platformName, config.app.rootDir, 'capacitor:copy:after');
}
exports.copy = copy;
async function copyCapacitorConfig(config, nativeAbsDir) {
    const nativeRelDir = path_1.relative(config.app.rootDir, nativeAbsDir);
    const nativeConfigFile = 'capacitor.config.json';
    const nativeConfigFilePath = path_1.join(nativeAbsDir, nativeConfigFile);
    await common_1.runTask(`Creating ${colors_1.default.strong(nativeConfigFile)} in ${nativeRelDir}`, async () => {
        await utils_fs_1.writeJSON(nativeConfigFilePath, config.app.extConfig, {
            spaces: '\t',
        });
    });
}
async function copyWebDir(config, nativeAbsDir, webAbsDir) {
    var _a;
    const webRelDir = path_1.basename(webAbsDir);
    const nativeRelDir = path_1.relative(config.app.rootDir, nativeAbsDir);
    if (((_a = config.app.extConfig.server) === null || _a === void 0 ? void 0 : _a.url) && !(await utils_fs_1.pathExists(webAbsDir))) {
        log_1.logger.warn(`Cannot copy web assets from ${colors_1.default.strong(webRelDir)} to ${nativeRelDir}\n` +
            `Web asset directory specified by ${colors_1.default.input('webDir')} does not exist. This is not an error because ${colors_1.default.input('server.url')} is set in config.`);
        return;
    }
    await common_1.runTask(`Copying web assets from ${colors_1.default.strong(webRelDir)} to ${nativeRelDir}`, async () => {
        await utils_fs_1.remove(nativeAbsDir);
        return utils_fs_1.copy(webAbsDir, nativeAbsDir);
    });
}
async function copyFederatedWebDirs(config, nativeAbsDir) {
    var _a, _b;
    log_1.logger.info('Capacitor Portals Plugin Loaded - Copying Web Assets');
    if (!((_b = (_a = config.app.extConfig) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.Portals)) {
        throw `Capacitor Portals plugin is present but no valid config is defined.`;
    }
    const portalsConfig = config.app.extConfig.plugins.Portals;
    if (!isPortal(portalsConfig.shell)) {
        throw `Capacitor Portals plugin is present but no valid Shell application is defined in the config.`;
    }
    if (!portalsConfig.apps.every(isPortal)) {
        throw `Capacitor Portals plugin is present but there is a problem with the apps defined in the config.`;
    }
    await Promise.all([...portalsConfig.apps, portalsConfig.shell].map(app => {
        const appDir = path_1.resolve(config.app.rootDir, app.webDir);
        return copyWebDir(config, path_1.resolve(nativeAbsDir, app.name), appDir);
    }));
}
function isPortal(config) {
    return (config.webDir !== undefined &&
        config.name !== undefined);
}
