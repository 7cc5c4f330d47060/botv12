import neostandard from 'neostandard'

export default neostandard({
  ignores: [
    'dist/**/*',
    'data/**/*',
    'util/ubot-panel/**/*' /* Temporary */
  ],
  env: ['browser', 'node'],
  ts: true
})
