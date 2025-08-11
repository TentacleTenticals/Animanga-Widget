// import {MalModal} from '../api/mal/modal.js';
// import {AniModal} from '../api/ani/modal.js';
import {El} from '../../base/classes/m.js';
import {default as Ut} from '../../funcs/utils.js';

export default (Base) => class extends Base {
  constructor(o){
    super();
    console.log('OWL', o)
    this.vApi = o.api;
    this.o = o.o;
  }
  lang = {
    en: {},
    ru: {
      helper: {
        ['info api']: {
          title: ['Инфо API', '', '', 'API что используются для получения информации о итеме']
        },
        ['tokens api']: {
          title: ['Токены API', '', '', ' API токены, использующиеся для получения/изменения информации о итеме'],
          requrements: {
            title: ['Требования', '', '', ''],
            status: {
              all: ['Все выполнены', '', '', '']
            },
            check: ['Проверить', 'Пров', '🔄\ufe0e', 'Повторная проверка']
          },
          ['tokens status']: {
            title: ['Статус токенов', '', '', ''],
            status: {
              days: ['дней', '', '', ''],
              left: ['осталось', '', '', ''],
              update: ['требуется обновление', '', '', ''],
              expired: ['требуется получение новых токенов', '', '', '']
            },
            check: ['Проверить', 'Пров', '🔄\ufe0e', 'Повторная проверка']
          },
          functions: {
            title: ['Функции', '', '', ''],
            login: ['Войти в аккаунт и получить токены', '', '', ''],
            update: ['Обновить токены', '', '', '']
          }
        }
      }
    }
  };
  el = {
    mal: {},
    ani: {},
    shiki: {}
  };
  // cls = {
  //   modal: {
  //     mal: MalModal(),
  //     ani: AniModal()
  //   }
  // }

  message = (data, api, msg) => {
    console.log('MSG', 'data', data, 'msg', msg, this.vApi);
    if(!msg.data) return;
    if(msg.data?.type && msg.data?.type === 'PREVIEW_INSTANTIATE_DIFF') return;
    console.log('Message from window!', msg.data);
    data('', msg.data);
    // data.i = msg.data;
    {
      this.el[this.vApi.name].window?.postMessage({MSG:`Код ${this.vApi.name} получен, данная вкладка будет закрыта через 5 секунд`}, '*');
      setTimeout(() => {
        this.el[this.vApi.name].window && this.el[this.vApi.name].window?.postMessage({type:'close'}, '*');
        // window.removeEventListener('message', this.message(data, msg, api)
        // );
      }, 5000);
    }
  };

  api = {
    item: (path, api) => {
      //const o = this.o;
      console.log('123', this);
      const modal = {};
      // import {MalModal} from '../api/mal/modal.js';
      // import {AniModal} from '../api/ani/modal.js';
      // const modal = new this.cls.modal[this.vApi.name]({o:this.o, el:this.el});
      console.log('QQQ', modal)
      // const arr = new this.ap[api]({o:o}).arr(api);
      El.Div({
        path: path,
        class: 'pad-list flx ver',
        func: (s) => {
          El.Div({
            path: s,
            class: 'header',
            text: '['+this.vApi.name.toUpperCase()+']'
          });

          El.Div({
            path: s,
            class: 'pad-item flx ver',
            func: (itm) => {
              El.Div({
                path: itm,
                class: 'pad-item flx ver',
                func: (s) => {
                  El.Div({
                    path: s,
                    class: 'flx gap-5',
                    func: (l) => {
                      El.Div({
                        path: l,
                        class: 'sub-header',
                        text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['requrements'].title[0]
                      });
                      El.Button({
                        path: l,
                        class: '-btn',
                        text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['requrements'].check[2],
                        onclick: (e) => {
                          this.api.tk.requrements(this.el[this.vApi.name].requrements, api, this.arr(api));
                        }
                      });
                    }
                  });
                  El.Div({
                    path: s,
                    class: 'pad-list flx ver',
                    func: (l) => {
                      El.Div({
                        path: l,
                        class: 'flx ver',
                        func: (l) => {
                          this.el[this.vApi.name].requrements = l;
                          this.api.tk.requrements(l, api, this.arr(api));
                        }
                      });
                    }
                  });
                }
              });

              El.Div({
                path: itm,
                class: 'pad-item flx ver',
                func: (tkStatus) => {
                  El.Div({
                    path: tkStatus,
                    class: 'flx gap-5',
                    func: (l) => {
                      El.Div({
                        path: l,
                        class: 'sub-header',
                        text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].title[0]
                      });
                      El.Button({
                        path: l,
                        class: '-btn',
                        text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].check[2],
                        onclick: (e) => {
                          console.log('CHECK', api)
                          this.api.tk.status(this.el[this.vApi.name].tokensStatus, api, this.arr(api));
                        }
                      });
                    }
                  });
                  El.Div({
                    path: tkStatus,
                    class: 'pad-list flx ver',
                    func: (pl) => {
                      El.Div({
                        path: pl,
                        class: 'flx ver',
                        func: (l) => {
                          this.el[this.vApi.name].tokensStatus = l;
                          this.api.tk.status(l, api, this.arr(api));
                        }
                      });
                    }
                  });
                }
              });

              El.Div({
                path: itm,
                class: 'pad-item flx ver',
                func: (tkFunctions) => {
                  El.Div({
                    path: tkFunctions,
                    class: 'sub-header',
                    text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['functions'].title[0]
                  });
                  El.Div({
                    path: tkFunctions,
                    class: 'pad-list flx ver',
                    func: (pl) => {
                      El.Div({
                        path: pl,
                        class: 'gap-5 flx ver',
                        func: (l) => {
                          this.el[this.vApi.name].tokensFunctions = l;
                          this._api.tk.functions(l, api);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
      // El.Div({
      //   path: path,
      //   class: 'pad-list flx ver',
      //   func: (s) => {
      //     El.Div({
      //       path: s,
      //       class: 'header',
      //       text: '['+api.toUpperCase()+']'
      //     });
      //     El.Div({
      //       path: s,
      //       class: 'pad-list flx ver',
      //       func: (l) => {
      //         El.Div({
      //           path: l,
      //           class: 'flx ver',
      //           func: (l) => {
      //             requrements;
      //           }
      //         });
      //       }
      //     });

      //     El.Div({
      //       path: s,
      //       class: 'item pad-list',
      //       text: appModal.lang[o.cfg.helper.lang].helper['tokens api']['functions'].title[0],
      //       func: (l) => {
      //         functions
      //       }
      //     });
      //   }
      // });
    },
    info: (path) => {
      this.o.cfg.api.info.forEach(e => {
        El.Div({
          path: path,
          class: 'header pad-item',
          text: JSON.stringify(e),
          func: () => {}
        });
      });
    },
    tk: {
      requrements: (path, api, arr) => {
        if(path.children.length) path.replaceChildren();
        const checker = (arr, target) => target.every(v => arr.includes(v));
        if(checker(arr.checkTrue, arr.must)) El.Div({
          path: path,
          class: 'item ok pad-item flx',
          text: this.lang[this.o.cfg.helper.lang].helper['tokens api']['requrements'].status.all[0]
        });
        else{
          if(arr.checkTrue.length) El.Div({
            path: path,
            class: 'item ok pad-item flx',
            text: arr.checkTrue.join(', ')
          });
          if(arr.checkFalse.length) El.Div({
            path: path,
            class: 'item notOk pad-item flx',
            text: arr.checkFalse.join(', ')
          });
        }
      },
      status: (path, api, arr) => {
        if(path.children.length) path.replaceChildren();
        const checker = (arr, target) => target.every(v => arr.includes(v));
        El.Div({
          path: path,
          class: 'pad-list flx ver',
          func: (l) => {
            if(checker(arr.tokensTrue, arr.tokens)){
              El.Div({
                path: l,
                class: 'item ok flx',
                text: arr.tokensTrue.join(', ')
              });

              if(this.vApi.secrets.accToken){
                const k = new Ut().token.parseJwt(this.vApi.secrets.accToken).exp;
                const status = new Ut().token.keyLength(k*1000, 10);
                console.log('KK', k);
                console.log('TK', status);
                El.Div({
                  path: l,
                  class: 'pad-list flx',
                  func: (l) => {
                    if(status.ok) El.Div({
                      path: l,
                      class: 'item ok flx',
                      text: [
                        status.token.timer,
                        this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status['days'][0], this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status.left[0]
                      ].join(' ')
                    });
                    else
                    if(status.needUpd) El.Div({
                      path: l,
                      class: 'item notOk flx',
                      text: [
                        status.token.timer,
                        this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status['days'][0], this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status.update[0]
                      ].join(' ')
                    });
                    else
                    if(status.needNew) El.Div({
                      path: l,
                      class: 'item notOk flx',
                      text: [
                        status.token.timer,
                        this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status['days'][0], this.lang[this.o.cfg.helper.lang].helper['tokens api']['tokens status'].status.expired[0]
                      ].join(' ')
                    });
                  }
                });
              }
            }
            else{
              if(arr.tokensTrue.length) El.Div({
                path: l,
                class: 'item ok flx',
                text: arr.tokensTrue.join(', ')
              });
              if(arr.tokensFalse.length) El.Div({
                path: l,
                class: 'item notOk flx',
                text: arr.tokensFalse.join(', ')
              });
            };
          }
        });
      }
    }
  }
};
