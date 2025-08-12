import {El} from '../../../base/classes/m.js';
import {AniFc as AniApi} from '../../../api/ani/fc.js';

export default class {
  // constructor(o){
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
      const arr = {
        must: [
          'proxyUrl',
          'clientID',
          'clientSecret',
          'redirectUri',
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
      // const check = o.cfg.api.list[api].secrets;
      for(const k of arr.must){
        if(this.vApi.secrets[k]) arr.checkTrue.push(k);
        else arr.checkFalse.push(k);
      }
      for(const k of arr.tokens){
        // console.log('TOKENS', api, o.cfg.api.list[api].secrets[k]);
        if(this.vApi.secrets[k]) arr.tokensTrue.push(k);
        else arr.tokensFalse.push(k);
      }
  
      console.log('ARR', arr)
  
      return arr;
    }
  };
  upd = (key, v, api) => {
    // if(key !== 'i') return;
    console.log('V', v);
    if(!v.code) return;
    this.vApi.secrets.code = v.code;
    new AniApi().fc.auth.getToken({
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
      functions: (path, api) => {
        El.Button({
          path: path,
          class: '-btn',
          text: this._lang[this.o.cfg.helper.lang].helper['tokens api']['functions'].login[0],
          func: (e) => this.el[this.vApi.name].btnLogin = e,
          onclick: () => {
            const Ani = new AniApi();
            // const data = new Proxy({}, El.ProxyHandler(this.upd, api));
            this.el[this.vApi.name].window = window.open(Ani.auth.url({
              secrets: this.vApi.secrets
            }));
            window.addEventListener('message', this.message.bind(this, this.upd), {once:true});
          }
        });
      }
    }
  }

  // el = {};
}
