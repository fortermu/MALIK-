const { bot } = require('../lib')
const sys = require('../lib/updater')
bot(
 {
  pattern: 'isupdate',
  fromMe: true,
  desc: 'Get Update From Devs',
  type: 'updater',
 },
 async (message, match) => {
  let commits = await sys.syncGit()
  if (commits.total === 0) return await message.reply(`_Bot is UptoDate_`)
  let update = await sys.sync()
  await message.bot.sendMessage(message.chat, { text: update }, { quoted: message })

  if (match == 'redeploy' && process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY) {
   await message.reply('_Redeploying Bot, this may take a while!_')
   const update = await updateHerokuApp()
   return await message.reply(update)
  }
 }
)
bot(
 {
  pattern: 'update',
  fromMe: true,
  desc: 'Update Your Bot Now!',
  type: 'updater',
 },
 async (message) => {
  let commits = await sys.syncGit()
  if (commits.total === 0) return await message.reply(`_Bot is UptoDate_`)
  let update = await sys.sync()
  let text = `> Updated Started\n\n${update}`
  await message.bot.sendMessage(message.jid, { text })
  await require('simple-git')().reset('hard', ['HEAD'])
  await require('simple-git')().pull()
  await message.reply(`_Bot Updated, Restart Now!_`)
 }
)
