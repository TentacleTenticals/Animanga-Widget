import {El} from '../../../base/classes/m.js';
import {Modal} from '../def/modal.js';
import {AniFc as AniApi} from '../../../api/ani/fc.js';

export const AniModal = () => class extends Modal{
  constructor(args){
    super();
    this.o = args?.o;
    this.el = args?.el;
  }
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
  arr = (api) => {
    const o = this.o;
    const arr = {
      must: [
        'url',
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
      if(api.secrets[k]) arr.checkTrue.push(k);
      else arr.checkFalse.push(k);
    }
    for(const k of arr.tokens){
      // console.log('TOKENS', api, o.cfg.api.list[api].secrets[k]);
      if(api.secrets[k]) arr.tokensTrue.push(k);
      else arr.tokensFalse.push(k);
    }

    console.log('ARR', arr)

    return arr;
  };
  upd = (key, v, api) => {
    if(key !== 'i') return;
    const o = this.o;
    console.log('V', v);
    if(!v.code) return;
    api.secrets.code = v.code;
    new AniApi().fc.auth.getToken({
      secrets: api.secrets
    }).then(
      res => {
        console.log('Tokens', res);
        api.secrets.accToken = res.access_token;
        api.secrets.refToken = res.refresh_token;
        this.api.tk.status(this.el.tokensStatus, api, this.arr(api));
        // checker(api, el.tokensApi);
      }
    )
  }
  _api = {
    tk: {
      functions: (path, api) => {
        const o = this.o;
        El.Button({
          path: path,
          text: this._lang[o.cfg.helper.lang].helper['tokens api']['functions'].login[0],
          func: (e) => this.el[api.name].btnLogin = e,
          onclick: () => {
            const Ani = new AniApi();
            const data = new Proxy({}, El.ProxyHandler(this.upd, api));
            this.el[api.name].window = window.open(Ani.auth.url({
              secrets: api.secrets
            }));
            window.addEventListener('message', this.message.bind(this, data, api));
          }
        });
        // if(o.cfg.api.list[api].secrets.refToken) El.Button({
        //   path: path,
        //   text: this._lang[o.cfg.helper.lang].helper['tokens api']['functions'].update[0],
        //   func: (e) => this.el[api].btnUpdate = e,
        //   onclick: () => {
        //     const Ani = new AniApi();
        //     Ani.fc.auth.updToken({
        //       secrets: o.cfg.api.list[api].secrets
        //     }).then(
        //       res => {
        //         console.log('Tokens', res);
        //         o.cfg.api.list[api].secrets.accToken = res.access_token;
        //         o.cfg.api.list[api].secrets.refToken = res.refresh_token;
        //         // checker(api, el.tokensApi);
        //         this.api.tk.status(this.el.tokensStatus, api, this.arr(api));
        //       }
        //     )
        //   }
        // });
      }
    }
  }

  // el = {};
}
