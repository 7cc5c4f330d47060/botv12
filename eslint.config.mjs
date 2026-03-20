import neostandard from 'neostandard'

export default neostandard({
  ignores: ['dist/**/*', 'data/**/*'],
  env: ['browser', 'node'],
  ts: true
})
