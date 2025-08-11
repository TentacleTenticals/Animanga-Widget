import {El} from '../../base/classes/m.js';
import {default as Modal} from './modal.js';

export default class {
  constructor(o){
    // super();
    console.log('INFO', o);
    // this.args = _;
    this.o = o.o;
    // this.vApi = o.vApi;
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
  //o = this.o;
  main = (path) => {
    El.Div({
      path: path,
      class: 'list flx ver',
      func: (l) => {
        El.Div({
          path: l,
          class: 'info pad-item flx ver',
          func: (info) => {
            El.Div({
              path: info,
              class: 'header',
              text: this.lang[this.o.cfg.helper.lang].helper['tokens api'].title[0],
              title: this.lang[this.o.cfg.helper.lang].helper['tokens api'].title[3]
            });
            El.Div({
              path: info,
              class: 'pad-list api-list flx ver',
              func: async (s) => {
                // const it = await import(`../api/mal/modal.js`)
                for await(const api of this.o.cfg.api.list){
                  console.log('API', api);
                  // const path = "../api/mal/modal.js";
                  switch(api.name){
                    case 'mal': {
                      const item = (await import('../api/mal/modal.js'))//.default({api:api});
                      console.log('ITEM', item);
                      //const modal = Modal//({api:api, o:this.o});
                      const m = Modal(item.default);
                      console.log('Modal', new m({api:api, o:this.o}));
                      //modal.api.item(s)
                      // new Modal().api.item()
                      new m({api:api, o:this.o}).api.item(s)
                    }
                  }
                  // console.log('IT', it);
                  //this.api.item(s, api);
                }
              }
            });
          }
        });
      }
    });
  };
}
