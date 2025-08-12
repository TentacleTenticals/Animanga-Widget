import {El} from '../../../base/classes/m.js';
// import {Modal} from '../def/modal.js';
import {MalFc as MalApi} from '../../../api/mal/fc.js';

export default class {
  // constructor(o){
  //   console.log('MAL', o);
  //   // super();
  //   this.vApi = o.api;
  // }
  _lang = {
    en: {
      helper: {
        ['tokens api']: {
          functions: {
            title: ['Functions', '', '', ''],
            login: ['Login in account and get tokens', '', '', ''],
            update: ['Update tokens', '', '', '']
          }
        },
      },
    },
    ru: {
      helper: {
        ['tokens api']: {
          functions: {
            title: ['Функции', '', '', ''],
            login: ['Войти в аккаунт и получить токены', '', '', ''],
            update: ['Обновить токены', '', '', '']
          }
        },
      }
    }
  };
  tokens = {
    getRequrements: () => {
      console.log('ARGS', this);
      const arr = {
        must: [
          'proxyUrl',
          'redirectUri',
          'clientSecret',
          'clientID',
          // 'bla'
        ],
        tokens: [
          'accToken',
          'refToken'
        ],
        checkTrue: [],
        checkFalse: [],
        tokensTrue: [],
        tokensFalse: []
      }
      for(const k of arr.must){
        if(this.vApi.secrets[k]) arr.checkTrue.push(k);
        else arr.checkFalse.push(k);
      }
      for(const k of arr.tokens){
        if(this.vApi.secrets[k]) arr.tokensTrue.push(k);
        else arr.tokensFalse.push(k);
      }
  
      return arr;
    }
  }
  upd = (key, v, api) => {
    console.log('[UPD]', key, v, api);
    // if(key !== 'i') return;
    // this.vApi.secrets.code = v;
    console.log('V', v);
    if(!v.code) return;
    this.vApi.secrets.code = v.code;
    new MalApi().fc.auth.getToken({
      secrets: this.vApi.secrets
    }).then(
      async res => {
        console.log('Tokens', res);
        this.vApi.secrets.accToken = res.access_token;
        this.vApi.secrets.refToken = res.refresh_token;
        if(this.o.GM){
          const secretsList = await this.o.GM.getValue('secretsList');
          if(secretsList[this.vApi.name]){
            secretsList[this.vApi.name].accToken = res.access_token;
            secretsList[this.vApi.name].refToken = res.refresh_token;
          }
          await this.o.GM.setValue('secretsList', secretsList);
        }
        this.api.tokens.status(this.el[this.vApi.name].tokensStatus, this.tokens.getRequrements());
        // checker(api, el.tokensApi);
      }
    )
  }
  _api = {
    tokens: {
      functions: (path) => {
        // console.log('SUPER',  super.message);
        El.Button({
          path: path,
          class: '-btn',
          text: this._lang[this.o.cfg.helper.lang].helper['tokens api']['functions'].login[0],
          func: (e) => this.el[this.vApi.name].btnLogin = e,
          onclick: () => {
            const Mal = new MalApi();
            console.log('CLICK');
            this.vApi.secrets.codeChall = Mal.fc.auth.cc(128);
            // const data = new Proxy({}, El.ProxyHandler(this.upd, api));
            this.el[this.vApi.name].window = window.open(Mal.auth.url({
              secrets: this.vApi.secrets
            }));
            window.addEventListener('message', this.message.bind(this, this.upd), {once:true});
          }
        });
        if(this.vApi.secrets.refToken) El.Button({
          path: path,
          class: '-btn',
          text: this._lang[this.o.cfg.helper.lang].helper['tokens api']['functions'].update[0],
          func: (e) => this.el[this.vApi.name].btnUpdate = e,
          onclick: () => {
            const Mal = new MalApi();
            // const data = new Proxy({}, El.ProxyHandler(this.modal.upd, api));
            Mal.fc.auth.updToken({
              secrets: this.vApi.secrets
            }).then(
              async res => {
                console.log('Tokens', res);

                if(this.o.GM){
                  const secretsList = await this.o.GM.getValue('secretsList');
                  if(secretsList[this.vApi.name]){
                    secretsList[this.vApi.name].accToken = res.access_token;
                    secretsList[this.vApi.name].refToken = res.refresh_token;
                  }
                  await this.o.GM.setValue('secretsList', secretsList);
                }
                this.vApi.secrets.accToken = res.access_token;
                this.vApi.secrets.refToken = res.refresh_token;
                // checker(api, el.tokensApi);
                this.api.tokens.status(this.el[this.vApi.name].tokensStatus, this.tokens.getRequrements());
              }
            )
          }
        });
      }
    }
  }

  // el = {};
}
