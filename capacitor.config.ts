import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.movingEstimator.app',
  appName: 'Moving Estimator',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: {
    Camera: { permissions: ['camera', 'microphone'] }
  }
};

export default config;
