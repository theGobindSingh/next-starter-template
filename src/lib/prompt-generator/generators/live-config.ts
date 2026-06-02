const generateLiveConfig = (): string => {
  return `Create .impeccable/live/config.json with:
{
  "enabled": true,
  "framework": "nextjs-app-router",
  "port": 3000
}`;
};

export { generateLiveConfig };
