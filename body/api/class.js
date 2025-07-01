import {El} from '../../base/classes/m.js';

export default (path, name, line, subLine, item, el, o, _this) => class {
  len = (o, len) => String(o).length*(len/2)+'px';
  gp = (t, path) => {
    // (path.map(e => e.split('.')).flat().reduce((r, k) => {
    //   console.log('R', r, k);
    // }))
    // console.log(path);
    return path.filter(e => e).map(e => e.split('.')).flat().reduce((r, k) => k ? r[k] : r, t);
  };
  splitter = (o) => {
    const t = o.split('/');
    if(!t.length > 1) return [['lang', t[0]]];
    else
    return [['lang0', t[0]], ['lang1', t[1]], ['lang2', t[2]]];
  };
  attrs = (o) => Object.entries(o).map(e => e[0] === 'lang' ? this.splitter(e[1]) : [[e[0], e[1]]]).flat().filter(e => e[1]);
  lng = {
    text: (item, subLine, line, obj, o) => this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||
      line.cfg?.lang), obj.key[0]])[obj.num||this.lngType(item, 2)]||this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang), obj.key[0]])[obj.num||this.lngType(item, 2)],
    title: (item, subLine, line, obj, o) => this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang), obj.key[0]])[3],
    options: (item, subLine, line, obj, o) => this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||
      line.cfg?.lang), obj.key[0]])
  };
  lngType = (item ,v) => {
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
  };
  items = {
    type: (o) => {
      switch(o.type){
        case 'part': return 'itemPart'
        break;
        case 'mini': return 'itemMini'
        break;
        case 'num': return 'itemNum'
        break;
        case 'mini +btn': return 'itemMini plusBtn'
        break;
        case 'mini -btn': return 'itemMini minusBtn'
        break;
        case 'mini incdecBtn': return 'itemMini incdecBtn'
        break;
        default: return 'item';
      }
    },
    item: (path, item, obj, text) => {
      El.Div({
        path: path,
        attrs: [
          ['api', name],
          ...(item.cfg ? this.attrs(item.cfg) : []),
          ...(obj && obj.attrs ? obj.attrs : [])
        ],
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), 'flx'],
        title: this.lng.title(item, subLine, line, obj, o),
        func: (i) => {
          El.Div({
            path: i,
            class: 'key',
            text: this.lng.text(item, subLine, line, obj, o),
            func: (e) => obj.key[1] && (el[name][obj.key.at(-1)] = e)
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
          ...(item.cfg ? this.attrs(item.cfg) : []),
          ...(obj && obj.attrs ? obj.attrs : [])
        ],
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), 'flx'],
        title: this.lng.title(item, subLine, line, obj, o),
        func: (i) => {
          El.Div({
            path: i,
            class: 'value',
            text: obj?.text,
            func: (e) => obj.key[1] && (el[name][obj.key.at(-1)] = e)
          });
        }
      });
    },
    keyVal: (path, item, obj) => {
      El.Div({
        path: path,
        attrs: [
          ['api', name],
          ...(item.cfg ? this.attrs(item.cfg) : []),
          ...(obj && obj.attrs ? obj.attrs : [])
        ],
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), 'flx'],
        title: this.lng.title(item, subLine, line, obj, o),
        func: (i) => {
          El.Div({
            path: i,
            class: 'key',
            text: this.lng.text(item, subLine, line, obj, o)
          });

          El.Div({
            path: i,
            class: 'value',
            text: obj?.text,
            func: (e) => obj.key[1] && (el[name][obj.key.at(-1)] = e)
          });
        }
      });
    },
    num: (path, item, obj, text) => {
      El.Div({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : []), ...(obj.attrs ? obj.attrs:[])],
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), ...(obj.classes ? obj.classes:[]), 'itemNum', 'flx'],
        title: this.lng.title(item, subLine, line, obj, o),
        func: (i) => {
          El.Div({
            path: i,
            class: 'value num',
            text: obj.text,
            func: (e) => obj.key[1] && (el[name][obj.key.at(-1)] = e)
          });
        }
      });
    },
    inputs: {
      select: (path, item, obj) => {
        El.Select({
          path: path,
          attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
          classes: ['n-'+obj.key[1], 'itemSel', '-flx'],
          options: this.lng.options(item, subLine, line, obj, o),
          // title: this.gp(_this.lang, [_this.lng(item.cfg?.lang||subLine.cfg?.lang||line.cfg?.lang, 2), o.type, 'status.my'])[3],
          func: (e) => obj.func||obj.key[1] && (el[name][obj.key.at(-1)] = e)
        });
      }
    },
    inputNum: (path, item, obj) => {
      El.Input({
        path: path,
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), 'itemInpNum', 'val'],
        attrs: [
          ['api', name],
          ...(item.cfg ? this.attrs(item.cfg) : []),
          ...(obj && obj.attrs ? obj.attrs : [])
        ],
        type: 'number',
        value: '0',
        title: this.lng.title(item, subLine, line, obj, o),
        oninput: (e) => {
          if(e.target.value) e.target.style.width = this.len(e.target.value, o.cfg.css.fontSize)
          o.s.save[obj.key[1]] = e.target.value;
        },
        func: (e) => {
          el[name][obj.key.at(-1)] = e;
          if(e.value) e.style.width = this.len(e.value, o.cfg.css.fontSize)
        }
      });
    },
    btn: (path, item, obj, text) => {
      El.Button({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
        classes: ['n-'+obj.key[0].replace(/\./gmi, '-'), this.items.type(obj), ...(obj.classes ? obj.classes : []), '-btn', 'flx'],
        text: obj.text||this.lng.text(item, subLine, line, obj, o),
        title: this.lng.title(item, subLine, line, obj, o),
        func: obj.func,
        onclick: obj.onclick
      });
    }
  };
  containers = {
    div: (path, item) => {
      El.Div({
        path: path,
        attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
        classes: ['string', 'flx'],
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
        attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
        func: (i) => {
          item.items.forEach(it => {
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
        attrs: [['api', name], ...(item.cfg ? this.attrs(item.cfg) : [])],
        func: (i) => {
          item.items.forEach(it => {
            this.check(i, it);
          })
        }
      });
    }
  };
};
