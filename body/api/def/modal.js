import {El} from '../../../base/classes/mjs.js';
import {MalModal} from '../mal/modal.js';
import {AniModal} from '../ani/modal.js';
import {Ut} from '../../../funcs/utils.js';

export class Modal{
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
            }
          },
          ['tokens status']: {
            title: ['Статус токенов', '', '', ''],
            status: {
              days: ['дней', '', '', ''],
              left: ['осталось', '', '', '']
            },
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
  cls = {
    modal: {
      mal: MalModal(),
      ani: AniModal()
    }
  }

  message = (data, api, msg) => {
    console.log('MSG', data, msg, api);
    if(!msg.data) return;
    if(msg.data?.type && msg.data?.type === 'PREVIEW_INSTANTIATE_DIFF') return;
    console.log('Message from window!', msg.data);
    data.i = msg.data;
    {
      this.el[api.name].window?.postMessage({MSG:`Код ${api.name} получен, данная вкладка будет закрыта через 5 секунд`}, '*');
      setTimeout(() => {
        this.el[api.name].window && this.el[api.name].window?.postMessage({type:'close'}, '*');
        window.removeEventListener('message', this.message(data, msg, api));
      }, 5000);
    }
  };

  api = {
    item: (path, api) => {
      const o = this.o;
      const modal = new this.cls.modal[api.name]({o:o, el:this.el});
      console.log('QQQ', modal)
      // const arr = new this.ap[api]({o:o}).arr(api);
      El.Div({
        path: path,
        class: 'pad-list flx ver',
        func: (s) => {
          El.Div({
            path: s,
            class: 'header',
            text: '['+api.name.toUpperCase()+']'
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
                        class: 'header',
                        text: this.lang[o.cfg.helper.lang].helper['tokens api']['requrements'].title[0]
                      });
                      El.Button({
                        path: l,
                        class: 'btn',
                        text: 'Check',
                        onclick: (e) => {
                          this.api.tk.requrements(this.el.requrements, api, modal.arr(api));
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
                          this.el.requrements = l;
                          this.api.tk.requrements(l, api, modal.arr(api));
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
                        class: 'header',
                        text: this.lang[o.cfg.helper.lang].helper['tokens api']['tokens status'].title[0]
                      });
                      El.Button({
                        path: l,
                        class: 'btn',
                        text: 'Check',
                        onclick: (e) => {
                          this.api.tk.status(this.el.tokensStatus, api, modal.arr(api));
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
                          this.el.tokensStatus = l;
                          this.api.tk.status(l, api, modal.arr(api));
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
                    class: 'header',
                    text: this.lang[o.cfg.helper.lang].helper['tokens api']['functions'].title[0]
                  });
                  El.Div({
                    path: tkFunctions,
                    class: 'pad-list flx ver',
                    func: (pl) => {
                      El.Div({
                        path: pl,
                        class: 'gap-5 flx ver',
                        func: (l) => {
                          this.el.tokensFunctions = l;
                          modal._api.tk.functions(l, api);
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
      const o = this.o;
      o.cfg.api.info.forEach(e => {
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
        const o = this.o;
        if(path.children.length) path.replaceChildren();
        const checker = (arr, target) => target.every(v => arr.includes(v));
        if(checker(arr.checkTrue, arr.must)) El.Div({
          path: path,
          class: 'item ok pad-item flx',
          text: this.lang[o.cfg.helper.lang].helper['tokens api']['requrements'].status.all[0]
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
        const o = this.o;
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

              if(api.secrets.accToken){
                const k = new Ut().token.parseJwt(api.secrets.accToken).exp;
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
                        status.token.timer[0],
                        this.lang[o.cfg.helper.lang].helper['tokens api']['tokens status'].status[status.token.timer[1]][0], this.lang[o.cfg.helper.lang].helper['tokens api']['tokens status'].status.left[0]
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
