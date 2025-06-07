import {El} from '../../../base/classes/m.js';
import {Modal} from '../def/modal.js';
import {MalFc as MalApi} from '../../../api/mal/fc.js';

export const MalModal = () => class extends Modal{
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
    console.log('ARGS', this)
    const arr = {
      must: [
        'url',
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
      if(api.secrets[k]) arr.checkTrue.push(k);
      else arr.checkFalse.push(k);
    }
    for(const k of arr.tokens){
      if(api.secrets[k]) arr.tokensTrue.push(k);
      else arr.tokensFalse.push(k);
    }

    return arr;
  };
  upd = (key, v, api) => {
    if(key !== 'i') return;
    const o = this.o;
    console.log('V', v);
    if(!v.code) return;
    api.secrets.code = v.code;
    new MalApi().fc.auth.getToken({
      secrets: api.secrets
    }).then(
      async res => {
        console.log('Tokens', res);
        api.secrets.accToken = res.access_token;
        api.secrets.refToken = res.refresh_token;
        if(o.GM){
          const secretsList = await o.GM.getValue('secretsList');
          if(secretsList[api.name]){
            secretsList[api.name].accToken = res.access_token;
            secretsList[api.name].refToken = res.refresh_token;
          }
          await o.GM.setValue('secretsList', secretsList);
        }
        this.api.tk.status(this.el.tokensStatus, api, this.arr(api));
        // checker(api, el.tokensApi);
      }
    )
  }
  _api = {
    tk: {
      functions: (path, api) => {
        const o = this.o;
        console.log('SUPER',  super.message);
        El.Button({
          path: path,
          text: this._lang[o.cfg.helper.lang].helper['tokens api']['functions'].login[0],
          func: (e) => this.el[api.name].btnLogin = e,
          onclick: () => {
            const Mal = new MalApi();
            console.log('CLICK');
            api.secrets.codeChall = Mal.fc.auth.cc(128);
            const data = new Proxy({}, El.ProxyHandler(this.upd, api));
            this.el[api.name].window = window.open(Mal.auth.url({
              secrets: api.secrets
            }));
            window.addEventListener('message', this.message.bind(this, data, api));
          }
        });
        if(api.secrets.refToken) El.Button({
          path: path,
          text: this._lang[o.cfg.helper.lang].helper['tokens api']['functions'].update[0],
          func: (e) => this.el[api.name].btnUpdate = e,
          onclick: () => {
            const Mal = new MalApi();
            // const data = new Proxy({}, El.ProxyHandler(this.modal.upd, api));
            Mal.fc.auth.updToken({
              secrets: api.secrets
            }).then(
              res => {
                console.log('Tokens', res);
                api.secrets.accToken = res.access_token;
                api.secrets.refToken = res.refresh_token;
                // checker(api, el.tokensApi);
                this.api.tk.status(this.el.tokensStatus, api, this.arr(api));
              }
            )
          }
        });
      }
    }
  }

  // el = {};
}
