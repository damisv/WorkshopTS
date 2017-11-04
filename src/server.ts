import * as dotenv from 'dotenv'
import {App} from './config/express'
import {FireBaseAdmin} from './firebase/admin'

const config:any = dotenv.config({path: `.env/${process.argv[2]}`}).parsed
const app = new App(config)
const firebase = new FireBaseAdmin(config.FIREBASE_KEY_LOCATION)

app.init()
app.initServiceStatus()
app.startServer()