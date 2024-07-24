const { Sequelize } = require('sequelize')
require('dotenv').config()
const toBool = (x) => x === 'true'
const DATABASE_URL = process.env.DATABASE_URL || './database.db'
module.exports = {
 SESSION_ID: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUZtSXYweUNLaTFQbkFPTWFxUWRremgvSDBPTDNTNkl0Q3F3bzU0R3hIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU1rSWt3RjNGOFkzZDEyTjRJK0E2S0ZwcSszbUNWa3pJdllnN1FDclJtcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSjQyYnZYZ3JFbkl5Q0tXQmFiYVViQ2FiT2YxNXpuTWlybFgyNjJFQWxRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEZjJxZ2pxQWEvckYycUZJWFhPb2IwcXIyK05Gc3h0TEJWV1JuUE1ZWERjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNBblUzS1VqbURHYnpqQjlxQldOeUUvYkRnQTkwSGpHeVM5bTF4Rkk2MnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE0L3ZLRzdKZzRJaVozSTBWRis4bWx2Z2g2eXlHUFl4SHBIQ1NvZWdTU3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01QSUpOeHV5NGIrU1o1WTRaNTgvaWFwZXo4S3pOdE4yVEhDT1VxYkdIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRk80RWUvdWdteTgrWDVZZWtMN3FvVnFsYm9JSVdibUlOWmNTeVBIWkZ3az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBkUXBEOTVoMU9rLzFoeHFwYklSbGgvZm1XSklxUU1OUTFuak90dHNMTnM1V3VGNjR5UzZSOHpMUCt3di9YVWVpeFdDYVZVWkRZVVhZUXIwQUtWWGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTAsImFkdlNlY3JldEtleSI6IlVEVGQxSDdyWTFpNWNibzRQU3ZaREsxemg3UFk5R2d3elIwZ2JmbVNiaVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVDZVhvSVVoVFAtZllCVjdJTXFaelEiLCJwaG9uZUlkIjoiN2RjMTI0YjgtNzkzYi00MGZmLTg4NTItNjRhNzIwN2ZlZDVjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlRbnUwOFNSSUNFOW9qeUxLMWhLOVNCNWRkUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHZlA0cmJKaXhMcG96Z1NwdnRwMGZpR1JSZm89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNlhZNFRNTlciLCJtZSI6eyJpZCI6IjkyMzAzMDU5ODQwMjoyM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnFBMDhzRkVLdk15clFHR0JBZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZlJUcjBkdHVCU2x6ZmIvWnlqZ2MwMzJLREtTZlVQUWhSeXdXK3Bqby9Rcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibjk2SklEUDh0Ri9idGNuYm5tMTlMdE9Ka2ZNZ25Za296TFVkNDhSV0g5L3Qxd0MrRmhFUGwvd0pJQm9Tb2RmSkFYVElZcDF3VVZNZUoyY2hzVUNHQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik9mV0FxU2VHSG83Y3g1bmRBWnNLdGxtSDhJVEdmUTRrYVhMenBleWQza2ZucWt6ZGV1eTZrSEFDUVVTYUpaZlh0UThYSXNIWUlqM3JEVi9vNnJhOWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDMwNTk4NDAyOjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlgwVTY5SGJiZ1VwYzMyLzJjbzRITk45aWd5a24xRDBJVWNzRnZxWTZQMEwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA4ODY4NDAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSkJvIn0=',
 SESSION_FLUSH: process.env.SESSION_FLUSH || 'false',
 OWNER_NAME: process.env.OWNER_NAME || 'ᴇx-ʙᴏᴛs',
 BOT_NAME: process.env.BOT_NAME || 'ᴢᴇɴᴏɴ-ʙᴏᴛ',
 SUDO: process.env.SUDO || '923263429027',
 WORK_TYPE: process.env.WORK_TYPE || 'public',
 TIME_ZONE: process.env.TZ || 'Africa/Lagos',
 HANDLERS: process.env.HANDLER || '.',
 ANTILINK: toBool(process.env.ANTI_LINK) || true,
 LOGS: toBool(process.env.LOGS) || true,
 ANTILINK_ACTION: process.env.ANTI_LINK || 'kick',
 AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_',
 AUTOUNMUTE_MSG: process.env.AUTOUNMUTE_MSG || '_Group autounmuted!_',
 LANG: process.env.LANG || 'EN',
 AUTH_TOKEN: '',
 RMBG_KEY: process.env.RMBG_KEY || false,
 BRANCH: 'main',
 WARN_COUNT: 3,
 PACKNAME: process.env.PACKNAME || 'ᴇx-ʙᴏᴛs',
 WELCOME_MSG: process.env.WELCOME_MSG || 'Hi @user Welcome to @gname',
 GOODBYE_MSG: process.env.GOODBYE_MSG || 'Hi @user It was Nice Seeing you',
 AUTHOR: process.env.AUTHOR || 'ᴇx-ʙᴏᴛs',
 HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
 HEROKU_API_KEY: process.env.HEROKU_API_KEY,
 HEROKU: toBool(process.env.HEROKU) || false,
 AUTO_READ: toBool(process.env.AUTO_READ) || false,
 AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || true,
 PROCESSNAME: process.env.PROCESSNAME || 'MALIK-ʙᴏᴛs',
 SESSION_URL: process.env.SESSION_URL || '',
 DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
 DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
 REMOVEBG: process.env.REMOVEBG || false,
 DATABASE_URL: DATABASE_URL,
 STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
 DATABASE:
  DATABASE_URL === './database.db'
   ? new Sequelize({
      dialect: 'sqlite',
      storage: DATABASE_URL,
      logging: false,
     })
   : new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      ssl: true,
      protocol: 'postgres',
      dialectOptions: {
       native: true,
       ssl: { require: true, rejectUnauthorized: false },
      },
      logging: false,
     }),
}
