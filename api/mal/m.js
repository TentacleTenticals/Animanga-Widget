import {Ut} from '../../funcs/utils.js';

export class MalApi{
  url = 'https://api.myanimelist.net/v2';
  tokenUrl = 'https://myanimelist.net/v1/oauth2/token?';
  authUrl = 'https://myanimelist.net/v1/oauth2/authorize?';
  title = 'https://myanimelist.net/';
  link = {
    item: (type, id) => this.title+type+'/'+id
  };
  dataConverter = (o) => {
    if(!o.data) return;
    if(o.method === 'get') return;
    if(!o.headers['Content-Type']) return;
    switch(o.headers['Content-Type']){
      case 'application/json': return JSON.stringify(o.data);
      case 'application/text': return JSON.stringify(o.data);
      case 'text/html': return o.data;
      case 'application/x-www-form-urlencoded': return new URLSearchParams(o.data);
      default: return o.data;
    }
  };
  fetch = (o) => {
    return fetch(o?.url||this.url, {
      method: o.method||'GET',
      headers: {
        ...o.headers
      },
      ...(o.data) && {body: this.dataConverter(o)}
    }).then(
      r => {
        // console.log('[MAL API] R', r);
        if(!r.ok){
          new Ut().MyError(['[MAL API]', 'Err', {type:'log'}], {response:r});
        }else return r.json();
      }).then(
        res => {
          // console.log('QQQQQQ', res)
          if(res && res.error) throw new Ut().MyError(['[MAL API]', 'Wrong response', {type:'log'}], {response:res});
          else return res;
        },
        err => {
          // console.log(err, err.error);
          throw new Ut().MyError(['[MAL API]', 'Err', {type:'log'}], {err:err});
        }
      )
  };
  search = {
    item: {
      byId: (o) => {
        o.secrets?.url && (o.url = o.secrets.url);
        const query = {
          // q: o.title,
          ...o.query
        };
        o.headers = {
          // 'Content-Type': 'application/json',
          ...(o.login && o.secrets?.accToken) && {Authorization: 'Bearer ' + o.secrets.accToken} || {'X-MAL-CLIENT-ID': o.secrets.clientID},
          Url: `${this.url}/${o.type}/${o.id}?${new URLSearchParams(query)}`
        };

        // console.log('O id', o);
        return this.fetch(o);
      }
    },
    items: {
      byTitle: (o) => {
        o.secrets?.url && (o.url = o.secrets.url);
        const query = {
          q: o.title.slice(0, 64),
          ...o.query
        };
        o.headers = {
          // 'Content-Type': 'application/json',
          ...(o.login && o.secrets?.accToken) && {Authorization: 'Bearer ' + o.secrets.accToken} || {'X-MAL-CLIENT-ID': o.secrets.clientID},
          Url: `${this.url}/${o.type}?${new URLSearchParams(query)}`
        };

        // console.log('Lolo', o);
        return this.fetch(o).then(
          res => {
            if(!res) return;
            if(!res.data) return;
            if(new Ut().getType(res.data) !== 'Array') throw new Ut.MyError(['[MAL API]', 'Not array/not found', {type:'log'}], {o:o});
            const data = [];

            res.data.forEach(e => {
              data.push(e.node);
            });
            return data;
          }
        );
      }
    }
  };
  auth = {
    cc: (length) => {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    
      for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    
      return text;
    },
    getToken: (o) => {
      o.secrets?.url && (o.url = o.secrets.url);
      o.method = 'POST';
      o.data = {
        grant_type: 'authorization_code',
        client_id: o.secrets.clientID,
        client_secret: o.secrets.clientSecret,
        redirect_uri: o.secrets.redirectUri,
        code: o.secrets.code,
        code_verifier: o.secrets.codeChall
      }

      o.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
        Url: this.tokenUrl
      };

      console.log('TK', o);

      return this.fetch(o).then(
        res => {
          if(!res) return;
          if(!res.access_token) return;
          res.jwt = new Ut().token.parseJwt(res.access_token);
          return res;
        }
      )
    },
    updToken: (o) => {
      o.secrets?.url && (o.url = o.secrets.url);
      o.method = 'POST';
      o.data = {
        grant_type: 'refresh_token',
        client_id: o.secrets.clientID,
        client_secret: o.secrets.clientSecret,
        redirect_uri: o.secrets.redirectUri,
        refresh_token: o.secrets.refToken
      }

      o.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+o.secrets.accToken,
        Url: this.tokenUrl
      };

      console.log('TK', o);

      return this.fetch(o).then(
        res => {
          if(!res) return;
          if(!res.access_token) return;
          res.jwt = new Ut().token.parseJwt(res.access_token);
          return res;
        }
      )
    },
    url: (o) => {
      console.log(o);
      const data = {
        'response_type': 'code',
        'client_id': o.secrets.clientID,
        'redirect_uri': o.secrets.redirectUri,
        'code_challenge': o.secrets.codeChall
      };
  
      return this.authUrl+new URLSearchParams(data).toString();
    }
  };
  user = {
    list: {
      upd: (o) => {
        o.secrets?.url && (o.url = o.secrets.url);
        o.method = 'PUT';
    
        o.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+o.secrets.accToken,
          Url: `${this.url}/${o.type||''}/${o.id||''}/my_list_status?`
        }

        console.log('AE', o);
    
        return this.fetch(o);
      }
    }
  }
};
