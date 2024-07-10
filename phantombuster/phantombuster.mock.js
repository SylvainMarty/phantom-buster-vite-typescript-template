class Buster {
  constructor() {}

  download(url, saveAs, headers) {}
  save(url, saveAs, headers) {}
  saveFolder(localFolder, storageFolder) {}
  saveText(text, saveAs, mime) {}
  saveBase64(text, saveAs, mime) {}
  solveCaptcha(selector) {}
  solveCaptchaBase64(base64) {}
  solveNoCaptcha(url, key, secret) {}
  solveCaptchaImage(url, headers) {}
  mail(subject, text, to) {}
  pushover(message, options) {}
  progressHint(progress, label) {}
  overrideTimeLimit(seconds) {}
  getTimeLeft() {}
  setAgentObject(agentId, object) {}
  setAgentObject(object) {}
  getAgentObject(agentId) {}
  setGlobalObject(object) {}
  getGlobalObject() {}
  setResultObject(object) {
    console.log('resultObject', object)
  }
}

module.exports = Buster
