export default () => `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amarante&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');

.dark-theme {
  --col: rgb(255 255 255);
  --col-sec: rgb(253 53 53);
  --col-thi: rgb(0 0 0);
  --col-for: rgb(130 232 255);
  --col-5: rgb(210 188 205);
  --bck-c: rgb(0 0 0);
  --bck-c-sec: rgb(65 65 65);
  --bck-c-thi: rgb(255 255 255);
  --bck-c-for: rgb(65 65 65);
  --bck-c-six: rgb(93 195 154);
  --bck-c-sev: rgb(231 125 163);

  --bck-c-red: rgb(91 54 54);
  --bck-c-green: rgb(200 100 100);
  --bck-hover: rgb(34 66 91);

  --bor-c: rgb(145 145 145);
  --bor-c-sec: rgb(101 101 101);

  --shd-c: rgb(255 255 255);
  --shd-c-sec: rgb(0 0 0);

  --scr-c: rgb(189 164 164);

  --font-mini: "Amarante", serif;
}
.light-theme {
  --col: rgb(0 0 0);
  --col-sec: rgb(53 53 53);
  --col-thi: rgb(255 255 255);
  --bck-c: rgb(198 206 233);
  --bck-c-sec: rgb(209 216 225);
  --bck-c-thi: rgb(0 0 0);
  --bck-c-for: rgb(255 255 255);
  --bck-c-six: rgb(243 206 233);
  --bck-c-sev: rgb(231 125 163);

  --bor-c: rgb(123 122 122);
  --bor-c-sec: rgb(101 101 101);

  --shd-c: rgb(0 0 0);
  --shd-c-sec: rgb(255 255 255);

  --scr-c: rgb(0 0 0);

  --font-mini: "Amarante", serif;
}

.lang-en {
  --header-item: "Amarante", serif;
}
.lang-ru {
  --header-item: "Overpass", sans-serif;
  --qheader-item: "Amarante", serif;
}
.-right {
  margin-left: auto;
}

.animanga-Widget {
  flex-direction: column;
  gap: 7px 3px;
  padding: 4px;
  width: auto;
  min-width: 0;
  border: 1px solid rgb(0 0 0);
  border-radius: 3px;
  background-color: var(--bck-c);
  margin-top: 10px;

  .-hidden {
    display: none;
  }

  .numBtn {
    color: var(--col);
    background-color: var(--bck-c);
    border: 2px solid var(--bor-c-sec);
    cursor: pointer;
    
    &.left {
      border-radius: 10px 0 0 10px;
    }
    &.right {
      border-radius: 0 10px 10px 0;
    }
  }

  .container {
    align-items: center;
    min-width: 0;
    
    &:not([i-gap]) {
      gap: 0 5px;
    }
  }

  *[i-gap] {
    &[i-gap='0'] {
      gap: 0;
    }
    &[i-gap='0 1px'] {
      gap: 0 1px;
    }
    &[i-gap='0 2px'] {
      gap: 0 2px;
    }
    &[i-gap='0 3px'] {
      gap: 0 3px;
    }
    &[i-gap='0 4px'] {
      gap: 0 4px;
    }
    &[i-gap='0 5px'] {
      gap: 0 5px;
    }

    &[i-gap='1px 0'] {
      gap: 1px 0;
    }
    &[i-gap='2px 0'] {
      gap: 2px 0;
    }
    &[i-gap='3px 0'] {
      gap: 3px 0;
    }
    &[i-gap='4px 0'] {
      gap: 4px 0;
    }
    &[i-gap='5px 0'] {
      gap: 5px 0;
    }

    &[i-gap='1px 1px'] {
      gap: 1px 1px;
    }
    &[i-gap='2px 2px'] {
      gap: 2px 2px;
    }
    &[i-gap='3px 3px'] {
      gap: 3px 3px;
    }
    &[i-gap='4px 4px'] {
      gap: 4px 4px;
    }
    &[i-gap='5px 5px'] {
      gap: 5px 5px;
    }
  }

  [i-align] {
    &[i-align='end'] {
      margin-left: auto;
    }
  }

  .lab {
    align-items: center;
    min-width: 0;

    &:not([i-gap]) {
      gap: 0 5px;
    }
  }

  .itemNum {
    min-width: 0;
    font-size: 14px;
    font-family: "Amarante", serif;

    &.val {
      padding: 1px 0px 1px 2px;
      text-align: center;
      min-width: 8px;
      width: 0;
      -width: attr(value px, 20px);
      appearance: none;
      -moz-appearance: textfield;
      color: var(--col);
      background-color: unset;
      border: none;
      outline: none;

      &::-webkit-inner-spin-button {
        display: none;
      }
    }

    &.len {
      gap: 0 0px;
      color: var(--col);

      &[i-sep] {
        -gap: attr(i-gap type(*));
  
        &[i-sep='before'] {
          &::before {
            content: '/';
          }
        }
        &[i-sep='after'] {
          &::after {
            content: '/';
          }
        }
      }
    }
  }

  .line {
    flex-grow: 1;
    align-items: center;
    gap: 7px 7px;
    min-width: 0;

    &[i-dir] {
      -flex-direction: attr(i-dir type(<custom-ident>));

      &[i-dir='column'] {
        flex-direction: column;
      }
    }

    &[i-align] {
      &[i-align='normal'] {
        align-self: normal;
      }
    }
    &:not([i-align]) {
      align-self: normal;
    }
    
    .-string {
      flex-wrap: wrap;
      flex-grow: 1;
      align-items: center;
      gap: 5px 7px;
      min-width: 0;

      &[i-align] {
        &[i-align='normal'] {
          align-self: normal;
        }
      }
      &:not([i-align]) {
        align-self: normal;
      }
      
      .-item {
        gap: 0 3px;
        position: relative;
        min-width: 0;
        padding: 3px 5px 3px 5px;
        font-family: var(--header-item);
        color: var(--col);

        &.airpublish {
          background-color: var(--bck-c-green);
        }
        &.finished {
          background-color: var(--bck-c-red);
        }

        &.link {
          text-decoration: none;
        }

        &[i-align] {
          &[i-align='end'] {
            margin-left: auto;
          }
        }
        &:not([i-align]) {
          align-self: normal;
        }

        &:not([i-style]){
          background-color: var(--bck-c-sec);
          color: var(--col);
          border: 1px solid var(--bor-c);
          border-radius: 20px;
        }

        &[i-style] {

          &[i-style='color'] {
            border-radius: 20px;
            background-color: var(--bck-c-alert);
            border: 1px solid var(--bor-c);
          }
          &[i-style='noBorders'] {
            border-radius: 20px;
          }
        }

        &.mal {
          &::after {
            position: absolute;
            top: -2px;
            right: -5px;
            vertical-align: super;
            font-size: 9px;
            content: 'ML';
            background-color: var(--bck-c-sec);
          }
        }

        &.ani {
          &::after {
            position: absolute;
            top: -2px;
            right: -5px;
            vertical-align: super;
            font-size: 9px;
            content: 'AL';
            background-color: var(--bck-c-sec);
          }
        }

        &.reload {
          cursor: pointer;
        }

        &.statusItem {
          border-radius: unset;
          outline: none;
        }
      }

      .-miniItem {
        min-width: 0;
        position: relative;
        font-family: var(--header-item);
        color: var(--col);

        &.mal {
          margin: 0 5px 0 0;

          &::after {
            position: absolute;
            top: -2px;
            right: -5px;
            vertical-align: super;
            font-size: 9px;
            content: 'ML';
            background-color: var(--bck-c-sec);
          }
        }

        &.ani {
          &::after {
            position: absolute;
            top: -2px;
            right: -5px;
            vertical-align: super;
            font-size: 9px;
            content: 'AL';
            background-color: var(--bck-c-sec);
          }
        }

        &.reload {
          cursor: pointer;
        }
      }

      .item-group {
        flex-wrap: wrap;
        position: relative;

        &.mal {
          &::after {
            position: absolute;
            top: -2px;
            right: -5px;
            vertical-align: super;
            font-size: 9px;
            content: 'ML';
            font-family: var(--font-mini);
            color: var(--col);
            background-color: var(--bck-c-sec);
          }
        }

        &:not([i-gap]) {
          gap: 3px 5px;
        }
      }
    }
  }

  .-itemTitle {
    padding: 0 0 3px 0;
    color: var(--col);
    /* font-family: 'Parkinsans', sans-serif; */
    font-family: 'Faculty Glyphic', sans-serif;
    border: solid var(--bor-c);
    border-width: 0 0 2px 0;
  }
}

.widgetStatus {
  .gap-5 {
    gap: 5px 5px;
  }

  .list {
  }

  .pad-list {
    padding: 0 0 0 10px;
    
    >.header {
      font-weight: 600;
    }
  }
  .pad-item {
    padding: 0 0 0 10px;
  }

  .lTitle {
    &::first-letter {
      color: red;
    }
  }

  .item {
    gap: 0 5px;

    &.ok {
      align-items: center;

      &::after {
        content: '✔️';
      }
    }
    &.notOk {
      align-items: center;

      &::after {
        content: '❌';
      }
    }
  }
}

.mdl {
  width: 80%;

  .m-header {
    text-align: center;
  }

  .m-list {
    gap: 5px 5px;
  }

  &::backdrop {
    background-color: rgb(0 0 0 / 0.8);
  }
}
`
