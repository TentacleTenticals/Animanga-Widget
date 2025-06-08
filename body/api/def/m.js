import {El} from '../../../base/classes/m.js';
import {MalFc as MalApi} from '../../../api/mal/fc.js';
import {AniFc as AniApi} from '../../../api/ani/fc.js';
import {Modal} from './modal.js';
import {Ut} from '../../../funcs/utils.js';

export class Def{
  lang = {
    type: (item, v) => {
      if(!item.title && !v) return 1;
      else
      if(!item.title && v) return v;
      else
      if(item.title && v){
        switch(item.title){
          case '0':
          case 'lg': return 0;
          case '1':
          case 'sh': return 1;
          case '2':
          case 'ico': return 2;
          // default: return item.title;
        }
      }else
      if(item.title === 'lg') return 0;
      else
      if(item.title === 'sh') return 1;
    },
    en: {
      status: ['Status', 'St', '📶', 'Status'],
      reload: ['Reload', 'Rl', '🔃', 'Reload'],
      save: ['Save', 'Sav', '💾', 'Save']
    },
    ru: {
      status: ['Статус', 'Ст', '📶', 'Статус'],
      reload: ['Reload', 'Rl', '🔃', 'Reload'],
      save: ['Сохранить', 'Сохр', '💾', 'Сохранить']
    }
  };
  modal = {
    Build: class extends Modal {
      constructor(_){
        super();
        this.args = _;
        this.o = _.o;

        // function mixin(target, ...sources){
        //   for(const source of sources){
        //     for(const key of Object.keys(source)){
        //       // console.log('Q', source[key])
        //       target[key] = source[key];
        //     }
        //   }
        //   return target;
        // }
        // function extend(target, source) {
        //   console.log(
        //     Object.getOwnPropertyNames(source.prototype)
        //     // .filter(key => {
        //     //   console.log('K', key)
        //     // })
        //   )
        //   Object.getOwnPropertyNames(source.prototype)
        //     .filter((key) => !~['constructor', 'prototype'].indexOf(key))
        //     .forEach((key) => {
        //       console.log('KEY', key)
        //       Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source.prototype, key));
        //     });
        // }
        // for(const api in this.o.cfg.api.list){
        //   console.log('API', this.ap[api]);
        //   extend(this, this.ap[api]);
        // }
        // console.log('BUILDER', this);
      }
      o = this.o;
      main = (path) => {
        const o = this.o;
        El.Div({
          path: path,
          class: 'header',
          text: 'Status',
          func: () => {}
        });
        El.Div({
          path: path,
          class: 'list flx ver',
          text: 'list',
          func: (l) => {
            // El.Div({
            //   path: l,
            //   class: 'info pad-item flx ver',
            //   func: (info) => {
            //     El.Div({
            //       path: info,
            //       class: 'header',
            //       text: this.lang[o.cfg.helper.lang].helper['info api'].title[0],
            //       title: this.lang[o.cfg.helper.lang].helper['info api'].title[3]
            //     });
            //     El.Div({
            //       path: info,
            //       class: 'list flx ver',
            //       func: (l) => {
            //         this.api.info(l);
            //       }
            //     });
            //   }
            // });
    
            El.Div({
              path: l,
              class: 'info pad-item flx ver',
              func: (info) => {
                El.Div({
                  path: info,
                  class: 'header',
                  text: this.lang[o.cfg.helper.lang].helper['tokens api'].title[0],
                  title: this.lang[o.cfg.helper.lang].helper['tokens api'].title[3]
                });
                El.Div({
                  path: info,
                  class: 'pad-list flx ver',
                  func: (s) => {
                    // if(s.children.length) s.replaceChildren();
                    // this.api.list(s);

                    for(const api of o.cfg.api.list){
                      console.log('API', api);
                      this.api.item(s, api);
                    }
                  }
                });
                // tokensapi
                // info.textContent = text;
              }
            });
          }
        });
      };
    }
  };
  run = (o) => {
    const runs = [];
    for(const e of o.cfg.api.list){
      if(!e.info.active) continue;
      switch(e.name){
        case 'mal': {
          runs.push(
            new MalApi().fc.search.item.m({
              type: o.type,
              title: o.title,
              query: {
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets,
              textMatch: o.cfg.textMatch
            }).then(
              res => {
                if(!res) throw new Ut().MyError(['[MAL Load]', 'No data']);
                if(e.main){
                  console.log('MAL is main');
                  o.s.save.myRating = res.my_list_status?.score||0;
                  if(o.type === 'anime'){
                    o.s.save.watchedEps = res.my_list_status?.num_episodes_watched||0;
                  }else{
                    o.s.save.readedVol = res.my_list_status?.num_volumes_read||0;
                    o.s.save.readedCh = res.my_list_status?.num_chapters_read||0;
                  }
                };

                console.log('MAL RESULT', res);
                o.s.mal.id = res.id;
                o.s.mal.rating = res.mean;
                o.s.mal.link = new MalApi().link.item(o.type, res.id);
                o.s.mal.popularity = res.popularity;
                o.s.mal.title = res.title;

                if(o.type === 'anime'){
                  o.s.mal.episodes = res.num_episodes||0;
                }else{
                  o.s.mal.volumes = res.num_volumes||0;
                  o.s.mal.chapters = res.num_chapters||0;
                }
                o.s.mal.status = res.status||'';
                o.s.mal.broadcast = res.broadcast||'';
                
                if(res.my_list_status){
                  const my = res.my_list_status;
                  console.log('MAL SCORE', my);
                  o.s.save.statusItem = my.status||undefined;
                  o.s.save.myRating = my.score||0;

                  if(o.type === 'anime'){
                    o.s.save.watchedEps = my.num_episodes_watched||0;
                  }else{
                    o.s.save.readedVol = my.num_volumes_read||0;
                    o.s.save.readedCh = my.num_chapters_read||0;
                  }
                }
                console.log('RRRRRRRR', o.s);
              }
            )
          )
        }
        break;
        case 'ani': {
          if(o.s.mal){
            console.log('OS', o.s.mal);
            if(o.s.mal.id) console.log('IDDDDDD', o.s.mal.id);
          }
          runs.push(
            new AniApi().fc.search.item.m({
              type: o.type,
              title: o.title,
              query: {
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets,
              textMatch: o.cfg.textMatch
            }).then(
              res => {
                console.log('ANI RES', res);
                if(!res) throw new Ut().MyError(['[MAL Load]', 'No data']);
                if(e.main){
                  const round10 = (num) => num && Math.round(num / 10) * 10;
                  const full = (num) => num | 0;
                  // full(15 / 10);
                  console.log('ANI is main');
                  o.s.save.myRating = res.mediaListEntry?.score;
                  if(o.type === 'anime'){
                    o.s.save.watchedEps = res.mediaListEntry?.progress||0;
                  }else{
                    o.s.save.readedVol = res.mediaListEntry?.progressVolumes||0;
                    o.s.save.readedCh = res.mediaListEntry?.progress||0;
                  }
                };

                o.s.ani.id = res.id;
                o.s.ani.rating = res.meanScore;
                o.s.ani.link = new AniApi().link.item(o.type, res.id);
                // o.s.ani.popularity = res.popularity;
                // o.s.ani.title = res.title;
                // if(o.type === 'anime'){
                //   o.s.ani.watchedEps = res.my_list_status?.num_episodes_watched||0;
                //   o.s.ani.episodes = res.num_episodes||0;
                // }else{
                //   o.s.ani.readedVol = res.my_list_status?.num_volumes_read||0;
                //   o.s.ani.readedCh = res.my_list_status?.num_chapters_read||0;
                //   o.s.ani.volumes = res.num_volumes||0;
                //   o.s.ani.chapters = res.num_chapters||0;
                // }
                // o.s.ani.status = res.status||'';
                // o.s.ani.broadcast = res.broadcast||'';
                // o.s.ani.statusItem = res.my_list_status?.status||undefined;
                // o.s.ani.myRating = res.my_list_status?.score||0;
              }
            )
          )
        }
      }
    };
    Promise.allSettled(runs).then(
      response => {
        console.log('Ok');
      }
    )
  };
  save = (o, save) => {
    for(const e of o.cfg.api.list){
      if(!e.save.active) continue;
      switch(e.name){
        case 'mal': {
          const status = () => {
            if(o.s.mal.statusItem === 'repeating') return 'completed';
            else
            return o.s.mal.statusItem||(o.type === 'anime' ? 'watching':'reading')
          };
          new MalApi().user.list.upd({
            type: o.type,
            id: o.s.mal.id,
            secrets: e.secrets,
            data: {
              status: status(),
              score: o.s.mal.myRating,
              // priority: o.s.mal.priority,
              ...(o.type === 'anime' && {
                num_watched_episodes: o.s.mal.watchedEps,
                is_rewatching: o.s.mal.repeating
              }),
              ...(o.type === 'manga' && {
                num_volumes_read: o.s.mal.volumes,
                num_chapters_read: o.s.mal.chapters,
                is_rereading: o.s.mal.repeating
              })
            },
          }).then(
            sav => {
              console.log('[MAL Widget] UPDATE', sav);
              const time = El.getTime(sav?.updated_at, 'full');
              save.target.textContent = 'Saved ✅';
              // if(o.s.mal.statusItem !== sav.status) o.s.mal.statusMal = sav.status;
              // time && (o.s.me.updatedAt = time.date+' '+time.time);
              setTimeout(() => {
                save.target.textContent = 'Save';
              }, 5000);
            }
          )
        }
      }
    };
  };
  build = (p, line, string, item, el, o) => {
    switch(item.n){
      case 'reload': El.Button({
        path: p,
        attrs: [item.align && ['i-align', item.align], item.style && ['i-style', item.style]],
        class: ['reload', 'def', '-item', item.pos && ' -'+item.pos||'', 'flx'].join(' '),
        text: this.lang[item.lang||string.lang||line.lang]['reload'][this.lang.type(item, 2)],
        title: this.lang[item.lang||string.lang||line.lang]['reload'][3],
        func: (e) => {
          el.def.reload = e;
          el.def.runner = () => this.run(o);
          p.closest('#animanga-widget').addEventListener('rel', () => {
            console.log('q', el.def.reload)
            // el.def.reload.focus();
            this.run(o);
          });
        },
        onclick: () => {
          console.log('YO!', o);
          this.run(o);
        }
      });
      break;
      case 'save': El.Div({
        path: p,
        attrs: [item.align && ['i-align', item.align], item.style && ['i-style', item.style]],
        class: ['reload', 'def', '-item', item.pos && ' -'+item.pos||'', 'flx'].join(' '),
        text: this.lang[item.lang||string.lang||line.lang]['save'][this.lang.type(item, 2)],
        title: this.lang[item.lang||string.lang||line.lang]['save'][3],
        func: (e) => el.def.save = e,
        onclick: (btn) => {
          this.save(o, el.def.save);
        }
      });
      break;
      case 'status': 
        const _this = this;
        
        El.Div({
          path: p,
          classes: ['widgetStatus', 'def', '-item', item.pos && ' -'+item.pos||'', 'flx'],
          text: this.lang[item.lang||string.lang||line.lang]['status'][this.lang.type(item, 2)],
        title: this.lang[item.lang||string.lang||line.lang]['status'][3],
          onclick: (e) => {
            if(!e.target.className.match('-item')) return;
            console.log('Lol', e.target)
            if(!e.target.children.length) El.Dialog({
              path: e.target,
              class: 'mdl',
              showM: true,
              delOnclose: true,
              func: (m) => {
                const el = {
                  mal: {},
                  ani: {},
                  shiki: {}
                };
                El.Div({
                  path: m,
                  class: 'mdl widgetStatus flx ver',
                  func: (m) => {
                    // console.log('API', api, classList[api]);
                    new this.modal.Build({o:o}).main(m);
                
                    // window.addEventListener('message', (e) => {
                    //   if(e.data.type && e.data.type === 'PREVIEW_INSTANTIATE_DIFF') return;
                    //   console.log('Message from c!', e.data);
                    //   // console.log('ELL', el)
                    //   if(e.data.code){
                    //     el.MSG.textContent = 'Код получен. Нажмите на кнопку выше для получения токенов';
                    //     if(data) data.code = e.data.code;
                
                    //     el.w?.postMessage({MSG:'Код получен, данная вкладка будет закрыта через 5 секунд'}, '*');
                    //     // el.btnLogin.disabled = true;
                    //     // el.btnToken.disabled = false;
                    //     setTimeout(() => {
                    //       el.w && el.w?.postMessage({type:'close'}, '*');
                    //     }, 5000);
                    //   }
                    // });
                  }
                });
              }
            })
            // e.target.children[0]?.showModal();
          },
          func: (s) => {
          }
        });
      break;
    }
  };
  connect = (type, el, o) => {
    function upd(key, v, e) {
      // console.log(key, v, e);
      switch (key) {
        case 'reload':
          e.el.def.reload.textContent = v;
        break;
      }
    };
    o.s.def = new Proxy(o.data.def, El.ProxyHandler(upd, {el:el, o:o}));
  }
}
