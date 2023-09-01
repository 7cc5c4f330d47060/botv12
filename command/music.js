// const settings=require("../../settings.json");
// const fs=require("fs");
module.exports = {
  command_b: function (b/*, msg,sender,username */) {
    b.message('The music player is work-in-progress, please check back later.')
  },
  command_c: () => {},
  desc: 'Placeholder for music player.',
  usage: '',
  verify: true,
  hidden: true
}
