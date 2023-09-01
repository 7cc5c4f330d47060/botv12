module.exports = (date, host, port, type) => {
  const date2 = new Date(date)
  return 'UBotLogs/' + date2.getUTCDate() + '_' + (date2.getUTCMonth() + 1) + '_' + date2.getUTCFullYear() + `/${type || 'chat'}_` + host + '_' + port + '.txt'
}
