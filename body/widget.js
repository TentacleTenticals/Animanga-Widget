import {El} from '../base/classes/m.js';
import {Def} from './api/def/m.js';
import {Mal} from './api/mal/m.js';
import {Ani} from './api/ani/m.js';

export const widget = {
  build: (o) => {
    const el = {
      mal: {},
      ani: {},
      def: {}
    };

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
            console.log('R', el.def.reload);
            // el.def.reload.click();
            const ev = new Event('mousedown', { view: window, bubbles: true, cancelable: true });
            el.def.reload.dispatchEvent(ev);
            break;
          }
        });

        o.cfg.body.forEach(line => {
          // console.log(line)
          El.Div({
            path: m,
            attrs: [
              line.direction && ['i-dir', line.direction],
              line.gap && ['i-align', line.gap]
            ],
            class: ['line', 'lang-'+ o.cfg.header.lang, 'flx'].join(' '),
            func: (l) => {
              line.items.forEach(string => {
                El.Div({
                  path: l,
                  attrs: [
                    string.direction && ['i-dir', string.direction],
                    string.align && ['i-align', string.align],
                    string.gap && ['i-align', string.gap]
                  ],
                  class: '-string flx',
                  func: (s) => {
                    string.items.forEach(item => {
                      switch(item.api){
                        case 'mal': new Mal().build(s, {name:line.name, lang:line.lang}, {name:string.name, lang:string.lang}, item, el, o);
                        break;
                        case 'ani': new Ani().build(s, {name:line.name, lang:line.lang}, {name:string.name, lang:string.lang}, item, el, o);
                        break;
                        default: new Def().build(s, {name:line.name, lang:line.lang}, {name:string.name, lang:string.lang}, item, el, o);
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
          //   class: '-string flx hor',
          //   func: (s) => {
          //     string.forEach(item => {
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
        //                 class: '-string flx hor',
        //                 func: (s) => {
        //                   string.forEach(item => {
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
        //           //   class: '-string flx hor',
        //           //   func: (s) => {
        //           //     string.forEach(item => {
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
        //         o.cfg.mid.fields.forEach(string => {
        //           El.Div({
        //             path: l,
        //             class: '-string flx hor',
        //             func: (s) => {
        //               string.forEach(item => {
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
        //     o.cfg.footer.fields.forEach(string => {
        //       El.Div({
        //         path: ft,
        //         class: '-string flx hor',
        //         func: (s) => {
        //           string.forEach(item => {
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

    new Mal().connect(el, o);
    new Ani().connect(el, o);
    updater(o);
    // document.addEventListener('rel', () => {
    //   console.log('q', el.def.reload)
    //   // el.def.reload.focus();
    //   el.def.reload.mousedown();
    // });
    // const r = new CustomEvent("rel", {
    //   bubbles: true,
    //   detail: { text: () => textarea.value },
    // });
    // document.dispatchEvent(r);
    // o.s.mal.myRating = 0;
    // if(o.type === 'anime'){
    //   o.s.mal.watchedEps = 0;
    // }
  }
}
