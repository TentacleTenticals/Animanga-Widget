import {El} from '../../../base/classes/m.js';
import {MalApi} from '../../../api/mal/m.js';
import {Def} from '../def/m.js';

export class Mal{
  gp = (t, path) => path.reduce((r, k) => k ? r[k] : r, t);
  lng = (o, n) => {
    const l = o.split('/');
    if(!l.length > 1||!n) return l[0];
    else return l[n] ? l[n] : l[0];
  };
  splitter = (o) => {
    const t = o.split('/');
    if(!t.length > 1) return [['lang', t[0]]];
    else
    return [['lang0', t[0]], ['lang1', t[1]], ['lang2', t[2]]];
  };
  attrs = (o) => Object.entries(o).map(e => e[0] === 'lang' ? this.splitter(e[1]) : [[e[0], e[1]]]).flat().filter(e => e[1]);
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
      day: {
        monday: ['Monday', 'Mon', ''],
        tuesday: ['Tuesday', 'Tue', ''],
        wednesday: ['Wednesday', 'Wed', ''],
        thursday: ['Thursday', '', 'Thu'],
        friday: ['Friday', 'Fri', ''],
        saturday: ['Saturday', 'Sat', ''],
        sunday: ['Sunday', 'Sun', '']
      },
      statusVal: {
        currently_airing: ['Airing', 'Air'],
        currently_publishing: ['Publishing', 'Pub'],
        finished_airing: ['Finished', 'Fin'],
        finished_publishing: ['Finished', 'Fin']
      },
      anime: {
        id: ['ID', 'ID', '🆔\ufe0e', 'MAL ID'],
        status: ['Status', 'St', '⏳\ufe0e', 'Status'],
        rating: ['Rating', 'Rt', '💣\ufe0e', 'Rating'],
        popularity: ['Popularity', 'Pop-ty', '🔥\ufe0e'],
        broadcast: ['Broadcast', 'Brod', '🗓️\ufe0e'],
        broadcastTime: [],
        link: ['Link', 'Link', '🔗', 'Link'],
        title: ['', '', '', 'Title'],
        myRating: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
      ['myRating-title']: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
        watched: ['Watched:', 'Watch:', '📽️'],
        watchedEps: ['Episodes', 'Eps', '🎞️', 'Watched episodes'],
        episodes: ['', '', '', 'Episodes'],
        statusItem: {
          text: ['Status', '', '', 'Watching status'],
          options: [
            ['-', undefined],
            ['Watching', 'watching'],
            ['Completed', 'completed'],
            ['On hold', 'on_hold'],
            ['Dropped', 'dropped'],
            ['Plan to watch', 'plan_to_watch'],
            ['Repeating', 'repeating']
          ]
        }
      },
      manga: {
        id: ['ID', 'ID', '🆔\ufe0e', 'MAL ID'],
        status: ['Status', 'St', '⏳\ufe0e', 'Status'],
        rating: ['Rating', 'Rt', '💣\ufe0e', 'Rating'],
        popularity: ['Popularity', 'Pop-ty', '🔥\ufe0e'],
        broadcast: ['Broadcast', 'Brod', '🗓️\ufe0e'],
        broadcastTime: [],
        link: ['Link', 'Link', '🔗', 'Link'],
        title: ['', '', '', 'Title'],
        readed: ['Readed:', 'Rdd:', '📖'],
        readedVol: ['Volume', 'Vol'],
        volumes: ['Volumes', 'Vol', '', 'Volumes'],
        readedCh: ['Chapter', 'Ch'],
        chapters: ['Chapters', 'Ch', ''],
        statusItem: {
          text: ['Статус', '', '', 'Статус чтения'],
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
      rating: ['Рейтинг', 'Рт', '💣\ufe0e', 'Рейтинг'],
      popularity: ['Популярность', 'Попул', '🔥\ufe0e', 'Популярность'],
      broadcast: ['Выходит в', 'Вых в', '🗓️\ufe0e', 'Выходит в'],
      broadcastTime: [],
      link: ['Ссылка', 'С-ка', '🔗', 'Ссылка'],
      title: ['', '', '', 'Название тайтла'],
      day: {
        monday: ['Понедельник', 'Пн', ''],
        tuesday: ['Вторник', 'Вт', ''],
        wednesday: ['Среда', 'Ср', ''],
        thursday: ['Четверг', 'Чт', ''],
        friday: ['Пятница', 'Пт', ''],
        saturday: ['Суббота', 'Сб', ''],
        sunday: ['Воскресенье', 'Вс', '']
      },
      statusVal: {
        currently_airing: ['Выходит', 'Вых'],
        currently_publishing: ['Публикуется', 'Пуб'],
        finished_airing: ['Вышло', 'Вы'],
        finished: ['Закончено', 'Зак']
      },
      myRating: ['Мой рейтинг', 'МойРейт', '🔥\ufe0e', 'Мой рейтинг'],
      ['myRating-title']: ['Мой рейтинг', 'МойРейт', '🔥\ufe0e', 'Мой рейтинг'],
      anime: {
        id: ['ID', 'ID', '🆔\ufe0e', 'MAL ID'],
        status: ['Статус', 'Ст', '⏳\ufe0e', 'Статус'],
        rating: ['Рейтинг', 'Рт', '💣\ufe0e', 'Рейтинг'],
        popularity: ['Популярность', 'Попул', '🔥\ufe0e', 'Популярность'],
        broadcast: ['Выходит в', 'Вых в', '🗓️\ufe0e', 'Выходит в'],
        broadcastTime: [],
        link: ['Ссылка', 'С-ка', '🔗', 'Ссылка'],
        title: ['', '', '', 'Название тайтла'],
        myRating: ['Мой рейтинг', 'МойРейт', '🔥\ufe0e', 'Мой рейтинг'],
      ['myRating-title']: ['Мой рейтинг', 'МойРейт', '🔥\ufe0e', 'Мой рейтинг'],
        watched: ['Смотрю:', 'Смт:', '📽️', 'Просмотрено'],
        watchedEps: ['Эпизоды', 'Эп', '🎞️', 'Просмотреннные эпизоды'],
        episodes: ['', '', '', 'Эпизоды'],
        statusItem: {
          text: ['Статус', '', '', 'Статус просмотра'],
          options: [
            ['-', undefined],
            ['Смотрю', 'watching'],
            ['Просмотрено', 'completed'],
            ['Приостановлено', 'on_hold'],
            ['Брошено', 'dropped'],
            ['Планирую посмотреть', 'plan_to_watch'],
            ['Повтор', 'repeating']
          ]
        }
      },
      manga: {
        readed: ['Читаемое:', 'Чит:', '📖', 'Читаемое'],
        readedVol: ['Volume', 'Vol', '', 'Прочитанные тома'],
        volumes: ['Volumes', 'Vol', '', 'Тома'],
        readedCh: ['Chapter', 'Ch', '', 'Прочитанные главы'],
        chapters: ['Chapters', 'Ch', '', 'Главы'],
        statusItem: {
          text: ['Статус', '', '', 'Статус чтения'],
          options: [
            ['-', undefined],
            ['Читаю', 'reading'],
            ['Прочитано', 'completed'],
            ['Приостановлено', 'on_hold'],
            ['Брошено', 'dropped'],
            ['Планирую прочитать', 'plan_to_read'],
            ['Повтор', 'repeating']
          ]
        }
      }
    }
  };
  build = (p, line, string, item, el, o) => {
    const name = 'mal';
    const _this = this;

    class Gr{
      lng = {
        text: (item, string, line, obj, o) => _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||
          line.cfg?.lang), o.type, obj.key])[_this.lang.type(item, 2)]||_this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, obj.key])[1],
        title: (item, string, line, obj, o) => _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, obj.key])[3]
      };
      items = {
        type: (o) => {
          switch(o.type){
            case 'part': return 'itemPart'
            break;
            case 'mini': return 'itemMini'
            break;
            case 'part': return 'itemPart'
            break;
            default: return '-item';
          }
        },
        item: (path, item, obj, text) => {
          El.Div({
            path: path,
            attrs: [
              ['api', name],
              ...(item.cfg ? _this.attrs(item.cfg) : []),
              ...(obj && obj.attrs ? obj.attrs : [])
            ],
            classes: ['n-'+obj.key, this.items.type(obj), 'flx'],
            title: this.lng.title(item, string, line, obj, o),
            func: (i) => {
              El.Div({
                path: i,
                class: 'key',
                text: this.lng.text(item, string, line, obj, o),
                func: (e) => obj.key && (el[name][obj.key] = e)
              });
  
              if(obj.func) obj.func(i);
            }
          });
        },
        val: (path, item, obj) => {
          El.Div({
            path: path,
            attrs: [
              ['api', name],
              ...(item.cfg ? _this.attrs(item.cfg) : []),
              ...(obj && obj.attrs ? obj.attrs : [])
            ],
            classes: ['n-'+obj.key, this.items.type(obj), 'flx'],
            title: this.lng.title(item, string, line, obj, o),
            func: (i) => {
              El.Div({
                path: i,
                class: 'value',
                text: obj?.text,
                func: (e) => el[name][obj.key] = e
              });
            }
          });
        },
        keyVal: (path, item, obj) => {
          El.Div({
            path: path,
            attrs: [
              ['api', name],
              ...(item.cfg ? _this.attrs(item.cfg) : []),
              ...(obj && obj.attrs ? obj.attrs : [])
            ],
            classes: ['n-'+obj.key, this.items.type(obj), 'flx'],
            title: this.lng.title(item, string, line, obj, o),
            func: (i) => {
              El.Div({
                path: i,
                class: 'key',
                text: this.lng.text(item, string, line, obj, o)
              });
  
              El.Div({
                path: i,
                class: 'value',
                text: obj?.text,
                func: (e) => el[name][obj.key] = e
              });
            }
          });
        },
        num: (path, item, obj, text) => {
          El.Div({
            path: path,
            attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : []), ...(obj.attrs ? obj.attrs:[])],
            classes: ['n-'+obj.key, '-itemMini', ...(obj.classes ? obj.classes:[]), '-itemNum', 'flx'],
            title: this.lng.title(item, string, line, obj, o),
            func: (i) => {
              El.Div({
                path: i,
                class: 'value num',
                text: obj.text,
                func: (e) => el[name][obj.key] = e
              });
            }
          });
        },
        inputNum: (path, item, obj) => {
          El.Input({
            path: path,
            classes: ['n-'+obj.key, '-itemMini', 'itemInpNum', 'val'],
            attrs: [
              ['api', name],
              ...(item.cfg ? _this.attrs(item.cfg) : []),
              ...(obj && obj.attrs ? obj.attrs : [])
            ],
            type: 'number',
            value: '0',
            title: this.lng.title(item, string, line, obj, o),
            oninput: (e) => {
              if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
              o.s.save[obj.key] = e.target.value;
            },
            func: (e) => {
              el[name][obj.key] = e;
              if(e.value) e.style.width = +e.value.length*8+'px';
            }
          });
        }
      };
      itemCh(path, item, obj){
        El.Div({
          path: path,
          attrs: [
            ['api', name],
            ...(item.cfg ? _this.attrs(item.cfg) : []),
            ...(obj && obj.attrs ? obj.attrs : [])
          ],
          classes: ['n-'+obj.key, this.items.type(obj), 'flx'],
          title: this.lng.title(item, string, line, obj, o),
          func: (i) => {
            El.Div({
              path: i,
              class: 'key',
              text: this.lng.text(item, string, line, obj, o)
            });

            El.Div({
              path: i,
              class: 'value',
              text: obj?.text,
              func: (e) => el[name][obj.key] = e
            });
          }
        });
      };
      item = (path, item, obj, text) => {
        El.Div({
          path: path,
          attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : []), ...(obj.attrs ? obj.attrs:[])],
          classes: ['n-'+obj.key, '-item', ...(obj.classes ? obj.classes:[]), 'flx'],
          title: this.lng.title(item, string, line, obj, o),
          func: (i) => {
            El.Div({
              path: i,
              class: 'value',
              text: this.lng.text(item, string, line, obj, o)
            });
          }
        });
      };
      itemMini = (path, item, obj, text) => {
        El.Div({
          path: path,
          attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : []), ...(obj.attrs ? obj.attrs:[])],
          classes: ['n-'+obj.key, '-itemMini', ...(obj.classes ? obj.classes:[]), 'flx'],
          title: this.lng.title(item, string, line, obj, o),
          func: (i) => {
            El.Div({
              path: i,
              class: 'value',
              text: this.lng.text(item, string, line, obj, o)
            });
          }
        });
      };
      itemMiniNum = (path, item, obj, text) => {
        El.Div({
          path: path,
          attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : []), ...(obj.attrs ? obj.attrs:[])],
          classes: ['n-'+obj.key, '-itemMini', ...(obj.classes ? obj.classes:[]), '-itemNum', 'flx'],
          title: this.lng.title(item, string, line, obj, o),
          func: (i) => {
            El.Div({
              path: i,
              class: 'value num',
              func: (e) => el[name][obj.key] = e
            });
          }
        });
      };
      itemMiniCh(path, item, obj){
        El.Div({
          path: path,
          attrs: [
            ['api', name],
            ...(item.cfg ? _this.attrs(item.cfg) : []),
            ...(obj && obj.attrs ? obj.attrs : [])
          ],
          classes: ['n-'+obj.key, '-itemMini', ...(obj && obj.classes ? obj.classes : []), 'flx'],
          title: this.lng.title(item, string, line, obj, o),
          func: (i) => {
            El.Div({
              path: i,
              class: 'key',
              text: this.lng.text(item, string, line, obj, o)
            });
            El.Div({
              path: i,
              class: 'value',
              text: obj?.text,
              func: (e) => el[name][obj.key] = e
            });
          }
        });
      };
      inputNum = (path, item, obj) => {
        El.Input({
          path: path,
          classes: ['n-'+obj.key, 'itemNum', 'val'],
          attrs: [
            ['api', name],
            ...(item.cfg ? _this.attrs(item.cfg) : []),
            ...(obj && obj.attrs ? obj.attrs : [])
          ],
          type: 'number',
          value: '0',
          title: this.lng.title(item, string, line, obj, o),
          oninput: (e) => {
            if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
            o.s.save[obj.key] = e.target.value;
          },
          func: (e) => {
            el[name][obj.key] = e;
            if(e.value) e.style.width = +e.value.length*8+'px';
          }
        });
      }
      check = (i, it) => {
        switch(it.n){
          case 'div': this.containers.div(i, it);
          break;
          case 'label': this.containers.label(i, it);
          break;
          case 'itemGroup': this.containers.itemGroup(i, it);
          break;

          case 'statusItem': this[o.type].inputs.statusItem(i, it);
          break;
          case 'myRating': this.other.myRating(i, it, 'noType');
          break;

          case 'myRating-title': this.other.title.myRating(i, it, 'noType');
          break;

          case 'titleWatched': this.anime.title.main(i, it);
          break;
          case 'titleEps': this.anime.title.eps(i, it);
          break;
          case 'watchedEps': this.anime.inputs.episodes.watched(i, it);
          break;
          case 'episodes': this.anime.inputs.episodes.max(i, it);
          break;
          case 'plusEps': this.anime.inputs.episodes.plus(i, it);
          break;
          case 'minusEps': this.anime.inputs.episodes.minus(i, it);
          break;

          case 'titleReaded': this.manga.title.main(i, it);
          break;
          case 'titleVol': this.manga.title.vol(i, it);
          break;
          case 'readedVol': this.manga.inputs.volumes.readed(i, it);
          break;
          case 'volumes': this.manga.inputs.volumes.max(i, it);
          break;
          case 'plusVol': this.manga.inputs.volumes.plus(i, it);
          break;
          case 'minusVol': this.manga.inputs.volumes.minus(i, it);
          break;

          case 'titleCh': this.manga.title.ch(i, it);
          break;
          case 'readedCh': this.manga.inputs.chapters.readed(i, it);
          break;
          case 'chapters': this.manga.inputs.chapters.max(i, it);
          break;
          case 'plusCh': this.manga.inputs.chapters.plus(i, it);
          break;
          case 'minusCh': this.manga.inputs.chapters.minus(i, it);
          break;

          case 'id': this.other.id(i, it);
          break;
          case 'rating': this.other.rating(i, it);
          break;
          case 'popularity': this.other.popularity(i, it);
          break;
  
          case 'status': this.other.status(i, it);
          break;
          case 'broadcast': this.other.broadcast(i, it);
          break;
          case 'broadcastTime': this.other.broadcastTime(i, it);
          break;
  
          case 'link': this.other.link(i, it);
          break;
  
          case 'title': this.other.title.item(i, it);
          break;
        }
      };
      other = {
        id: (path, item) => {
          this.items.item(path, item, {key: 'id', func: (e) => {
            El.A({
              path: e,
              classes: ['value', 'flx'],
              func: (e) => el[name].id = e
            })
          }})
          // El.Div({
          //   path: path,
          //   classes: ['n-'+'id', '-item', 'flx'],
          //   attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
          //   title: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, 2), o.type, 'id', 3]),
          //   func: (e) => {
          //     // el[name].id = e;
          //     El.Div({
          //       path: e,
          //       class: 'key',
          //       text: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, 'id', _this.lang.type(item, 1)]),
          //     });
          //     El.A({
          //       path: e,
          //       classes: ['value', 'flx'],
          //       func: (e) => el[name].id = e
          //     })
          //   }
          // });
          // this.itemCh(path, item, {
          //   key: 'id',
          //   class: ['-item'],
          // });
        },
        rating: (path, item) => {
          this.itemCh(path, item, {
            key: 'rating',
            classes: ['-item'],
            ttl: 2
          });
        },
        popularity: (path, item) => {
          this.itemCh(path, item, {
            key: 'popularity',
            classes: ['-item'],
            ttl: 2
          });
        },
        status: (path, item) => {
          this.items.keyVal(path, item, {
            key: 'status',
            type: 'part'
            // ttl: 2
          });
        },
        broadcast: (path, item) => {
          this.items.keyVal(path, item, {
            key: 'broadcast',
            type: 'part'
          });

          // El.Div({
          //   path: path,
          //   attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
          //   classes: ['n-'+'broadcast', '-item', 'flx'],
          //   func: (b) => {
          //     if(!el[name].broadcast) el[name].broadcast = {};
          //     El.Div({
          //       path: b,
          //       class: 'key',
          //       text: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, 'broadcast', _this.lang.type(item, 2)]),
          //       title: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, 2), o.type, 'broadcast', 3])
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
        broadcastTime: (path, item) => {
          this.items.val(path, item, {
            key: 'broadcastTime',
            type: 'part'
          });
        },
        link: (path, item) => {
          El.A({
            path: path,
            classes: ['n-'+'link', '-item', 'flx'],
            attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
            text: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, 'link', _this.lang.type(item, 2)]),
            func: (e) => {
              el[name].link = e;
            }
          });
        },
        title: {
          item: (path, item) => {
            El.Div({
              path: path,
              classes: ['n-title-search', '-item', 'flx'],
              attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
              func: (m) => {
                this.itemCh(m, item, {
                  key: 'title',
                  classes: ['-item']
                });
                El.Div({
                  path: m,
                  classes: ['n-search', 'flx'],
                  func: (e) => el[name].search = e,
                  onclick: () => {
                    new Def().search(o, m, true, item, string, line);
                  }
                });
              }
            })
          },
          myRating: (path, item) => {
            this.itemMini(path, item, {key:'myRating-title', num:2});
          }
        },
        myRating: (path, item) => {
          this.items.inputNum(path, item, {key:'myRating', num:2});
          // El.Input({
          //   path: path,
          //   classes: ['n-'+'myRating', 'itemNum', 'val'],
          //   type: 'number',
          //   value: '0',
          //   title: _this.gp(_this.lang, [item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, 'myRating', 3]),
          //   oninput: (e) => {
          //     if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
          //     o.s.save.myRating = e.target.value;
          //   },
          //   func: (e) => {
          //     el[name].myRating = e;
          //     if(e.value) e.style.width = +e.value.length*8+'px';
          //   }
          // });
        }
      }
      anime = {
        title: {
          main: (path, item) => {
            this.itemMini(path, item, {key:'watched', classes:['title', '-miniItem'], num:2});
          },
          eps: (path, item) => {
            this.item(path, item, {key:'watchedEps', num:2});
          }
        },
        inputs: {
          statusItem: (path, item) => {
            El.Select({
              path: path,
              attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
              classes: ['n-'+'statusItem', '-itemSel', '-flx'],
              options: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, 'statusItem', 'options']),
              title: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, 2), o.type, 'statusItem', 'text', 3]),
              func: (e) => {
                el[name].statusItem = e;
              },
              onchange: (e) => {
                o.s.save.statusItem = e.target.value;
              }
            });
          },
          episodes: {
            watched: (path, item) => {
              this.items.inputNum(path, item, {key:'watchedEps', num:2});
            },
            max: (path, item) => {
              this.items.num(path, item, {key:'episodes', text:'?'});
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
                classes: ['n-'+'plusEps', 'numBtn', '-btn', item.type],
                text: '➕\ufe0e',
                onclick: (l) => {
                  if(o.s.save.watchedEps === undefined) o.s.save.watchedEps = 0;
                  o.s.save.watchedEps++;
                }
              });
            },
            minus: (path, item) => {
              El.Button({
                path: path,
                attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
                classes: ['n-'+'minusEps', 'numBtn', '-btn', item.type],
                text: '➖\ufe0e',
                onclick: (l) => {
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
            this.itemMini(path, item, {key:'readed', num:2});
          },
          vol: (path, item) => {
            this.itemMini(path, item, {key:'readedVol', num:2});
          },
          ch: (path, item) => {
            this.itemMini(path, item, {key:'readedCh', num:2});
          },
        },
        inputs: {
          statusItem: (path, item) => {
            El.Select({
              path: path,
              classes: ['n-'+'statusItem', '-itemSel', '-flx'],
              options: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang), o.type, 'statusItem', 'options']),
              title: _this.gp(_this.lang, [_this.lng(item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, 2), o.type, 'statusItem', 'text', 3]),
              func: (e) => {
                el[name].statusItem = e;
              }
            });
          },
          chapters: {
            readed: (path, item) => {
              this.inputNum(path, item, {key:'readedCh', num:2});
              // El.Input({
              //   path: path,
              //   classes: ['n-'+'readedCh', 'itemNum', 'val'],
              //   type: 'number',
              //   value: '0',
              //   title: _this.gp(_this.lang, [item.cfg?.lang||string.cfg?.lang||line.cfg?.lang, o.type, 'readedCh', 3]),
              //   oninput: (e) => {
              //     if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
              //     o.s.save.readedCh = e.target.value;
              //   },
              //   func: (e) => {
              //     el[name].readedCh = e;
              //     if(e.value) e.style.width = +e.value.length*8+'px';
              //   }
              // });
            },
            max: (path, item) => {
              this.itemMiniNum(path, item, {
                key: 'chapters',
                type: o.type,
                text: '?'
              });
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                classes: ['n-'+'plusCh', 'numBtn', '-btn', item.type],
                text: '+',
                onclick: (l) => {
                  if(o.s.save.readedCh === undefined) o.s.save.readedCh = 0;
                  o.s.save.readedCh++;
                }
              });
            },
            minus: (path, item) => {
              El.Button({
                path: path,
                classes: ['n-'+'minusCh', 'numBtn', '-btn', item.type],
                text: '-',
                onclick: (l) => {
                  if(o.s.save.readedCh === undefined) o.s.save.readedCh = 0;
                  if(o.s.save.readedCh === 0) return;
                  o.s.save.readedCh--;
                }
              });
            },
          },
          volumes: {
            readed: (path, item) => {
              this.inputNum(path, item, {key:'readedVol', num:2});
            },
            max: (path, item) => {
              this.itemMiniNum(path, item, {
                key: 'volumes',
                type: o.type,
                text: '?'
              });
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                classes: ['n-'+'plusVol', 'numBtn', '-btn', item.type],
                text: '+',
                onclick: (l) => {
                  if(o.s.save.readedVol === undefined) o.s.save.readedVol = 0;
                  o.s.save.readedVol++;
                }
              });
            },
            minus: (path, item) => {
              El.Button({
                path: path,
                classes: ['n-'+'minusVol', 'numBtn', '-btn', item.type],
                text: '-',
                onclick: (l) => {
                  if(o.s.save.readedVol === undefined) o.s.save.readedVol = 0;
                  if(o.s.save.readedVol === 0) return;
                  o.s.save.readedVol--;
                }
              });
            },
          },
        },
      };
      containers = {
        div: (path, item) => {
          El.Div({
            path: path,
            attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
            classes: ['container', 'flx'],
            func: (i) => {
              item.items.forEach(it => {
                this.check(i, it);
              });
            }
          });
        },
        label: (path, items) => {
          El.Label({
            path: path,
            classes: ['lab', 'flx'],
            attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
            func: (i) => {
              items.items.forEach(it => {
                this.check(i, it);
              });
            }
          })
        },
        itemGroup: (path, item) => {
          if(item.type !== o.type) return;
          El.Div({
            path: path,
            classes: ['item-group', 'flx'],
            attrs: [['api', name], ...(item.cfg ? _this.attrs(item.cfg) : [])],
            func: (i) => {
              item.items.forEach(it => {
                this.check(i, it);
              })
            }
          });
        }
      };
    };

    new Gr().check(p, item);

  };
  connect = (el, o) => {
    const name = 'mal';
    // o.s[name].myRating = 0;
    // if(o.type === 'anime'){
    //   o.s[name].watchedEps = 0;
    // }
    const upd = (key, v, e) => {
      // console.log('UPD ' + name, key, v, e);
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
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].status.parentNode.getAttribute('lang1')||e.el[name].status.parentNode.getAttribute('lang0'),
            lvl: e.el[name].status.parentNode.getAttribute('langLvl')||0
          };

          e.el[name].status.textContent = this.lang[l.lang].statusVal[v.status][l.lvl];
          const st = e.el[name].status.parentNode;
          st.classList.add(status[v.status]);
          
          // if(e.el[name].status) return;
        }
        break;
        case 'statusItem':
          e.el[name].statusItem.value = v;
        break;
        case 'broadcast': {
          if(!v) return;
          if(!v.broadcast) return;

          const status = {
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].broadcast.parentNode.getAttribute('lang1')||e.el[name].broadcast.parentNode.getAttribute('lang0'),
            lvl: e.el[name].broadcast.parentNode.getAttribute('langLvl')||0
          };

          e.el[name].broadcast.parentNode.setAttribute('status', status[v.status]);
          e.el[name].broadcast.textContent = this.lang[l.lang].day[v.broadcast.day_of_the_week][l.lvl];
          // e.el[name].broadcast.time.textContent = v.broadcast.start_time;
        }
        break;
        case 'broadcastTime': {
          if(!v) return;
          if(!v.broadcast) return;

          const status = {
            currently_airing: 'airpublish',
            currently_publishing: 'airpublish',
            finished_airing: 'finished',
            finished: 'finished'
          };
          const l = {
            lang: e.el[name].broadcastTime.parentNode.getAttribute('lang1')||e.el[name].broadcastTime.parentNode.getAttribute('lang0'),
            lvl: e.el[name].broadcastTime.parentNode.getAttribute('langLvl')||0
          };

          e.el[name].broadcastTime.parentNode.setAttribute('status', status[v.status]);
          e.el[name].broadcastTime.textContent = v.broadcast.start_time;
        }
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
          e.el[name].watchedEps.style.width = +e.el[name].watchedEps.value.length*8+'px';
        break;
        case 'myRating':
          e.el[name].myRating.value = v;
          e.el[name].myRating.style.width = +e.el[name].myRating.value.length*8+'px';
        break;
        case 'episodes':
          e.el[name].episodes.textContent = v;
        break;
        case 'volumes':
          e.el[name].volumes.textContent = v;
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
