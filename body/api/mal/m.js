import {El} from '../../../base/classes/m.js';

export class Mal{
  gp = (t, path) => path.reduce((r, k) => k ? r[k] : r, t);
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
      id: ['ID', 'ID', '', 'MAL ID'],
      status: ['Status', 'St', '⏳\ufe0e', 'Status'],
      rating: ['Rating', 'Rt', '💣\ufe0e', 'Rating'],
      popularity: ['Popularity', 'Pop-ty', '🔥\ufe0e'],
      broadcast: ['Broadcast', 'Brod', '🗓️\ufe0e'],
      link: ['Link', 'Link', '🔗', 'Link'],
      title: ['', '', '', 'Title'],
      watched: ['Watched:', 'Watch:', '📽️'],
      watchedEps: ['Episodes', 'Eps', '🎞️', 'Watched episodes'],
      episodes: ['', '', '', 'Episodes'],
      readed: ['Readed:', 'Rdd:', '📖'],
      readedVol: ['Volume', 'Vol'],
      volumes: ['Volumes', 'Vol', '', 'Volumes'],
      readedCh: ['Chapter', 'Ch'],
      chapters: ['Chapters', 'Ch', ''],
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
        currently_airing: ['Выходит', 'Вых'],
        currently_publishing: ['Публикуется', 'Пуб'],
        finished_airing: ['Вышло', 'Вы'],
        finished_publishing: ['Закончено', 'Зак']
      },
      myRating: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
      anime: {
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
      id: ['ID', 'ID', '', 'MAL ID'],
      status: ['Статус', 'Ст', '⏳\ufe0e', 'Статус'],
      rating: ['Рейтинг', 'Рт', '💣\ufe0e', 'Рейтинг'],
      popularity: ['Популярность', 'Попул', '🔥\ufe0e', 'Популярность'],
      broadcast: ['Выходит в', 'Вых в', '🗓️\ufe0e', 'Выходит в'],
      link: ['Ссылка', 'С-ка', '🔗', 'Ссылка'],
      title: ['', '', '', 'Название тайтла'],
      watched: ['Смотрю:', 'Смт:', '📽️', 'Просмотрено'],
      watchedEps: ['Эпизоды', 'Эп', '🎞️', 'Просмотреннные эпизоды'],
      episodes: ['', '', '', 'Эпизоды'],
      readed: ['Читаемое:', 'Чит:', '📖', 'Читаемое'],
      readedVol: ['Volume', 'Vol', '', 'Прочитанные тома'],
      volumes: ['Volumes', 'Vol', '', 'Тома'],
      readedCh: ['Chapter', 'Ch', '', 'Прочитанные главы'],
      chapters: ['Chapters', 'Ch', '', 'Главы'],
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
      myRating: ['My rating', 'Myrat', '🔥\ufe0e', 'My rating'],
      anime: {
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
      item(path, item, obj){
        El.Div({
          path: path,
          attrs: [
            item.align && ['i-align', item.align],
            item.gap && ['i-align', item.gap],
            item.style && ['i-style', item.style],
            ...(obj && obj.attrs ? obj.attrs : [])
          ],
          classes: [obj.key, item.tag && name, ...(obj && obj.class ? obj.class : []), 'flx'],
          text: obj && obj.nottl ? '' : _this.gp(_this.lang, [item.lang||string.lang||line.lang, obj.type, obj.key, obj?.ttl||_this.lang.type(item)]),
          title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, obj.type, obj.key, 3]),
          func: (i) => {
            El.Div({
              path: i,
              class: 'value',
              text: obj?.text,
              func: (e) => el[name][obj.key] = e
            });
          }
        });
      };
      itemOne = (path, item, obj, text) => {
        El.Div({
          path: path,
          attrs: [item.align && ['i-align', item.align], item.style && ['i-style', item.style], ...(obj.attrs ? obj.attrs:[])],
          classes: [obj.key, item.tag && name, ...(obj.class ? obj.class:[]), 'flx'],
          text: _this.lang[item.lang||string.lang||line.lang][obj.key][text||_this.lang.type(item, obj.num)],
          title: _this.lang[item.lang||string.lang||line.lang][obj.key][3],
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
          case 'myRating': this.other.myRating(i, it);
          break;

          case 'myRatingTtl': this.other.title.myRating(i, it);
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
  
          case 'link': this.other.link(i, it);
          break;
  
          case 'title': this.other.title.item(i, it);
          break;
        }
      };
      other = {
        id: (path, item) => {
          this.item(path, item, {
            key: 'id',
            class: ['-item'],
          });
        },
        rating: (path, item) => {
          this.item(path, item, {
            key: 'rating',
            class: ['-item'],
            ttl: 2
          });
        },
        popularity: (path, item) => {
          this.item(path, item, {
            key: 'popularity',
            class: ['-item'],
            ttl: 2
          });
        },
        status: (path, item) => {
          this.item(path, item, {
            key: 'status',
            class: ['-item'],
            attrs:[
              ['lang', JSON.stringify([
                (item.lang||string.lang||line.lang),
                0]
              )]
            ],
            ttl: 2
          });
        },
        broadcast: (path, item) => {
          El.Div({
            path: path,
            attrs: [item.align && ['i-align', item.align], item.style && ['i-style', item.style], item.showEnded && ['showEnded', item.showEnded], ['lang',
            JSON.stringify([
              (item.lang||string.lang||line.lang),
              _this.lang.type(item)]
              )]],
            classes: ['broadcast', item.tag && name, '-item', '-hidden', 'flx'],
            func: (b) => {
              if(!el[name].broadcast) el[name].broadcast = {};
              El.Div({
                path: b,
                class: 'key',
                text: _this.lang[item.lang||string.lang||line.lang]['broadcast'][_this.lang.type(item, 2)]
              });
              El.Div({
                path: b,
                class: 'day value',
                func: (e) => {
                  el[name].broadcast.day = e;
                }
              });
              El.Div({
                path: b,
                class: 'time value',
                func: (e) => {
                  el[name].broadcast.time = e;
                }
              });
            }
          });
        },
        link: (path, item) => {
          El.A({
            path: path,
            classes: ['link', item.tag && name, '-item', 'flx'],
            text: _this.lang[item.lang||string.lang||line.lang]['link'][_this.lang.type(item, 2)],
            func: (e) => {
              el[name].link = e;
            }
          });
        },
        title: {
          item: (path, item) => {
            this.item(path, item, {
              key: 'title',
              class: ['-item']
            });
          },
          myRating: (path, item) => {
            this.itemOne(path, item, {key:'myRating', class:['title', '-miniItem'], num:2});
          }
        },
        myRating: (path, item) => {
          El.Input({
            path: path,
            classes: ['myRating', 'itemNum', 'val'],
            type: 'number',
            value: '0',
            title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, 'myRating', 3]),
            oninput: (e) => {
              if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
            },
            onchange: (e) => {
              o.s.save.myRating = e.target.value;
            },
            func: (e) => {
              el[name].myRating = e;
              if(e.value) e.style.width = +e.value.length*8+'px';
            }
          });
        }
      }
      anime = {
        title: {
          main: (path, item) => {
            this.itemOne(path, item, {key:'watched', class:['title', '-miniItem'], num:2});
          },
          eps: (path, item) => {
            this.itemOne(path, item, {key:'watchedEps', class:['title', name], num:2});
          }
        },
        inputs: {
          statusItem: (path, item) => {
            El.Select({
              path: path,
              class: 'statusItem -item -flx',
              options: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'statusItem', 'options']),
              title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'statusItem', 'text', 3]),
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
              El.Input({
                path: path,
                class: 'watchedEps itemNum val',
                type: 'number',
                value: '0',
                title: _this.lang[item.lang||string.lang||line.lang]['watchedEps'][3],
                oninput: (e) => {
                  if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
                  o.s.save.watchedEps = e.target.value;
                },
                func: (e) => {
                  el[name].watchedEps = e;
                  if(e.value) e.style.width = +e.value.length*8+'px';
                }
              });
            },
            max: (path, item) => {
              this.item(path, item, {key:'episodes', class:['itemNum', 'len', 'flx'], attrs:[item.separator && ['i-sep', item.separator]], text:'0'});
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                classes: ['plusEps', 'numBtn', 'btn', item.type],
                text: '+',
                onclick: (l) => {
                  if(o.s.save.watchedEps === undefined) o.s.save.watchedEps = 0;
                  o.s.save.watchedEps++;
                }
              });
            },
            minus: (path, item) => {
              El.Button({
                path: path,
                classes: ['minusEps', 'numBtn', 'btn', item.type],
                text: '-',
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
            this.itemOne(path, item, {key:'readed', class:['title', '-miniItem'], classq:[], num:2});
          },
          vol: (path, item) => {
            this.itemOne(path, item, {key:'readedVol', class:['title', '-miniItem'], classq:[], num:2});
          },
          ch: (path, item) => {
            this.itemOne(path, item, {key:'readedCh', class:['title', '-miniItem'], classq:[], num:2});
          },
        },
        inputs: {
          statusItem: (path, item) => {
            El.Select({
              path: path,
              class: 'statusItem -item -flx',
              options: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'statusItem', 'options']),
              title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'statusItem', 'text', 3]),
              func: (e) => {
                el[name].statusItem = e;
              }
            });
          },
          chapters: {
            readed: (path, item) => {
              El.Input({
                path: path,
                class: 'readedCh itemNum val',
                type: 'number',
                value: '0',
                title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'readedCh', 3]),
                oninput: (e) => {
                  if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
                  o.s.save.readedCh = e.target.value;
                },
                func: (e) => {
                  el[name].readedCh = e;
                  if(e.value) e.style.width = +e.value.length*8+'px';
                }
              });
            },
            max: (path, item) => {
              this.item(path, item, {
                key: 'chapters',
                type: o.type,
                class: ['itemNum', 'len'],
                attrs: [item.separator && ['i-sep', item.separator]],
                nottl: true,
                text: '0'
              });
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                class: ['plusCh', 'numBtn', 'btn', item.type].join(' '),
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
                class: ['minusCh', 'numBtn', 'btn', item.type].join(' '),
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
              El.Input({
                path: path,
                class: 'readedVol itemNum val',
                type: 'number',
                value: '0',
                title: _this.gp(_this.lang, [item.lang||string.lang||line.lang, o.type, 'readedVol', 3]),
                oninput: (e) => {
                  if(e.target.value) e.target.style.width = +e.target.value.length*8+'px';
                  o.s.save.readedVol = e.target.value;
                },
                func: (e) => {
                  el[name].readedVol = e;
                  if(e.value) e.style.width = +e.value.length*8+'px';
                }
              });
            },
            max: (path, item) => {
              this.item(path, item, {
                key: 'volumes',
                type: o.type,
                class: ['itemNum', 'len'],
                attrs: [item.separator && ['i-sep', item.separator]],
                nottl: true,
                text: '0'
              });
            },
            plus: (path, item) => {
              El.Button({
                path: path,
                class: ['plusVol', 'numBtn', 'btn', item.type].join(' '),
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
                class: ['minusVol', 'numBtn', 'btn', item.type].join(' '),
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
            attrs: [item.direction && ['i-dir', item.direction], item.gap && ['i-gap', item.gap]],
            classes: ['container', item.tag && name, 'flx'],
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
            classes: ['lab', item.tag && name, 'flx'],
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
            classes: ['item-group', item.tag && name, 'flx'],
            attrs: [item.direction && ['i-dir', item.direction], item.gap && ['i-gap', item.gap]],
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
      console.log('UPD ' + name, key, v, e);
      if(!e.el[name][key]) return;
      switch (key) {
        case 'rating':
          e.el[name].rating.textContent = v;
          return true;
        break;
        case 'id':
          e.el[name].id.textContent = v;
          return true;
        break;
        case 'link':
          e.el[name].link.href = v;
          return true;
        break;
        case 'popularity':
          e.el[name].popularity.textContent = v;
          return true;
        break;
        case 'status': {
          if(!v) return;
          const l = e.el[name].status.parentNode.getAttribute('lang');
          const arr = JSON.parse(l);
          e.el[name].status.textContent = this.lang[arr[0]].statusVal[v][arr[1]];

          const st = e.el[name].status.parentNode;

          switch(v){
            case 'currently_airing': st.classList.add('airpublish');
            break;
            case 'currently_publishing': st.classList.add('airpublish');
            break;
            case 'finished_airing': st.classList.add('finished');
            break;
            case 'finished': st.classList.add('finished');
            break;
          }
        }
        break;
        case 'statusItem':
          e.el[name].statusItem.value = v;
        break;
        case 'broadcast': {
          if(!v) return;
          console.log('Broad', o.s);
          if(!e.el[name].broadcast.day.parentNode.getAttribute('showended') && o.s[name]?.status?.match(/finished_airing|finished/)) return e.el[name].broadcast.day.parentNode.classList.add('-hidden');
          const l = e.el[name].broadcast.day.parentNode.getAttribute('lang');
          const arr = JSON.parse(l);
          // console.log('ARR', arr);
          e.el[name].broadcast.day.textContent = this.lang[arr[0]].day[v.day_of_the_week][arr[1]];
          e.el[name].broadcast.time.textContent = v.start_time;
          e.el[name].broadcast.day.parentNode.classList.remove('-hidden');
        }
        break;
        case 'title':
          e.el[name].title.textContent = v;
        break;
        case 'watchedEps':
          // console.log('QQ', e.el[name].watchedEps)
          e.el[name].watchedEps.value = v;
          e.el[name].watchedEps.style.width = +e.el[name].watchedEps.value.length*8+'px';
        break;
        case 'myRating':
          console.log('VVVVV', v);
          e.el[name].myRating.value = v;
          e.el[name].myRating.style.width = +e.el[name].myRating.value.length*8+'px';
          return true;
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
