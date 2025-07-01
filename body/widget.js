import {El} from '../base/classes/m.js';
import {Def} from './api/def/m.js';
import {Mal} from './api/mal/m.js';
import {Ani} from './api/ani/m.js';

export const widget = {
  build: (o) => {
    const el = {
      mal: {
        anime: {},
        my: {}
      },
      ani: {
        anime: {},
        my: {}
      },
      def: {}
    };
    const attrs = (o) => Object.entries(o).map(e => [e[0], e[1]]);

    El.Div({
      path: o.path,
      // insert: 'beforeBegin',
      class: `animanga-Widget ${o.cfg.theme}-theme flx`,
      id: 'animanga-widget',
      func: (m) => {
        m.addEventListener('status', (e) => {
          console.log('E', e.detail);
          if(!e.detail) return;
          switch(e.detail.type){
            case 'reload': 
            console.log('R', el.run);
            // el.run(o)
            // el.def.reload.click();
            const ev = new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true });
            el.def.reload.dispatchEvent(ev);
            break;
          }
        });

        o.cfg.body.forEach(line => {
          // console.log(line)
          El.Div({
            path: m,
            attrs: [
              ...(line.cfg ? attrs(line.cfg) : [])
            ],
            class: ['line', 'lang-'+ o.cfg.lang, 'flx'].join(' '),
            func: (l) => {
              line.items.forEach(subLine => {
                El.Div({
                  path: l,
                  attrs: [
                    ...(subLine.cfg ? attrs(subLine.cfg) : [])
                  ],
                  class: '-subLine flx',
                  func: (s) => {
                    subLine.items.forEach(item => {
                      switch(item.api){
                        case 'mal': o.cfg.api.body.mal && new Mal().build(s, {name:line.name, cfg:line.cfg}, {name:subLine.name, cfg:subLine.cfg}, item, el, o);
                        break;
                        case 'ani': o.cfg.api.body.ani && new Ani().build(s, {name:line.name, cfg:line.cfg}, {name:subLine.name, cfg:subLine.cfg}, item, el, o);
                        break;
                        default: new Def().build(s, {name:line.name, cfg:line.cfg}, {name:subLine.name, cfg:subLine.cfg}, item, el, o);
                        break;
                      }
                    })
                  }
                });
              })
            }
          });





          // El.Div({
          //   path: l,
          //   class: '-subLine flx hor',
          //   func: (s) => {
          //     subLine.forEach(item => {
          //       switch(item.api){
          //         case 'mal': mal.build(s, 'header', item, el, o);
          //         break;
          //         case 'ani': ani.build(s, 'header', item, el, o);
          //         break;
          //         default: def.build(s, 'header', item, el, o);
          //         break;
          //       }
          //     })
          //   }
          // });
        });

        // mal.connect('header', el, o);
        // El.Div({
        //   path: m,
        //   class: `-header lang-${o.cfg.header.lang} flx hor`,
        //   func: (h) => {
        //     El.Div({
        //       path: h,
        //       class: '-list flx ver',
        //       func: (l) => {
        //         o.cfg.body.forEach(line => {
        //           El.Div({
        //             path: m,
        //             class: ['lang-'+ o.cfg.header.lang, 'flx', 'hor'].join(' '),
        //             func: (h) => {
        //               El.Div({
        //                 path: l,
        //                 class: '-subLine flx hor',
        //                 func: (s) => {
        //                   subLine.forEach(item => {
        //                     switch(item.api){
        //                       case 'mal': mal.build(s, 'header', item, el, o);
        //                       break;
        //                       case 'ani': ani.build(s, 'header', item, el, o);
        //                       break;
        //                       default: def.build(s, 'header', item, el, o);
        //                       break;
        //                     }
        //                   })
        //                 }
        //               });
        //             }
        //           });





        //           // El.Div({
        //           //   path: l,
        //           //   class: '-subLine flx hor',
        //           //   func: (s) => {
        //           //     subLine.forEach(item => {
        //           //       switch(item.api){
        //           //         case 'mal': mal.build(s, 'header', item, el, o);
        //           //         break;
        //           //         case 'ani': ani.build(s, 'header', item, el, o);
        //           //         break;
        //           //         default: def.build(s, 'header', item, el, o);
        //           //         break;
        //           //       }
        //           //     })
        //           //   }
        //           // });
        //         });
        //         // mal.connect('header', el, o);

        //         // o.s.mal.id = 'lol'
        //       }
        //     })
        //   }
        // });

        // El.Div({
        //   path: m,
        //   class: `-mid lang-${o.cfg.mid.lang} flx hor`,
        //   func: (mid) => {
        //     El.Div({
        //       path: mid,
        //       class: '-list flx hor',
        //       func: (l) => {
        //         o.cfg.mid.fields.forEach(subLine => {
        //           El.Div({
        //             path: l,
        //             class: '-subLine flx hor',
        //             func: (s) => {
        //               subLine.forEach(item => {
        //                 switch(item.api){
        //                   case 'mal': mal.build(s, 'mid', item, el, o);
        //                   break;
        //                   case 'ani': ani.build(s, 'mid', item, el, o);
        //                   break;
        //                   default: def.build(s, 'mid', item, el, o);
        //                   break;
        //                 }
        //               })
        //             }
        //           });
        //         });

        //         // o.s.mal.id = 'lol'
        //       }
        //     })
        //   }
        // });

        // El.Div({
        //   path: m,
        //   class: `-footer lang-${o.cfg.footer.lang} flx hor`,
        //   func: (ft) => {
        //     o.cfg.footer.fields.forEach(subLine => {
        //       El.Div({
        //         path: ft,
        //         class: '-subLine flx hor',
        //         func: (s) => {
        //           subLine.forEach(item => {
        //             switch(item.api){
        //               case 'mal': mal.build(s, 'footer', item, el, o);
        //               break;
        //               case 'ani': ani.build(s, 'footer', item, el, o);
        //               break;
        //               default: def.build(s, 'footer', item, el, o);
        //               break;
        //             }
        //           })
        //         }
        //       });
        //     });
        //   }
        // });
      }
    })

    function updater(o){
      function upd(key, val, tar){
        console.log('UUUPD', key, val);
        switch(key){
          case 'myRating':
            o.s.mal && (o.s.mal.myRating = val);
            o.s.ani && (o.s.ani.myRating = val);
          break;
          case 'watchedEps':
            o.s.mal && (o.s.mal.watchedEps = val);
            o.s.ani && (o.s.ani.watchedEps = val);
          break;
          case 'readedVol':
            o.s.mal && (o.s.mal.readedVol = val);
            o.s.ani && (o.s.ani.readedVol = val);
          break;
          case 'readedCh':
            o.s.mal && (o.s.mal.readedCh = val);
            o.s.ani && (o.s.ani.readedCh = val);
          break;
          case 'statusItem': {
            const s = {
              mal: {
                watching: 'watching',
                reading: 'reading',
                planToWatch: 'plan_to_watch',
                planToRead: 'plan_to_read',
                onHold: 'on_hold',
                dropped: 'dropped',
                completed: 'completed',
                repeating: 'repeating'
              },
              ani: {
                watching: 'CURRENT',
                reading: 'CURRENT',
                planToRead: 'PLANNING',
                planToWatch: 'PLANNING',
                dropped: 'DROPPED',
                paused: 'PAUSED',
                completed: 'COMPLETED',
                repeating: 'REPEATING'
              }
            }
            if(o.s.mal){
              if(val === 'repeating'){
                o.s.mal.repeating = true;
                o.s.mal.statusItem = 'repeating';
              }else{
                o.s.mal.repeating = false;
                o.s.mal.statusItem = s.mal[val];
              }
            };
            o.s.ani && (o.s.ani.statusItem = s.ani[val]);
          }
        }
        return true;
      }
      o.s.save = new Proxy(o.data.save, El.ProxyHandler(upd, {o:o}));
      // o.s.save.watchedEps = 0;
    };

    o.cfg.api.body.mal && new Mal().connect(el, o);
    o.cfg.api.body.ani && new Ani().connect(el, o);
    updater(o);
    console.log(el, o.s)

    // const eventAwesome = new CustomEvent('status', {
    //   bubbles: true,
    //   detail: {
    //     type: 'reload'
    //   }
    // });

    // o.path.children[2].dispatchEvent(eventAwesome);
  }
}
