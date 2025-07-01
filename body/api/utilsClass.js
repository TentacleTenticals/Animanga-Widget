export default () => class {
  len = (o, len) => String(o).length*(len/2)+'px';
  getPath = (key) => {
    // console.log(key)
    let path;
    const p = key.split('.');
    if(p.length > 1){
      path = p.slice(0, -1).join('.');
      key = p.at(-1);
    }
    // console.log(path, key);
    return [path, key];
  };
  lng = (o, n) => {
    const l = o.split('/');
    if(!l.length > 1||!n) return l[0];
    else return l[n] ? l[n] : l[0];
  };
  lngSet = {
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
    gp: (t, path) => {
      console.log(path);
      return path.filter(e => e).map(e => e.split('.')).flat().reduce((r, k) => k ? r[k] : r, t);
    },
    text: (item, subLine, line, keys, type) => this.lngSet.gp(this.lang, [this.lng(item.cfg?.lang||subLine.cfg?.lang||
      line.cfg?.lang), ...keys ? keys : []])[type||this.lngSet.type(item, 2)],
    title: (item, subLine, line, keys) => this.lngSet.gp(this.lang, [this.lng(item.cfg?.lang||subLine.cfg?.lang||
      line.cfg?.lang), ...keys ? keys : []])[3]
  };
};
