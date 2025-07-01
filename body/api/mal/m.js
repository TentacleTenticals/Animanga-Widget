import {El} from '../../../base/classes/m.js';
import {MalApi} from '../../../api/mal/m.js';
import {Def} from '../def/m.js';
import {default as Base} from '../class.js';
import {default as Func} from '../utilsClass.js';

export class Mal extends Func(){
  lang = {
    en: {
      id: ['ID', 'ID', '🆔\ufe0e', 'MAL ID'],
      status: {
        title: ['Status', 'St', '⏳\ufe0e', 'Status'],
        value: {
          currently_airing: ['Airing', 'Air'],
          currently_publishing: ['Publishing', 'Pub'],
          finished_airing: ['Finished', 'Fin'],
          finished_publishing: ['Finished', 'Fin']
        }
      },
      myRating: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
      rating: {
        title: ['Rating', 'Rt', '💣\ufe0e', 'Rating'],
        my: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
      },
      popularity: ['Popularity', 'Pop-ty', '🔥\ufe0e'],
      air: {
        title: ['Broadcast', 'Brod', '🗓️\ufe0e', 'Air date'],
        day: {
          monday: ['Monday', 'Mon', ''],
          tuesday: ['Tuesday', 'Tue', ''],
          wednesday: ['Wednesday', 'Wed', ''],
          thursday: ['Thursday', '', 'Thu'],
          friday: ['Friday', 'Fri', ''],
          saturday: ['Saturday', 'Sat', ''],
          sunday: ['Sunday', 'Sun', '']
        },
        time: []
      },
      advices: ['Рекомендации', 'Рек', '-', 'Рекомендации'],
      link: ['Link', 'Link', '🔗', 'Link'],
      item: {
        title: ['', '', '', 'Title'],
        search: ['', '', '', 'Search']
      },
      statusItem: {
        value: {
          currently_airing: ['Airing', 'Air'],
          currently_publishing: ['Publishing', 'Pub'],
          finished_airing: ['Finished', 'Fin'],
          finished_publishing: ['Finished', 'Fin']
        }
      },
      anime: {
        plusEps: ['', '', '', ''],
        status: {
          title: ['Status', 'St', '⏳\ufe0e', 'Status'],
          value: {
            not_yet_aired: ['Not aired', 'Not Air'],
            currently_airing: ['Airing', 'Air'],
            finished_airing: ['Finished', 'Fin']
          },
          my: [
            ['-', undefined],
            ['Watching', 'watching'],
            ['Completed', 'completed'],
            ['On hold', 'on_hold'],
            ['Dropped', 'dropped'],
            ['Plan to watch', 'plan_to_watch'],
            ['Repeating', 'repeating']
          ]
        },
        title: ['Watched:', 'Watch:', '📽️'],
        episodes: {
          my: ['Episodes', 'Eps', '🎞️', 'Watched episodes'],
          num: ['', '', '', 'Episodes'],
        }
      },
      manga: {
        readed: ['Readed:', 'Rdd:', '📖', 'Readed'],
        readedVol: ['Volume', 'Vol'],
        volumes: ['Volumes', 'Vol', '', 'Volumes'],
        readedCh: ['Chapter', 'Ch'],
        chapters: ['Chapters', 'Ch', ''],
        statusItem: {
          title: ['Статус', '', '', 'Статус чтения'],
          options: [
            ['-', undefined],
            ['Reading', 'reading'],
            ['Completed', 'completed'],
            ['On hold', 'on_hold'],
            ['Dropped', 'dropped'],
            ['Plan to read', 'plan_to_read'],
            ['Repeating', 'repeating']
          ]
        }
      }
    },
    ru: {
      id: ['ID', 'ID', '🆔\ufe0e', 'MAL ID'],
      status: ['Статус', 'Ст', '⏳\ufe0e', 'Статус'],
      rating: {
        title: ['Рейтинг', 'Рт', '💣\ufe0e', 'Рейтинг'],
        my: ['Мой рейтинг', 'МойРт', '🔥\ufe0e', 'Мой рейтинг'],
      },
      popularity: ['Популярность', 'Поп-ть', '🔥\ufe0e'],
      air: {
        title: ['Дата выхода', 'ДатаВых', '🗓️\ufe0e', 'Дата выхода'],
        day: {
          monday: ['Понедельник', 'Пн', ''],
          tuesday: ['Вторник', 'Вт', ''],
          wednesday: ['Среда', 'Ср', ''],
          thursday: ['Четверг', 'Чт', ''],
          friday: ['Пятница', 'Пт', ''],
          saturday: ['Суббота', 'Сб', ''],
          sunday: ['Воскресенье', 'Вс', '']
        },
        time: []
      },
      advices: ['Рекомендации', 'Рек', '🗳️\ufe0e', 'Рекомендации'],
      link: ['Ссылка', 'Слк', '🔗', 'Ссылка'],
      item: {
        title: ['', '', '', 'Название тайтла'],
        search: ['', '', '', 'Процент совпадения названия']
      },
      anime: {
        title: ['Просмотрено:', 'Watch:', '📽️', 'Просмотрено'],
        status: {
          value: {
            not_yet_aired: ['Не началось', 'Не нач'],
            currently_airing: ['Выходит', 'Вых'],
            finished_airing: ['Закончено', 'Зак']
          },
          my: [
            ['-', undefined],
            ['Смотрю', 'watching'],
            ['Просмотрено', 'completed'],
            ['Приостановлено', 'on_hold'],
            ['Брошено', 'dropped'],
            ['Планирую посмотреть', 'plan_to_watch'],
            ['Повтор', 'repeating']
          ]
        },
        episodes: {
          my: ['Просмотрено эпизодов', 'ПрЭп', '🎞️', 'Просмотрено эпизодов'],
          num: ['Всего эпизодов', 'Кол-во эп', '', 'Всего эпизодов'],
          plus: ['+ эп', 'Ув', '➕\ufe0e', '+ эпизод'],
          minus: ['- эп', 'Ум', '➖\ufe0e', '- эпизод']
        }
      },
      manga: {
        title: ['Прочтено:', 'Прчт:', '📖', 'Статус прочтения манги'],
        status: {
          value: {
            currently_publishing: ['Публикуется', 'Пуб'],
            finished: ['Закончено', 'Зак']
          },
          my: [
            ['-', undefined],
            ['Читаю', 'reading'],
            ['Прочитано', 'completed'],
            ['Приостановлено', 'on_hold'],
            ['Брошено', 'dropped'],
            ['Планирую прочитать', 'plan_to_read'],
            ['Повтор', 'repeating']
          ]
        },
        chapters: {
          title: ['Главы', 'Главы', 'Г', 'Главы'],
          plus: ['+ том', 'Ув', '➕\ufe0e', '+ том'],
          minus: ['- том', 'Ум', '➖\ufe0e', '- том'],
          my: ['Глава', 'Глв', '', 'Прочитанные главы'],
          num: ['Всего глав', 'Кол-во гл', '', 'Всего глав']
        },
        volumes: {
          title: ['Тома', 'Тома', 'Т', 'Тома'],
          my: ['Volume', 'Vol', '', 'Прочитанные тома'],
          num: ['Всего томов', 'Кол-во тм', '', 'Всего томов'],
          plus: ['+ глава', '+ гл', '➕\ufe0e', '+ глава'],
          minus: ['- глава', '- гл', '➖\ufe0e', '- глава']
        }
      }
    }
  };
  class = (path, name, line, subLine, item, el, o, _this) => class extends Base(path, name, line, subLine, item, el, o, this) {
    check = (path, item) => {
      switch(item.n){
        case 'div': this.containers.div(path, item);
        break;
        case 'label': this.containers.label(path, item);
        break;
        case 'itemGroup': this.containers.itemGroup(path, item);
        break;

        case 'advices': this.other.advices(path, item);
        break;

        case 'status.my': this[o.type].inputs.myStatus(path, item);
        break;
        case 'rating.my': this.other.myRating(path, item);
        break;

        case 'rating.my.title': this.other.title.myRating(path, item);
        break;

        case 'anime.titleWatched': this.anime.title.main(path, item);
        break;
        case 'anime.titleEps': this.anime.title.eps(path, item);
        break;
        case 'anime.episodes.my': this.anime.inputs.episodes.watched(path, item);
        break;
        case 'anime.episodes.num': this.anime.inputs.episodes.max(path, item);
        break;
        case 'anime.episodes.plus': this.anime.inputs.episodes.plus(path, item);
        break;
        case 'anime.episodes.minus': this.anime.inputs.episodes.minus(path, item);
        break;

        case 'manga.title': this.manga.title.main(path, item);
        break;
        case 'manga.volumes.title': this.manga.title.vol(path, item);
        break;
        case 'manga.volumes.my': this.manga.inputs.volumes.readed(path, item);
        break;
        case 'manga.volumes.num': this.manga.inputs.volumes.max(path, item);
        break;
        case 'manga.volumes.plus': this.manga.inputs.volumes.plus(path, item);
        break;
        case 'manga.volumes.minus': this.manga.inputs.volumes.minus(path, item);
        break;

        case 'manga.chapters.title': this.manga.title.ch(path, item);
        break;
        case 'manga.chapters.my': this.manga.inputs.chapters.readed(path, item);
        break;
        case 'manga.chapters.num': this.manga.inputs.chapters.max(path, item);
        break;
        case 'manga.chapters.plus': this.manga.inputs.chapters.plus(path, item);
        break;
        case 'manga.chapters.minus': this.manga.inputs.chapters.minus(path, item);
        break;

        case 'id': this.other.id(path, item);
        break;
        case 'rating': this.other.rating(path, item);
        break;
        case 'popularity': this.other.popularity(path, item);
        break;

        case 'status': this.other.status(path, item);
        break;
        case 'air.title': this.other.air.title(path, item);
        break;
        case 'air.day': this.other.air.day(path, item);
        break;
        case 'air.time': this.other.air.time(path, item);
        break;

        case 'link': this.other.link(path, item);
        break;

        case 'item.title': this.other.title.item(path, item);
        break;
        case 'item.search': this.other.title.search(path, item);
        break;
      }
    };
    other = {
      id: (path, item) => {
        this.items.btn(path, item, {
          key: ['id', 'id'],
          func: (e) => {
            El.A({
              path: e,
              classes: ['value', 'flx'],
              func: (e) => el[name].id = e
            })
          },
          onclick: (e) => e.target.children[0]?.click()
        });
      },
      rating: (path, item) => {
        this.items.keyVal(path, item, {
          key: ['rating.title', 'rating'],
          ttl: 2
        });
      },
      popularity: (path, item) => {
        this.items.keyVal(path, item, {
          key: ['popularity', 'popularity'],
          ttl: 2
        });
      },
      status: (path, item) => {
        this.items.val(path, item, {
          key: ['status', 'status'],
          type: 'part'
        });
      },
      air: {
        title: (path, item) => {
          this.items.item(path, item, {
            key: ['air.title', ''],
            type: 'part'
          });
        },
        day: (path, item) => {
          this.items.val(path, item, {
            key: ['air.day', 'airDay'],
            type: 'part'
          });

          // El.Div({
          //   path: path,
          //   attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
          //   classes: ['n-'+'broadcast', '-item', 'flx'],
          //   func: (b) => {
          //     if(!el[name].broadcast) el[name].broadcast = {};
          //     El.Div({
          //       path: b,
          //       class: 'key',
          //       text: this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang), o.type, 'broadcast', _this.lang.type(item, 2)]),
          //       title: this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2), o.type, 'broadcast', 3])
          //     });
          //     El.Div({
          //       path: b,
          //       class: 'day key-value',
          //       func: (e) => {
          //         el[name].broadcast.day = e;
          //       }
          //     });
          //     El.Div({
          //       path: b,
          //       class: 'time key-value',
          //       func: (e) => {
          //         el[name].broadcast.time = e;
          //       }
          //     });
          //   }
          // });
        },
        time: (path, item) => {
          this.items.val(path, item, {
            key: ['air.time', 'airTime'],
            type: 'part'
          });
        },
      },
      advices: (path, item) => {
        this.items.btn(path, item, {
          key: ['advices', 'advices'],
          func: (e) => {
            El.Div({
              path: e,
              class: 'num',
              func: (e) => el[name].advices = e
            })
          },
          onclick: (e) => {
            El.Dialog({
              path: path,
              class: 'n-advices modal flx ver',
              showM: true,
              delOnclose: true,
              func: (e) => {
                El.Div({
                  path: e,
                  class: 'header',
                  text: [this.lng.text(item, subLine, line, {key:['advices'], num:3}, o), ' ', o.s.mal.advices.length].join('')
                });
                El.Div({
                  path: e,
                  class: 'list flx ver',
                  func: (list) => {
                    if(!o.s.mal.advices) return;
                    const url = new MalApi().title;
                    o.s.mal.advices.forEach(e => {
                      El.Div({
                        path: list,
                        class: 'item flx ver',
                        func: (item) => {
                          El.A({
                            path: item,
                            class: 'title',
                            text: e.node.title,
                            url: url+o.type+'/'+e.node.id
                          });
                          El.Div({
                            path: item,
                            func: (mask) => {
                              El.Image({
                                path: mask,
                                url: e.node.main_picture.medium
                              });
                            }
                          });
                        }
                      });
                    })
                  }
                })
              }
            })
          }
        })
      },
      link: (path, item) => {
        // El.A({
        //   path: path,
        //   classes: ['n-'+'link', '-item', 'flx'],
        //   attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
        //   text: this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang), o.type, 'link', _this.lang.type(item, 2)]),
        //   func: (e) => {
        //     el[name].link = e;
        //   }
        // });
      },
      title: {
        item: (path, item) => {
          this.items.keyVal(path, item, {
            key: ['item.title', 'title']
          });
          // El.Div({
          //   path: path,
          //   classes: ['n-title-search', '-item', 'flx'],
          //   attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
          //   func: (m) => {
          //     this.itemCh(m, item, {
          //       key: 'title',
          //       classes: ['-item']
          //     });
          //     // El.Div({
          //     //   path: m,
          //     //   classes: ['n-search', 'flx'],
          //     //   func: (e) => el[name].search = e,
          //     //   onclick: () => {
          //     //     new Def().search(o, m, true, item, subLine, line);
          //     //   }
          //     // });
          //   }
          // })
        },
        search: (path, item, obj) => {
          this.items.btn(path, item, {
            key: ['item.search', 'search'],
            func: (e) => el[name].search = e,
            onclick: () => {
              new Def().search(o, path, true, item, subLine, line);
            }
          });
        },
        myRating: (path, item) => {
          // console.log(this.gp(_this.lang, ['ru', 'myRating']))
          this.items.item(path, item, {
            key: ['rating.my', ''],
            num: 2
          });
        }
      },
      myRating: (path, item) => {
        this.items.inputNum(path, item, {
          key: ['rating.my', 'myRating'],
          num: 2
        });
      }
    }
    anime = {
      title: {
        main: (path, item) => {
          this.items.val(path, item, {
            key: ['anime.title', 'watched'],
            classes: ['title', '-miniItem'],
            type: 'mini',
            num: 2
          });
        },
        eps: (path, item) => {
          this.items.val(path, item, {
            key: ['anime.episodes.num', 'watchedEps'],
            type: 'num',
            num: 2
          });
        }
      },
      inputs: {
        myStatus: (path, item) => {
          this.items.inputs.select(path, item, {
            key: ['anime.status.my', 'myStatus'],
            num: 2,
            type: 'mini'
          });
        },
        episodes: {
          watched: (path, item) => {
            this.items.inputNum(path, item, {
              key: ['anime.episodes.my', 'watchedEps'],
              num: 2,
              type: 'mini'
            });
          },
          max: (path, item) => {
            this.items.val(path, item, {
              key: ['anime.episodes.num', 'episodes'],
              text: '?',
              type: 'mini'
            });
          },
          plus: (path, item) => {
            this.items.btn(path, item, {
              key: ['anime.episodes.plus', ''],
              classes: ['numBtn', '-btn'],
              type: 'mini',
              onclick: () => {
                if(o.s.save.watchedEps === undefined) o.s.save.watchedEps = 0;
                o.s.save.watchedEps++;
              }
            });
          },
          minus: (path, item) => {
            this.items.btn(path, item, {
              key: ['anime.episodes.minus', ''],
              classes: ['numBtn', '-btn'],
              type: 'mini',
              onclick: () => {
                if(o.s.save.watchedEps === undefined) o.s.save.watchedEps = 0;
                if(o.s.save.watchedEps === 0) return;
                o.s.save.watchedEps--;
              }
            });
          }
        }
      }
    };
    manga = {
      title: {
        main: (path, item) => {
          this.items.item(path, item, {
            key: ['manga.title', ''],
            num: 2
          });
        },
        vol: (path, item) => {
          this.items.item(path, item, {
            key: ['manga.volumes.title', ''],
            num: 2
          });
        },
        ch: (path, item) => {
          this.items.item(path, item, {
            key: ['manga.chapters.title', ''],
            num: 2
          });
        },
      },
      inputs: {
        myStatus: (path, item) => {
          this.items.inputs.select(path, item, {
            key: ['manga.status.my', 'myStatus'],
            num: 2,
            type: 'mini'
          });
        },
        chapters: {
          readed: (path, item) => {
            this.items.inputNum(path, item, {
              key: ['manga.chapters.my', 'readedCh'],
              num: 2,
              type: 'mini'
            });
          },
          max: (path, item) => {
            this.items.val(path, item, {
              key: ['manga.chapters.num', 'chapters'],
              type: 'mini',
              text: '?'
            });
          },
          plus: (path, item) => {
            this.items.btn(path, item, {
              key: ['manga.chapters.plus', ''],
              type: 'mini incdecBtn',
              onclick: () => {
                if(o.s.save.readedCh === undefined) o.s.save.readedCh = 0;
                o.s.save.readedCh++;
              }
            });
          },
          minus: (path, item) => {
            this.items.btn(path, item, {
              key: ['manga.chapters.minus', ''],
              type: 'mini incdecBtn',
              onclick: () => {
                if(o.s.save.readedCh === undefined) o.s.save.readedCh = 0;
                if(o.s.save.readedCh === 0) return;
                o.s.save.readedCh--;
              }
            });
          },
        },
        volumes: {
          readed: (path, item) => {
            this.items.inputNum(path, item, {
              key: ['manga.volumes.my', 'readedVol'],
              type: 'mini',
              num: 2
            });
          },
          max: (path, item) => {
            this.items.val(path, item, {
              key: ['manga.volumes.num', 'volumes'],
              type: 'mini',
              text: '?'
            });
          },
          plus: (path, item) => {
            this.items.btn(path, item, {
              key: ['manga.volumes.plus', ''],
              type: 'mini incdecBtn',
              onclick: () => {
                if(o.s.save.readedVol === undefined) o.s.save.readedVol = 0;
                o.s.save.readedVol++;
              }
            });
          },
          minus: (path, item) => {
            this.items.btn(path, item, {
              key: ['manga.volumes.minus', ''],
              type: 'mini incdecBtn',
              onclick: () => {
                if(o.s.save.readedVol === undefined) o.s.save.readedVol = 0;
                if(o.s.save.readedVol === 0) return;
                o.s.save.readedVol--;
              }
            });
          },
        },
      },
    };
  };
  build = (p, line, subLine, item, el, o) => {
    const name = 'mal';
    const _this = this;

    new (this.class(p, name, line, subLine, item, el, o, _this))().check(p, item);

  };
  connect = (el, o) => {
    const name = 'mal';
    const upd = (key, v, e) => {
      console.log('UPD ' + name, key, v, e);
      if(!e.el[name][key]) return;
      switch (key) {
        case 'rating':
          e.el[name].rating.textContent = v;
        break;
        case 'id':
          e.el[name].id.textContent = v;
          e.el[name].id.href = new MalApi().link.item(o.type, v);
        break;
        case 'link':
          e.el[name].link.href = v;
        break;
        case 'popularity':
          e.el[name].popularity.textContent = v;
        break;
        case 'status': {
          if(!v) return;
          if(!v.status) return;
          const status = {
            not_yet_aired: 'nope',
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].status.parentNode.getAttribute('lang1')||e.el[name].status.parentNode.getAttribute('lang0'),
            lvl: e.el[name].status.parentNode.getAttribute('langLvl')||0
          };

          e.el[name].status.textContent = this.lang[l.lang][o.type].status.value[v.status][l.lvl];
          const st = e.el[name].status.parentNode;
          st.classList.add(status[v.status]);
        }
        break;
        case 'myStatus':
          e.el[name].myStatus.value = v;
        break;
        case 'airDay': {
          if(!v) return;
          if(!v.broadcast) return;

          const status = {
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].airDay.parentNode.getAttribute('lang1')||e.el[name].airDay.parentNode.getAttribute('lang0'),
            lvl: e.el[name].airDay.parentNode.getAttribute('langLvl')||0
          };

          console.log('LANG', l);

          e.el[name].airDay.parentNode.setAttribute('status', status[v.status]);
          e.el[name].airDay.textContent = this.lang[l.lang].air.day[v.broadcast.day_of_the_week][l.lvl];
          // e.el[name].broadcast.time.textContent = v.broadcast.start_time;
        }
        break;
        case 'airTime': {
          if(!v) return;
          if(!v.broadcast) return;

          const status = {
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].airTime.parentNode.getAttribute('lang1')||e.el[name].airTime.parentNode.getAttribute('lang0'),
            lvl: e.el[name].airTime.parentNode.getAttribute('langLvl')||0
          };

          e.el[name].airTime.parentNode.setAttribute('status', status[v.status]);
          e.el[name].airTime.textContent = v.broadcast.start_time;
        }
        break;
        case 'advices':
          console.log('advices', v.length)
          e.el[name].advices.textContent = v.length;
        break;
        case 'title':
          e.el[name].title.textContent = v;
        break;
        case 'search':
          e.el[name].search.textContent = v+'%';
          if(+o.cfg.textMatch.percents > +v) e.el[name].search.setAttribute('status', '-');
          else e.el[name].search.setAttribute('status', '+');
        break;
        case 'watchedEps':
          // console.log('QQ', e.el[name].watchedEps)
          e.el[name].watchedEps.value = v;
          e.el[name].watchedEps.style.width = this.len(v, o.cfg.css.fontSize)
        break;
        case 'myRating':
          e.el[name].myRating.value = v;
          e.el[name].myRating.style.width = this.len(v, o.cfg.css.fontSize)
        break;
        case 'episodes':
          e.el[name].episodes.textContent = v;
        break;
        case 'readedVol':
          e.el[name].readedVol.value = v;
          e.el[name].readedVol.style.width = this.len(v, o.cfg.css.fontSize)
        break;
        case 'volumes':
          e.el[name].volumes.textContent = v;
        break;
        case 'readedCh':
          e.el[name].readedCh.value = v;
          e.el[name].readedCh.style.width = this.len(v, o.cfg.css.fontSize)
        break;
        case 'chapters':
          e.el[name].chapters.textContent = v;
        break;
        case 'updatedAt': {
          if(!v) return e.el[name].updatedAt.textContent = '';
          const d = El.getTime(v, 'full');
          e.el[name].updatedAt.textContent = d.time+' '+d.date;
        }
        break;
      }
      return true;
    };
    o.s[name] = new Proxy(o.data[name], El.ProxyHandler(upd, {el:el, o:o}));

    // o.s[name].myRating && (o.s[name].myRating = 0);
    // if(o.type === 'anime'){
    //   o.s[name].watchedEps && (o.s[name].watchedEps = 0);
    // }
    // if(o.type === 'manga'){
    //   o.s[name].readedVol && (o.s[name].readedVol = 0);
    //   o.s[name].readedCh && (o.s[name].readedCh = 0);
    // }
  };
}
