import { async } from 'regenerator-runtime'
import {TIMEOUT_SEC} from './config.js'

const timeout = function (s) { //triggers error block
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`))
      }, s * 1000)
    })
  }

//helper functions - reused functions central location
export const getJSON = async function(url){
    try{
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        const data = await res.json()
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        return data 
    }
    catch(err){
        throw err //reject value
    }
}