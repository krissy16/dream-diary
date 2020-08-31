import config from '../config'
import TokenService from './token-service'

const DreamApiService = {
    getUserDreams(userId){
        return fetch(`${config.API_ENDPOINT}/dreams/byUserId/${userId}`, {
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    getDream(dreamId){
        return fetch(`${config.API_ENDPOINT}/dreams/${dreamId}`, {
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    postDream(dream){
        return fetch(`${config.API_ENDPOINT}/dreams`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(dream),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    editDream(dreamId, dream){
        return fetch(`${config.API_ENDPOINT}/dreams/${dreamId}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(dream),
          })
            .then(res => {
              return (
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res
            )})
    },
}

export default DreamApiService
