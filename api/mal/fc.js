import {MalApi} from './m.js';
import {Ut} from '../../funcs/utils.js';

export class MalFc extends MalApi{
  url = 'https://api.myanimelist.net/v2';
  tokenUrl = 'https://myanimelist.net/v1/oauth2/token?';
  authUrl = 'https://myanimelist.net/v1/oauth2/authorize?';
  title = 'https://myanimelist.net/';
  link = {
    item: (type, id) => this.title+type+'/'+id
  };
  fc = {
    auth: {
      cc: (length) => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
      
        for(var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
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
      },
      getToken: (o) => this.auth.getToken(o),
      updToken: (o) => {
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
            console.log('RRR', res);
            res.jwt = new Ut().token.parseJwt(res.access_token);
            return res;
          }
        )
      }
    },
    search: {
      items: {
        byTitle: (o) => {
          return this.search.items.byTitle({
            type: o.type,
            title: o.title,
            query: o.query,
            secrets: o.secrets
          });
        }
      },
      item: {
        m: async (o) => {
          try {
            const item = await this.fc.search.item.filter.byTitle({
              type: o.type,
              title: o.title,
              query: o.query,
              secrets: o.secrets,
              textMatch: o.textMatch
            });
            if(!item) return;
  
            const result = await this.fc.search.item.byId({type:o.type, login:o.login, id:item.id, query:{
              fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'recommendations', 'related_manga', 'related_anime', 'priority'].join()
            }, secrets:o.secrets});
            if(result) return result;
  
          }catch(err){
            console.log('ERR', err);
          }
        },
        byId: (o) => this.search.item.byId({
          type: o.type,
          id: o.id,
          query: o.query,
          login: o.login,
          secrets: o.secrets
        }).then(
          res => {
            console.log('[MAL byID]', res);
            // if(!res) return;
            // if(!res.data) return;
            // if(!res.data.Media) return;
            // // if(!res.data.Page.media) return;
            // // console.log(new Ut().getType(res.data.Page.media));
            return res;
          }
        ),
        filter: {
          byTitle: (o) => {
            // console.log('ITEM', o);
            return this.fc.search.items.byTitle(o).then(
              items => {
                if(!items && !items.length) return;
  
                items.forEach(e => {
                  e.iTitle = e.title;
                });
                const found = new Ut().textMatcher.m(items, o.title, {textMatch: o.textMatch});
                if(found.ind === null) return;
                return (items[found.ind]);
              }
            );
    
            // try{
            //   const items = await this.search.items.byTitle(o);
            //   if(items && items.length){
            //     items.forEach(e => {
            //       e.iTitle = e.title;
            //     });
            //     const found = new Ut().textMatcher.m(items, o.title, {textMatch: o.textMatch});
            //     // console.log('RES', items);
            //     console.log('FOUND', found, items[found.ind]);
            //     if(found.ind === null) return;
            //     return (items[found.ind]);
            //     // const result = await this.search.item.byId({login:false, type:o.type, id:items[found.ind].id, query:{
            //     //   fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'recommendations', 'related_manga', 'related_anime', 'priority'].join()
            //     // }, secrets:o.secrets});
            //     // if(result) return result;
            //   }
            // }catch(err){
            //   console.log('[MAL FC]', err);
            // }
          },
        }
      }
    },
    user: {
      list: {
        upd: (o) => {
          return this.user.list.upd(o);
        }
      }
    }
  };
}
