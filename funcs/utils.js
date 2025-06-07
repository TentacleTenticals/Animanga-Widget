export class Ut{
  getType = (o) => o && o.constructor.toString().split(/[\(\) ]/)[1];
  MyError = (n, options) => {
    class MyError extends Error {
      constructor(){
        super(n[1]);
        this.name = 'MyError:' + n[0] && ' ' + n[1];
        if(n[2]){
          if(n[2].type === 'log'){
            console.group('ERR ' + n[0]+' ' + ':'+n[1]);
            console.error(this);
            if(options) for(const o in options){
              console.log(o, options[o]);
            }
            console.groupEnd();
          }
        }
        return {error: this, name:this.name, message:this.message, stack:this.stack, options};
      }
    };
    return new MyError();
  }
  date = {
    get: (time, format) => {
      if(time === null){
        const d = new Date();
        const ms = Date.parse(d);
  
        switch(format){
          case 'ms': return ms;
        }
      }
      if(!time) return;
      const ms = Date.parse(time);
      const d = new Date(time);
      const check = (u) => (u > 9) ? u : '0'+u;
      const month = {
        0: ['Январь', 'Янв'],
        1: ['Февраль', 'Фев'],
        2: ['Март', 'Мар'],
        3: ['Апрель', 'Апр'],
        4: ['Май', 'Май'],
        5: ['Июнь', 'Июн'],
        6: ['Июль', 'Июл'],
        7: ['Август', 'Авг'],
        8: ['Сентябрь', 'Сен'],
        9: ['Октябрь', 'Окт'],
        10: ['Ноябрь', 'Ноя'],
        11: ['Декабрь', 'Дек']
      };
      const day = {
        1: ['Понедельник', 'Пн'],
        2: ['Вторник', 'Вт'],
        3: ['Среда', 'Ср'],
        4: ['Четверг', 'Чт'],
        5: ['Пятница', 'Пт'],
        6: ['Суббота', 'Сб'],
        0: ['Воскресенье', 'Вс']
      };
      
      switch(format){
        case 'string': return {time: d.toString()};
        case 'ms': return {time: ms};
        case 'full': return {
          time: `${check(d.getHours())}:${check(d.getMinutes())}:${check(d.getSeconds())}`,
          date: `${check(d.getFullYear())}/${check(d.getMonth()+1)}/${check(d.getDate())}`
        }
        case 'fullWords': return {
          time: `${check(d.getHours())}:${check(d.getMinutes())}:${check(d.getSeconds())}`,
          date: `${check(d.getFullYear())}/${check(d.getMonth()+1)}|${month[d.getMonth()][0]}/${check(d.getDate())}|${day[d.getDay()][0]}`
        }
        case 'fullShortWords': return {
          time: `${check(d.getHours())}:${check(d.getMinutes())}:${check(d.getSeconds())}`,
          date: `${check(d.getFullYear())}/${check(d.getMonth()+1)} ${month[d.getMonth()][1]}/${check(d.getDate())} ${day[d.getDay()][1]}`
        }
        default: return {time: `${check(d.getHours())}:${check(d.getMinutes())}:${check(d.getSeconds())}`,
          date: `${check(d.getFullYear())}/${check(d.getMonth()+1)}/${check(d.getDate())}`
        }
      }
    },
    math: (ms) => {
      const d = {
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor(ms / (1000 * 60 * 60)),
        minutes: Math.floor(ms / (1000 * 60)),
        seconds: Math.floor(ms / 1000)
      };
      
      switch(true){
        case d.hours < 24: return [d.hours, 'hours'];
        case d.minutes < 60: return [d.minutes, 'minutes'];
        case d.seconds < 60: return [d.seconds, 'seconds'];
        default: return [d.days, 'days'];
      }
    },
    unitToMs: (u, format) => {
      if(!u && !format) return;
      const units = {
        year: 31536000000,
        month: 2592000000,
        week: 604800000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000
      };

      console.log('q', u * units[format])

      return u * units[format];
    },
    msToTimePer: (ms, format) => {
      if(!ms) return;
      if(ms < 1000) return;
      const units = [
        { label: 'years', mss: 31536000000 },
        { label: 'months', mss: 2592000000 },
        { label: 'weeks', mss: 604800000 },
        { label: 'days', mss: 86400000 },
        { label: 'hours', mss: 3600000 },
        { label: 'minutes', mss: 60000 },
        { label: 'seconds', mss: 1000 }
      ];
    
      let output = {};
    
      for(const { label, mss } of units){
        const value = Math.floor(ms / mss);
        if(value > 0){
          // console.log(value, label);
          output[label] = value;
          ms -= value * mss;
        }
      }
    
      return output;
    }
  };
  token = {
    date: (a, b, format) => {
      const res = a - b;
      
      switch(format){
        case '+': return Math.abs(res);
        default: return res;
      }
    },
    parseJwt(token){
      if(!token) return;
      if(!token.split('.').length) return;
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    },
    keyLength: (msKey, max) => {
      if(!msKey && !max) return;
      const cur = this.date.get(null, 'ms');
      if(max > 1){
        const main = this.token.date(msKey, cur);
        if(main > 0){
          const q = this.date.math(main);
          if(q[1] === 'days'){
            max = this.date.unitToMs(max, 'day');
          }
        }
      }
      console.log('MAX', max);
      let main = this.token.date(msKey, cur) - max||0;
      let res;
      console.log('M', main);
      
      if(main < 0){
        if(main <= -2592000000) console.log('[TK] Too long. NEED NEW TOKENS!!!', main < 30);
        else main = Math.abs(main);
        const q = this.date.math(main);
        
        if(q[1] === 'days'){
          switch(true){
            case q[0] > 30: console.log('[Tokens] need new tokens!!!', q);
            res = {
              check: q,
              token: {
                timer: q,
                date: this.date.msToTimePer(main)
              }
            };
            break;
            case q[0] > 20: console.log('[Tokens] need new tokens!!!', q);
            break;
            case q[0] > 10: console.log('[Tokens] need new tokens!!!', q);
            break;
            case q[0] > 5: console.log('[Tokens] need new tokens!!!', q);
            break;
          }
        }
      }
      // else main = Math.abs(main);
      
      const q = this.date.math(main);
      
      if(q[1] === 'days'){
        switch(true){
          case q[0] > 30: console.log('[Tokens] ok', q);
          res = {
            ok: true,
            token: {
              timer: q,
              date: this.date.msToTimePer(main)
            }
          };
          break;
          case q[0] > 20: console.log('[Tokens] ok', q);
          res = {
            ok: true,
            token: {
              timer: q,
              date: this.date.msToTimePer(main)
            }
          };
          break;
          case q[0] > 10: console.log('[Tokens] ...update?', q);
          res = {
            ok: true,
            token: {
              timer: q,
              date: this.date.msToTimePer(main)
            }
          };
          break;
          case q[0] > 5: console.log('[Tokens] update!!!', q);
          res = {
            ok: true,
            token: {
              timer: q,
              date: this.date.msToTimePer(main)
            }
          };
          break;
        }
      }
      
      console.log('Q', q);

      return res;
    }
  };
  textMatcher = {
    m(arr, title, o){
      // console.log('M', arr, title, o)
      // if(!arr && !o.matcher && !title) return;
      const matching = {};
      const results = [];
      arr.forEach((e, ind) => {
        // result.ind = ind;
        results.push({
          item: {title:e.iTitle, ind:ind},
          result: this.search(e.iTitle, {ind:ind, text:title, textMatch: o.textMatch, matching})
        })
        // this.search(e.iTitle, results, {ind:ind, text:title, textMatch: o.textMatch, matching});
      });
      console.log('RESULTS', results);
      const sort = results.reduce((a, b) => +a.result.percents.result > +b.result.percents.result ? a : b);
      console.log('SORT', sort);
      if(sort.result.percents.match) return sort.item;
    },
    search(text, o){
      // console.log('SS', text, o);
      // if(!arr && !matcher) return;
      // const result = {};
      const match = this[o.textMatch.matcher](text, o.text, o.textMatch);
      if(match) return match.result;
    },
    lev(text, text2, o){
      // console.log('LEV', arguments);
      function removeSym(text){
        const filter = /([\W]+)/gm;
        const norm = /[\u0300-\u036F]/g;
        const fixer = (text) => text.normalize('NFKD').replace(norm, '').replace(filter, '').toLowerCase();
        
        return fixer(text);
      };
      text = removeSym(text);
      text2 = removeSym(text2);
      function levenshtein(s, t){
        if (!s.length) return t.length;
        if (!t.length) return s.length;
        const arr = [];
        for (let i = 0; i <= t.length; i++){
          arr[i] = [i];
          for (let j = 1; j <= s.length; j++){
            arr[i][j] = i === 0 ? j
              : Math.min(
                  arr[i - 1][j] + 1,
                  arr[i][j - 1] + 1,
                  arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
          }
        }
        return ((1 - arr[t.length][s.length] / Math.max(s.length, t.length)) * 100).toFixed(2);
      };
    
      const res = levenshtein(text, text2);
      const r = {
        result: {
          type: 'levenshtein',
          percents: {result: res, match: res >= o.percents, check: o}
        }
      };
      // console.log('[TextMatcherLev]', r);
      return r;
    }
  };
};
