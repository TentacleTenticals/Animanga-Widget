import {AniApi} from './m.js';
import {Ut} from '../../funcs/utils.js';

export class AniFc extends AniApi{
  link = {
    item: (type, id) => this.title+type+'/'+id
  };
  fc = {
    auth: {
      url: (o) => this.auth.url(o),
      getToken: (o) => {
        return this.auth.getToken(o).then(
          res => {
            if(!res) return;
            if(!res.access_token) return;
            res.jwt = new Ut().token.parseJwt(res.access_token);
            return res;
          }
        )
      },
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
      item: {
        m: async (o) => {
          // console.log('ITEM', o);
          // return this.search.items.byTitle(o);
  
          try{
            const item = await this.fc.search.item.filter.byTitle({
              type: o.type,
              title: o.title,
              query: o.query,
              secrets: o.secrets,
              textMatch: o.textMatch
            });
            if(!item) return;

            const result = await this.fc.search.item.byId({
              id: item.id,
              idMal: item.idMal,
              login: o.login,
              secrets: o.secrets
            });
            console.log('QER', result);
            if(result) return result;
          }catch(err){
            console.error('[Anilist FC]', err);
          }
        },
        filter: {
          byTitle: (o) => {
            return this.fc.search.items.byTitle(o).then(
              items => {
                if(!items && !items.length) return;
  
                items.forEach(e => {
                  e.iTitle = e.title.romaji;
                });
                // console.log('LOLI', items)
                const found = new Ut().textMatcher.m(items, o.title, {textMatch: o.textMatch});
                if(found.ind === null) return;
                return (items[found.ind]);
              }
            );
          }
        },
        byId: (o) => new AniApi().search.item.byId({
          id: o.id,
          idMal: o.idMal,
          login: o.login,
          secrets: o.secrets
        }).then(
          res => {
            console.log('[ANI byID]', res);
            if(!res) return;
            if(!res.data) return;
            if(!res.data && !res.data.errors) throw new Ut().MyError(['[ANI byID]', 'Err', {type:'log'}], {errors:res.data.errors});
            if(!res.data.Media) return;
            // if(!res.data.Page.media) return;
            // console.log(ut.getType(res.data.Page.media));
            return res.data.Media;
          },
          err => {}
        )
      },
      items: {
        byTitle: (o) => {
          console.log('T', o)
          return this.search.items.byTitle({
            type: o.type,
            title: o.title,
            limit: o.limit,
            login: o.login,
            secrets: o.secrets
          }).then(
            res => {
              console.log('ANI', res);
              if(!res) return;
              if(!res.data) return;
              if(!res.data.Page) return;
              if(!res.data.Page.media) return;
              if(!res.data.Page.media.length) throw new Ut().MyError(['ANI Search byTitle', 'Not found', {type:'log'}])
              // console.log('RRR', res.data.Page.media)
              // console.log(ut.getType(res.data.Page.media));
              return res.data.Page.media;
            }
          )
        }
      }
    }
  }
}

// "id": 105228,
// "idMal": 38668,
