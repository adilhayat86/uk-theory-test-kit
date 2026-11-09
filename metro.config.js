const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const defaultResolveRequest = config.resolver.resolveRequest;
const includeArtworkReview = process.env.EXPO_PUBLIC_IMAGE_REVIEW === 'true';

// Hiding navigation does not stop Metro bundling a screen's static assets.
// Replace the entire review module in ordinary release dependency graphs.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (!context.dev && !includeArtworkReview &&
      moduleName === './src/components/ImageReviewScreen' &&
      context.originModulePath === path.join(__dirname, 'App.tsx')) {
    return { type: 'sourceFile', filePath: path.join(__dirname, 'src/components/ImageReviewUnavailable.tsx') };
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
