const sleep = ms => new Promise(r => setTimeout(r, ms));
const axios = require('axios');

class Tasker {
    constructor(type, apiKey, websiteURL, websiteKey=undefined, verbose) {
        this.apiKey = apiKey;
        this.verbose = verbose;
        this.taskData = { "type":type, "websiteURL": websiteURL ? websiteURL.toString() : null, "websiteKey": websiteKey ? websiteKey.toString() : null, };
    }

    async createTask() {
        let self = this;
        if(this.taskData.websiteURL === null) delete this.taskData.websiteURL;
        if(this.taskData.websiteKey === null) delete this.taskData.websiteKey;
        let axiosConfig = { url: 'https://api.captchaai.io/createTask', headers: { }, method: 'post', data: { "clientKey": this.apiKey.toString(), "task": this.taskData } };
        let r=await axios(axiosConfig)
            .then(async function (response) {
                if(self.verbose === 2){ console.log(requestData); }
                if(response.data.errorId !== 0){    // TASK ERROR
                    return { 'error':-1, 'statusText':response.status+' '+response.statusText, 'apiResponse':response.data }
                }
                return { 'error':0, 'statusText':response.status+' '+response.statusText, 'apiResponse':response.data }
            })
            .catch(function (error) {
                if(error.response === undefined){ return { 'error':-1, 'statusText':JSON.stringify(error), 'apiResponse':'' } }
                if(self.verbose === 2){ console.log(error.response.data); }
                return { 'error':-1, 'statusText':error.response.status+' '+error.response.statusText, 'apiResponse':error.response.data }
            });

        if(this.verbose === 1 || this.verbose === 2){
            if(r.error === undefined ||  r.error === -1){
                console.log('[' + this.taskData.type + '][' + axiosConfig.method + '][' + axiosConfig.url + ']['+r.statusText+'][for: '+this.taskData.websiteURL+'][❌][error: '+r.apiResponse.errorDescription+']');
            }else{
                console.log('[' + this.taskData.type + '][' + axiosConfig.method + '][' + axiosConfig.url + ']['+r.statusText+'][for: '+this.taskData.websiteURL+'][OK][taskId: '+r.apiResponse.taskId+']');
            }
        }
        return r;
    }

    async getTaskResult(taskId, rqDelay){
        let self = this; let status = ''; let fails = 0; let r = null;
        if(taskId === undefined) return;
        let requestData = { "clientKey":this.apiKey, "taskId": taskId };
        let axiosConfig = { method: 'post', url: 'https://api.captchaai.io/getTaskResult', headers: { }, data: requestData };
        while(status !== 'ready'){
            await sleep(rqDelay);
            if(fails > 10) break;
            r = await axios(axiosConfig)
                .then(async function (response) {
                    if(self.verbose === 2){ console.log(requestData); }
                    if(response.data.errorId !== 0){    // CAPTCHA NOT VALID/SOLVED
                        status = response.data.errorDescription;
                        return { 'error':-1, 'statusText':response.status+' '+response.statusText, 'apiResponse':response.data }
                    }
                    status = response.data.status;      // CAPTCHA PASSED
                    return { 'error':0, 'statusText':response.status+' '+response.statusText, 'apiResponse':response.data }
                })
                .catch(function (error) {               // REQUEST ERROR
                    if(self.verbose === 2){ console.log(error.response.data); }
                    fails++;
                    return { 'error':-1, 'statusText':error.response.status+' '+error.response.statusText, 'apiResponse':error.response.data
                    }
                });
            if(this.verbose === 1 || this.verbose === 2)
                console.log('[' + this.taskData.type + '][' + axiosConfig.method + ']['+axiosConfig.url+'][for: ' + (this.taskData.websiteURL ? this.taskData.websiteURL : this.taskData.captchaUrl) + ']['+r.statusText+'][taskId: '+taskId+'][status: '+status+']');
            if(this.verbose === 2){ console.log(r.apiResponse)}
            if(r.error !== 0) break;
        }
        return r;
    }

}

module.exports = Tasker;