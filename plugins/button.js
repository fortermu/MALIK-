const config = require('../config')
const { bot } = require('../lib')
bot({ pattern: 'button', fromMe: true, desc: 'send a button message', usage: '#button', type: 'message' }, async (message) => {
 let data = {
  jid: message.jid,
  button: [
   { type: 'list', params: { title: 'Button 1', sections: [{ title: 'Button 1', rows: [{ header: 'title', title: 'Button 1', description: 'Description 1', id: '#menu' }] }] } },
   { type: 'reply', params: { display_text: 'MENU', id: '#menu' } },
   { type: 'url', params: { display_text: 'MALIK-MD official WhatsApp Group', url: 'https://chat.whatsapp.com/KrJhpZhgKxZLfHcyUZKOMw', YOUTUBE_url: 'https://youtube.com/@problem_solved.?si=Rzo_P_9Ac5vSJohF' } },
   { type: 'address', params: { display_text: 'Address', id: 'message' } },
   { type: 'location', params: {} },
   { type: 'copy', params: { display_text: 'copy', id: '923263429027', copy_code: 'message' } },
   { type: 'call', params: { display_text: 'Call', phone_number: '923263429027' } },
  ],
  header: { title: 'MALIK-MD', subtitle: 'WhatsApp Bot', hasMediaAttachment: false },
  footer: { text: 'Interactive Native Flow Message' },
  body: { text: 'Interactive Message' },
 }
 return await message.sendMessage(message.jid, data, {}, 'interactive')
})

/**
 * button: [
   { type: 'list', params: { title: 'Button 1', sections: [{ title: 'Button 1', rows: [{ header: 'title', title: 'Button 1', description: 'Description 1', id: '#menu' }] }] } },
  ]
 */
