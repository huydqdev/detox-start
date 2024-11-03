const fs = require('fs-extra');
const cp = require('child_process');
const { setGradleVersionByRNVersion } = require('detox/scripts/updateGradle');

const patchBoostPodspec = () => {
    const log = message => console.log(`[POST-INSTALL] ${message}`);
    const boostPodspecPath = `${process.cwd()}/node_modules/react-native/third-party-podspecs/boost.podspec`;
    const originalUrl = 'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2';
    const patchedUrl = 'https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2';

    if (!fs.existsSync(boostPodspecPath)) {
        return;
    }

    let boostPodspec = fs.readFileSync(boostPodspecPath, 'utf8');

    if (!boostPodspec.includes(originalUrl)) {
        return;
    }

    boostPodspec = boostPodspec.replace(originalUrl, patchedUrl);
    fs.writeFileSync(boostPodspecPath, boostPodspec, 'utf8');
};

function podInstallIfRequired() {
    if (process.platform === 'darwin' && !process.env.DETOX_DISABLE_POD_INSTALL) {
        patchBoostPodspec();

        cp.execSync('pod install', {
            cwd: `${process.cwd()}/ios`,
            stdio: 'inherit'
        });
    }
}

podInstallIfRequired();
setGradleVersionByRNVersion();
