class Validation {
    constructor() { // supported api methods
        this.parameters = {};
        this.parameters.HCaptchaTask =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"proxyType", required: true, type: 'string' }, { name:"proxyAddress", required: true, type: 'string' },
                { name:"proxyPort", required: true, type: 'number' }, { name:"proxyLogin", required: false, type: 'string' },
                { name:"proxyPassword", required: false, type: 'string' }, { name:"userAgent", required: false, type: 'string' },
                { name:"isInvisible", required: false, type: 'boolean' }, { name:"isEnterprise", required: false, type: 'boolean' },
                { name:"enterprisePayload", required: false, type: 'object' },
            ];
        this.parameters.HCaptchaTaskProxyless =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"userAgent", required: false, type: 'string' }, { name:"isInvisible", required: false, type: 'boolean' },
                { name:"isEnterprise", required: false, type: 'boolean' }, { name:"enterprisePayload", required: false, type: 'object' },
            ];
        this.parameters.HCaptchaClassification = [ { name:"question", required: true, type: 'string' }, { name:"queries", required: true, type: 'object' } ];
        this.parameters.RecaptchaV2Task =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"proxyType", required: true, type: 'string' }, { name:"proxyAddress", required: true, type: 'string' },
                { name:"proxyPort", required: true, type: 'number' }, { name:"proxyLogin", required: false, type: 'string' },
                { name:"proxyPassword", required: false, type: 'string' }, { name:"userAgent", required: false, type: 'string' },
                { name:"isInvisible", required: false, type: 'boolean' }, { name:"recaptchaDataSValue", required: false, type: 'string' },
                { name:"cookies", required: false, type: 'string' },
            ];
        this.parameters.RecaptchaV2TaskProxyless =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"userAgent", required: false, type: 'string' }, { name:"isInvisible", required: false, type: 'boolean' },
                { name:"recaptchaDataSValue", required: false, type: 'string' }, { name:"cookies", required: false, type: 'string' },
            ];
        this.parameters.RecaptchaV2EnterpriseTask =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"proxyType", required: true, type: 'string' }, { name:"proxyAddress", required: true, type: 'string' },
                { name:"proxyPort", required: true, type: 'number' }, { name:"proxyLogin", required: false, type: 'string' },
                { name:"proxyPassword", required: false, type: 'string' }, { name:"userAgent", required: false, type: 'string' },
                { name:"enterprisePayload", required: false, type: 'object' }, { name:"apiDomain", required: false, type: 'string' },
                { name:"cookies", required: false, type: 'string' },
            ];
        this.parameters.RecaptchaV2EnterpriseTaskProxyless =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"userAgent", required: false, type: 'string' },
                { name:"enterprisePayload", required: false, type: 'object' }, { name:"apiDomain", required: false, type: 'string' },
                { name:"cookies", required: false, type: 'string' },
            ];
        this.parameters.RecaptchaV3Task =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"proxyType", required: true, type: 'string' }, { name:"proxyAddress", required: true, type: 'string' },
                { name:"proxyPort", required: true, type: 'number' }, { name:"proxyLogin", required: false, type: 'string' },
                { name:"proxyPassword", required: false, type: 'string' }, { name:"pageAction", required: true, type: 'string' },
                { name:"minScore", required: false, type: 'number' },
            ];
        this.parameters.RecaptchaV3TaskProxyless =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"websiteKey", required: true, type: 'string' },
                { name:"pageAction", required: true, type: 'string' }, { name:"minScore", required: false, type: 'number' },
            ];
        this.parameters.ReCaptchaV2Classification = [ { name:"question", required: true, type: 'string' }, { name:"image", required: true, type: 'string' } ];
        this.parameters.GeeTestTask =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"gt", required: true, type: 'string' },
                { name:"challenge", required: true, type: 'string' }, { name:"geetestApiServerSubdomain", required: true, type: 'string' },
                { name:"proxyType", required: true, type: 'string' }, { name:"proxyAddress", required: true, type: 'string' },
                { name:"proxyPort", required: true, type: 'number' }, { name:"proxyLogin", required: false, type: 'string' },
                { name:"proxyPassword", required: false, type: 'string' }, { name:"userAgent", required: false, type: 'string' },
                { name:"geetestGetLib", required: false, type: 'string' }, { name:"version", required: false, type: 'number' },
                { name:"initParameters", required: false, type: 'object' },
            ];
        this.parameters.GeeTestTaskProxyless =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"gt", required: true, type: 'string' },
                { name:"challenge", required: true, type: 'string' }, { name:"geetestApiServerSubdomain", required: true, type: 'string' },
                { name:"userAgent", required: false, type: 'string' }, { name:"geetestGetLib", required: false, type: 'string' },
                { name:"version", required: false, type: 'number' }, { name:"initParameters", required: false, type: 'object' },
            ];
        this.parameters.DataDomeSliderTask =
            [
                { name:"websiteURL", required: true, type: 'string' }, { name:"captchaUrl", required: true, type: 'string' },
                { name:"userAgent", required: true, type: 'string' }, { name:"proxyType", required: true, type: 'string' },
                { name:"proxyAddress", required: true, type: 'string' }, { name:"proxyPort", required: true, type: 'number' },
                { name:"proxyLogin", required: false, type: 'string' }, { name:"proxyPassword", required: false, type: 'string' },
            ];
        this.parameters.FunCaptchaTask =
            [
                { name:"websiteURL", required: false, type: 'string' }, { name:"websitePublicKey", required: true, type: 'string' },
                { name:"funcaptchaApiJSSubdomain", required: true, type: 'string' }, { name:"data", required: false, type: 'string' },
                { name:"userAgent", required: false, type: 'string' }, { name:"proxyType", required: true, type: 'string' },
                { name:"proxyAddress", required: true, type: 'string' }, { name:"proxyPort", required: true, type: 'number' },
                { name:"proxyLogin", required: false, type: 'string' }, { name:"proxyPassword", required: false, type: 'string' },
            ];
        this.parameters.FunCaptchaTaskProxyless =
            [
                { name:"websiteURL", required: false, type: 'string' }, { name:"websitePublicKey", required: true, type: 'string' },
                { name:"funcaptchaApiJSSubdomain", required: true, type: 'string' }, { name:"data", required: false, type: 'string' },
                { name:"userAgent", required: false, type: 'string' },
            ];
    }
}
module.exports = Validation