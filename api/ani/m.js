import {Ut} from '../../funcs/utils.js';

export class AniApi{
  url = 'https://graphql.anilist.co';
  title = 'https://anilist.co/';
  authUrl = 'https://anilist.co/api/v2/oauth/authorize';
  tokenUrl = 'https://anilist.co/api/v2/oauth/token';
  dataConverter = (o) => {
    if(!o.data) return;
    return JSON.stringify(o.data);
  };
  fetch = (o) => {
    return fetch(o?.url||this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...o.headers
      },
      ...(o.data) && {body: this.dataConverter(o)}
      // body: JSON.stringify({
      //   'query': o.query,
      //   'variables': o.variables
      // })
    }).then(
      r => {
        console.log('[ANI API] R', r);
        if(!r.ok){
          throw new Ut().MyError(['[ANI API]', 'Err', {type:'log'}], {response:r});
        }else return r.json();
      }).then(
        res => {
          console.log('QQQQQQ', res)
          if(res && res.error) throw new Ut().MyError(['[ANI API]', 'Wrong response', {type:'log'}], {response:r});
          else return res;
        },
        err => {
          console.log(err, err.error);
          throw new Ut().MyError(['[ANI API]', 'Err', {type:'log'}], {err:err});
        }
      )
  };
  search = {
    item: {
      byId: (o) => {
        o.login && o.secrets?.url && (o.url = o.secrets.url);
        o.headers = {
          ...o.login && o.secrets?.accToken && {Url: this.url},
          ...o.login && o.secrets?.accToken && {Authorization: 'Bearer ' + o.secrets.accToken}
        };
        const query = `
          query Media($mediaId: Int, $idMal: Int) {
            Media(id: $mediaId, idMal: $idMal) {
              ${this.search.item.template}
            }
          }
        `;
        const variables = {
          ...o.id && {mediaId: o.id},
          ...o.idMal && {idMal: o.idMal}
        };
        o.data = {
          'query': query,
          'variables': variables
        };

        console.log('O', o)
        return this.fetch(o);
      },
      template: `id, idMal
        countryOfOrigin
        title {
          romaji, english, native
        }, synonyms
        type, source, format
        episodes, chapters, volumes, duration
        status, nextAiringEpisode {
          airingAt, timeUntilAiring, episode
        }
        meanScore, averageScore, popularity
        favourites
        stats {
          scoreDistribution {
            amount, score
          },
          statusDistribution {
            amount, status
          }
        }
        mediaListEntry {
          progress, progressVolumes, repeat
          priority
          score, status
          createdAt, updatedAt, completedAt {
            year, month, day
          }
          startedAt {
            year, month, day
          }
          private
        }
        isFavourite
        description
        genres, tags {
          name
        }
        bannerImage, coverImage {
          medium, large
        }
        trailer {
          site, thumbnail, id
        }
        rankings {
          allTime
          context
          rank
          season
          type
          year
        }
        season, seasonYear
        startDate {
          year, month, day
        }
        studios {
          nodes {
            isAnimationStudio
            name
            siteUrl
          }
        }
        recommendations {
          nodes {
            mediaRecommendation {
              id, idMal
              countryOfOrigin
              title {
                romaji, english, native
              }, synonyms
              type, source, format
              episodes, chapters, volumes, duration
              status, nextAiringEpisode {
                airingAt, timeUntilAiring, episode
              }
              meanScore, averageScore, popularity
              }
          }
        }`
    },
    items: {
      template: `id, idMal
      countryOfOrigin
      title {
        romaji, english, native
      }, synonyms
      type, source, format
      episodes, chapters, volumes, duration
      status, nextAiringEpisode {
        airingAt, timeUntilAiring, episode
      }
      meanScore, averageScore, popularity
      favourites
      stats {
        scoreDistribution {
          amount, score
        },
        statusDistribution {
          amount, status
        }
      }
      mediaListEntry {
        progress, progressVolumes, repeat
        priority
        score, status
        createdAt, updatedAt, completedAt {
          year, month, day
        }
        startedAt {
          year, month, day
        }
        private
      }
      isFavourite
      description
      genres, tags {
        name
      }
      bannerImage, coverImage {
        medium, large
      }
      trailer {
        site, thumbnail, id
      }
      rankings {
        allTime
        context
        rank
        season
        type
        year
      }
      season, seasonYear
      startDate {
        year, month, day
      }
      studios {
        nodes {
          isAnimationStudio
          name
          siteUrl
        }
      }
      recommendations {
        nodes {
          mediaRecommendation {
            id, idMal
            countryOfOrigin
            title {
              romaji, english, native
            }, synonyms
            type, source, format
            episodes, chapters, volumes, duration
            status, nextAiringEpisode {
              airingAt, timeUntilAiring, episode
            }
            meanScore, averageScore, popularity
            }
        }
      }`,
      byTitle: (o) => {
        o.login && o.secrets?.url && (o.url = o.secrets.url);
        o.headers = {
          ...o.login && o.secrets?.accToken && {Url: this.url},
          ...o.login && o.secrets?.accToken && {Authorization: 'Bearer ' + o.secrets.accToken}
        };
        const query = `
          query Query($type: MediaType, $search: String, $perPage: Int) {
            Page(perPage: $perPage) {
              media(type: $type, search: $search) {
                id, idMal
                title {
                  romaji, english, native
                }
              }
            }
          }
        `;
        const variables = {
          type: o.type.toUpperCase(),
          search: o.title.slice(0, 64),
          perPage: o.limit
        };
        o.data = {
          'query': query,
          'variables': variables
        };
        console.log('Lolo', o)
        return this.fetch(o);
      }
    }
  };
  auth = {
    getToken: (o) => {
      // o.url = this.tokenUrl;
      o.data = {
        grant_type: "authorization_code",
        client_id: o.secrets.clientID,
        client_secret: o.secrets.clientSecret,
        redirect_uri: o.secrets.redirectUri,
        code: o.secrets.code
      }

      o.headers = {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Url: this.tokenUrl
      };

      console.log('TK', o);

      return this.fetch(o);
    },
    url: (o) => {
      console.log('U', o)
      const data = {
        client_id: o.secrets.clientID,
        redirect_uri: o.secrets.redirectUri,
        response_type: 'code'
      };

      console.log('UU', this.authUrl+'?'+new URLSearchParams(data))
  
      return this.authUrl+'?'+new URLSearchParams(data);
    }
  };
};
