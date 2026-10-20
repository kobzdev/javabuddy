export default function handler(_req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  return res.status(200).json({
    status: 'ok',
    app: 'JavaBuddy API Server',
    time: new Date().toISOString(),
    provider: process.env.JAVA_EXECUTION_PROVIDER || 'unconfigured',
  });
}
