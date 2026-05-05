import neostandard from 'neostandard'

export default neostandard({
  ignores: [
    'dist/**/*',
    'data/**/*',
    'util/net/ubot-panel/**/*', /* Temporary */
    'util/net/protocol/**/*' /* Temporary */
  ],
  env: ['browser', 'node'],
  ts: true
})
