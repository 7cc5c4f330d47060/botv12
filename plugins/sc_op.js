module.exports = {
  load: () => {

  },
  loadBot: (b) => {
    b.add_sc_task('op', '/op @s[type=player]', true)
    b._client.on('login', (p) => {
      b.entityId = p.entityId
    })
    b._client.on('entity_status', (p) => {
      if (p.entityId === b.entityId && p.entityStatus === 24) {
        b.sc_tasks.op.failed = 1
      } else if (p.entityId === b.entityId && p.entityStatus === 28) {
        b.sc_tasks.op.failed = 0
      }
    })
  }
}
