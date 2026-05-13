import {El} from '../../../base/classes/m.js';
import {MalFc as MalApi} from '../../../api/mal/fc.js';
import {AniFc as AniApi} from '../../../api/ani/fc.js';
import {default as Ut} from '../../../funcs/utils.js';
import {default as Func} from '../utilsClass.js';

import {default as Nfo} from '../../modal/m.js';

export class Def extends Func(){
  constructor(o){
    super();
    console.log('OO1', o);
    this.o = o.o;
    this._this = this;
    this.vApi = o.vApi;
  }
  splitter = (o) => {
    const t = o.split('/');
    if(!t.length > 1) return [['lang', t[0]]];
    else
    return [['lang0', t[0]], ['lang1', t[1]], ['lang2', t[2]]];
  };
  attrs = (o) => Object.entries(o).map(e => e[0] === 'lang' ? this.splitter(e[1]) : [[e[0], e[1]]]).flat().filter(e => e[1]);
  lng = (o, n) => {
    const l = o.split('/');
    if(!l.length > 1||!n) return l[0];
    else return l[n] ? l[n] : l[0];
  };
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
      title: ['Animanga Widget', 'AW', '', 'Animaga Widget'],
      status: ['Status', 'St', '📶\ufe0e', 'Status'],
      reload: ['Reload', 'Rl', '🔃\ufe0e', 'Reload'],
      save: ['Save', 'Sav', '💾\ufe0e', 'Save'],
      saveData: ['Last saves', 'LS', '📚\ufe0e', 'Last saves'],
      modal: {
        search: {
          title: ['Search', 'Sr', '', 'Search'],
          toDef: ['Back to def', 'To def', '', 'Back to default title']
        }
      }
    },
    ru: {
      title: ['Animanga Widget', 'AW', '', 'Animaga Widget'],
      status: ['Статус', 'Ст', '📶\ufe0e', 'Статус'],
      reload: ['Reload', 'Rl', '🔃\ufe0e', 'Reload'],
      save: ['Сохранить', 'Сохр', '💾\ufe0e', 'Сохранить'],
      saveData: ['Последние сохранения', 'ПС', '📚\ufe0e', 'Последние сохранения'],
      modal: {
        helper: {
          title: ['Виджет статус', 'AMW Статус', '', '']
        },
        search: {
          title: ['Поиск', 'Пск', '', 'Поиск'],
          toDef: ['Вернуть дефолт', 'Вернуть деф', '', 'Вернуть изначальное значение поиска']
        }
      }
    }
  };
  search = (path, btnMode, item, subLine, line) => {
    // o.search.titleUpd = o.title;
    for(const e of this.o.cfg.api.list){
      if(!e.search) continue;
      switch(e.name){
        case 'mal': {
          return new MalApi().fc.searchNsort.items.byTitle({
            type: this.o.type,
            title: this.o.title,
            secrets: e.secrets,
            textMatch: this.o.cfg.textMatch
          }).then(
            res => {
              console.log('RESOS', path, res);
              // res.results.toSorted((a,b) => (a.result.percents.diff > b.result.percents.diff) ? -1 : ((b.result.percents.diff > a.result.percents.diff) ? 1 : 0))
              if(!btnMode && this.o.search.start.mode === 'bestMatch'){
                const item = res.items[res.sorted.item.ind];
                // console.log('ITEMMMMMM', item)
                // o.title = item.title;
                // o.search.titleUpd = e.item.title;
                this.o.search.malId = item.id;
                this.o.malId = item.id;
                this.o.s.mal.search = res.sorted.result.percents.diff;
                this.run(this.o);
              }else
              // if(res) return res;

              if(btnMode||this.o.search.start.mode === 'modal' || this.o.search.start.mode === 'lowMatch' && !(+res.sorted.result.percents.diff >= +this.o.cfg.textMatch.percents)) El.Dialog({
                path: path,
                class: 'n-search-modal modal flx ver',
                showM: true,
                delOnclose: true,
                func: (m) => {
                  El.Div({
                    path: m,
                    class: 'header flx ver',
                    func: (h) => {
                      El.Div({
                        path: h,
                        class: 'title',
                        text: this.lang[this._this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)].modal.search.title[this.lang.type(item, 0)]
                      });
                      
                      El.Div({
                        path: h,
                        class: 'item flx',
                        func: (h) => {
                          El.Div({
                            path: h,
                            class: 'text',
                            text: this.o.title
                          });
                          El.Button({
                            path: h,
                            text: this.lang[this._this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)].modal.search.toDef[this.lang.type(item, 0)],
                            onclick: () => {
                              this.o.title = this.o.search.titleDef;
                              m.remove();
                              this.search(p, btnMode, item, subLine, line);
                              // h.children[0].textContent = o.title;
                            }
                          });
                        }
                      });
                    }
                  });

                  El.Div({
                    path: m,
                    class: 'list flx ver',
                    func: (l) => {
                      const sort = res.results.toSorted((a,b) => (+a.result.percents.diff > +b.result.percents.diff) ? -1 : ((+b.result.percents.diff > +a.result.percents.diff) ? 1 : 0));
                      sort.forEach(e => {
                        El.Div({
                          path: l,
                          class: 'item flx',
                          onclick: () => {
                            m.remove();
                            const item = res.items[e.item.ind];
                            this.o.title = item.title;
                            // this.o.search.titleUpd = e.item.title;
                            this.o.search.malId = item.id;
                            this.o.malId = item.id;
                            this.o.s.mal.search = e.result.percents.diff;
                            this.run(this.o);
                          },
                          func: (item) => {
                            El.Div({
                              path: item,
                              text: e.item.title
                            });

                            El.Div({
                              path: item,
                              class: 'num',
                              text: e.result.percents.diff+'%'
                            });
                          }
                        })
                      })
                    }
                  });
                }
              })
            }
          )
        }
      }
    }
  };
  run = (o) => {
    const runs = [];
    for(const e of this.o.cfg.api.list){
      if(!e.info.active) continue;
      switch(e.name){
        case 'mal': {
          runs.push(
            (this.o.malId ? new MalApi().fc.search.item.byId({
              type: this.o.type,
              id: this.o.malId,
              query: {
                fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'recommendations', 'related_manga', 'related_anime', 'priority'].join(),
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets
            }) : new MalApi().fc.search.item.m({
              type: this.o.type,
              title: this.o.title,
              query: {
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets,
              textMatch: this.o.cfg.textMatch
            })).then(
              res => {
                if(!res) throw new Ut().MyError(['[MAL Load]', 'No data']);
                // if(e.main){
                //   console.log('MAL is main');
                //   o.s.save.myRating = res.my_list_status?.score||0;
                //   if(o.type === 'anime'){
                //     o.s.save.watchedEps = res.my_list_status?.num_episodes_watched||0;
                //   }else{
                //     o.s.save.readedVol = res.my_list_status?.num_volumes_read||0;
                //     o.s.save.readedCh = res.my_list_status?.num_chapters_read||0;
                //   }
                // };

                console.log('MAL RESULT', res);
                this.o.s.mal.id = res.id;
                this.o.s.mal.rating = res.mean;
                this.o.s.mal.link = new MalApi().link.item(this.o.type, res.id);
                this.o.s.mal.popularity = res.popularity;
                this.o.s.mal.advices = res.recommendations;
                this.o.s.mal.title = res.title;

                if(this.o.type === 'anime'){
                  this.o.s.mal.episodes = res.num_episodes||'?';
                }else{
                  this.o.s.mal.volumes = res.num_volumes||'?';
                  this.o.s.mal.chapters = res.num_chapters||'?';
                }
                this.o.s.mal.status = {
                  status: res.status,
                  broadcast: res.broadcast
                };
                this.o.s.mal.airDay = {
                  status: res.status,
                  broadcast: res.broadcast,
                  // time: res.broadcast?.time
                };
                this.o.s.mal.airTime = {
                  status: res.status,
                  broadcast: res.broadcast
                };
                // this.o.s.mal.broadcast = res.broadcast||'';

                const my = res.my_list_status;
                this.o.s.save.myStatus = my?.status||'';
                this.o.s.save.myRating = my?.score||0;
                this.o.s.mal.updatedAt = my?.updated_at||'';

                if(this.o.type === 'anime'){
                  this.o.s.save.watchedEps = my?.num_episodes_watched||0;
                }else{
                  this.o.s.save.readedVol = my?.num_volumes_read||0;
                  this.o.s.save.readedCh = my?.num_chapters_read||0;
                }

                console.log('COMPLETED!!!!!!!!!', this.o.s.mal);
              }
            )
          )
        }
        break;
        case 'ani': {
          runs.push(
            (this.o.malId ? new AniApi().fc.search.item.byId({
              type: this.o.type,
              idMal: this.o.malId,
              query: {
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets
            }) : new AniApi().fc.search.item.m({
              type: this.o.type,
              title: this.o.title,
              query: {
                limit: 10
              },
              login: e.info.login,
              secrets: e.secrets,
              textMatch: this.o.cfg.textMatch
            })).then(
              res => {
                console.log('ANI RES', res);
                if(!res) throw new Ut().MyError(['[MAL Load]', 'No data']);
                if(e.main){
                  this.o.s.save.myRating = res.mediaListEntry?.score;
                  if(this.o.type === 'anime'){
                    this.o.s.save.watchedEps = res.mediaListEntry?.progress||0;
                  }else{
                    this.o.s.save.readedVol = res.mediaListEntry?.progressVolumes||0;
                    this.o.s.save.readedCh = res.mediaListEntry?.progress||0;
                  }
                };

                this.o.s.ani.id = res.id;
                this.o.s.ani.rating = res.meanScore;
                this.o.s.ani.link = new AniApi().link.item(this.o.type, res.id);
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
    const runs = [];
    for(const e of this.o.cfg.api.list){
      if(!e.save.active) continue;
      if(!e.secrets.accToken) continue;
      switch(e.name){
        case 'mal': {
          if(!this.o.s.mal.id) continue;
          const status = () => {
            if(this.o.s.mal.statusItem === 'repeating') return 'completed';
            else
            return this.o.s.mal.statusItem||(this.o.type === 'anime' ? 'watching':'reading')
          };
          runs.push(new MalApi().user.list.upd({
            type: this.o.type,
            id: this.o.s.mal.id,
            secrets: e.secrets,
            data: {
              status: status(),
              score: this.o.s.mal.myRating,
              // priority: o.s.mal.priority,
              ...(this.o.type === 'anime' && {
                num_watched_episodes: this.o.s.mal.watchedEps,
                is_rewatching: this.o.s.mal.repeating
              }),
              ...(this.o.type === 'manga' && {
                num_volumes_read: this.o.s.mal.volumes,
                num_chapters_read: this.o.s.mal.chapters,
                is_rereading: this.o.s.mal.repeating
              })
            },
          }).then(
            sav => {
              console.log('[MAL Widget] UPDATE', sav);
              const time = El.getTime(sav?.updated_at, 'full');
              time && (this.o.s.mal.updatedAt = time.date+' '+time.time);
            }
          ))
        }
      }
    };
    Promise.allSettled(runs).then(
      results => {
        console.log('[Animanga]:SAVE - saved!');
        save.classList.add('saved');
        // save.textContent = 'Saved ✅';
        // if(o.s.mal.statusItem !== sav.status) o.s.mal.statusMal = sav.status;
        // time && (o.s.me.updatedAt = time.date+' '+time.time);
        setTimeout(() => {
          save.classList.remove('saved');
          // save.textContent = 'Save';
        }, 5000);
      }
    )
  };
  build = (p, line, subLine, item, el, o) => {
    const name = 'def';
    // const _this = this;
    el.run = (o) => this.search(o, p, '', item, subLine, line);
    new (this.class(name, p, line, subLine, item, el, o, this))({o:o, base:this}).check(p, item)
  };
  class = (name, path, line, subLine, item, el, o) => class {
    constructor(o){
      console.log('TH', o)
      this.o = o.o;
      this.base = o.base;
    }
    logo = (path, item) => {
      El.Div({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
        classes: ['n-logo', '-item', '-btn', 'flx'],
        text: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['title'][this.base.lang.type(item, 1)],
        title: +this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2)]['title'][3],
        func: (e) => {
          el.def.title = e;
        },
        onclick: () => {
          console.log('YO!', this.o);
        }
      });
    };
    reload = (path, item) => {
      El.Button({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
        class: ['reload', 'def', '-item', '-btn', item.pos && ' -'+item.pos||'', 'flx'].join(' '),
        text: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['reload'][this.base.lang.type(item, 2)],
        title: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2)]['reload'][3],
        func: (e) => {
          el.def.reload = e;
          el.def.runner = () => this.base.run(this.o);
          path.closest('#animanga-widget').addEventListener('rel', () => {
            console.log('q', el.def.reload)
            // el.def.reload.focus();
            this.base.run(this.o);
          });
        },
        onclick: () => {
          console.log('YO!', this.o);
          this.base.search(path, '', item, subLine, line);
          // this.run(this.o);
        }
      });
    };
    save = (path, item) => {
      El.Button({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
        class: ['n-save', 'def', '-item', '-btn', item.pos && ' -'+item.pos||'', 'flx'].join(' '),
        text: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['save'][this.base.lang.type(item, 2)],
        title: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2)]['save'][3],
        func: (e) => el.def.save = e,
        onclick: (btn) => {
          this.base.save(this.o, el.def.save);
        }
      });
    };
    saveDetails = (path, item) => {
      El.Details({
        path: path,
        classes: ['n-updatedAt', '-itemMini', 'flx', 'ver'],
        attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
        summary: true,
        summaryClass: 'key',
        summaryT: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['saveData'][this.base.lang.type(item, 2)],
        title: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2)]['saveData'][3],
        func: (m) => {
          El.Div({
            path: m,
            class: 'list flx ver',
            func: (m) => {
              for(const i of this.o.cfg.api.list){
                if(i.save.active){
                  El.Div({
                    path: m,
                    class: 'item flx',
                    text: i.name.toUpperCase(),
                    func: (m) => {
                      El.Div({
                        path: m,
                        class: 'value',
                        func: (e) => el[i.name].updatedAt = e
                      });
                    }
                  });
                }
                // El.getTime(sav?.updated_at, 'full')
              }
            }
          });
        }
      });
    };
    status = (path, item) => {
      El.Button({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
        classes: ['widgetStatus', 'def', '-item', '-btn', item.pos && ' -'+item.pos||'', 'flx'],
        text: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['status'][this.base.lang.type(item, 2)],
        title: this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2)]['status'][3],
        onclick: (e) => {
          if(!e.target.className.match('-item')) return;
          if(!e.target.children.length) El.Dialog({
            path: path,
            class: 'n-widget-status modal flx ver',
            showM: true,
            delOnclose: true,
            func: (m) => {
              // console.log(this.base.lang[this.base.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang)]['modal'])
              const el = {
                mal: {},
                ani: {},
                shiki: {}
              };
              El.Div({
                path: m,
                class: 'header flx',
                func: (h) => {
                  El.Div({
                    path: h,
                    class: 'title',
                    text: this.base.langSet.text(item, subLine, line, ['modal.helper.title'], 1)
                  });
                }
              });
              El.Div({
                path: m,
                class: 'flx ver',
                func: (m) => {
                  console.log('VVV', this.base)
                  // console.log('API', api, classList[api]);
                  new Nfo({o:this.o, base:this, vApi:this.base.vApi}).main(m);
              
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
    };
    containers = {
      div: (path, item) => {
        El.Div({
          path: path,
          attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
          classes: ['container', 'flx'],
          func: (i) => {
            item.items.forEach(it => {
              this.check(i, it);
            });
          }
        });
      },
      label: (path, item) => {
        El.Label({
          path: path,
          classes: ['lab', 'flx'],
          attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
          func: (i) => {
            item.items.forEach(it => {
              this.check(i, it);
            });
          }
        })
      },
      itemGroup: (path, item) => {
        if(item.type !== this.o.type) return;
        El.Div({
          path: path,
          classes: ['item-group', 'flx'],
          attrs: [['api', name], ...(item.cfg ? this.base.attrs(item.cfg) : [])],
          func: (i) => {
            item.items.forEach(it => {
              this.check(i, it);
            })
          }
        });
      }
    };
    check = (i, it) => {
      const name = 'def';
      switch(it.n){
        case 'div': this.containers.div(i, it);
        break;
        case 'logo': this.logo(i, it);
        break;
        case 'reload': this.reload(i, it);
        break;
        case 'save': this.save(i, it);
        break;
        case 'saveDetails': this.saveDetails(i, it);
        break;
        case 'status':
          
          this.status(i, it);
        break;
      }
    };
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
    this.o.s.def = new Proxy(this.o.data.def, El.ProxyHandler(upd, {el:el, o:this.o}));
  }
}
