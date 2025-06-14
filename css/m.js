export default () => `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amarante&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

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

  --bck-hover-c: rgb(100, 100, 200);

  --col-ok: rgb(110 203 164);
  --col-fail: rgb(199 99 155);

  --bck-c-red: rgb(91 54 54);
  --bck-c-green: rgb(200 100 100);
  --bck-hover: rgb(34 66 91);

  --bor-c: rgb(145 145 145);
  --bor-c-sec: rgb(101 101 101);

  --shd-c: rgb(255 255 255);
  --shd-c-sec: rgb(0 0 0);

  --scr-c: rgb(189 164 164);

  --font-mini: "Amarante", serif;

  --mal-tag-c: rgb(215 215 255);
  --status-open: rgb(100, 200, 200);
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

:lang(en) {
  --header-item: "Amarante", serif;
  --title: "Overpass", sans-serif;
  --select: "Inter", sans-serif;
  --key: "Inter", sans-serif;
}
:lang(ru) {
  --header-item: "Amarante", serif;
  --title: "Overpass", sans-serif;
  --select: "Inter", sans-serif;
  --key: "Inter", sans-serif;
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

  .-btn {
    border: unset;
    background-color: var(--bck-c);
  }

  .-itemSel {
    border: unset;
    color: var(--col);
    background-color: var(--bck-c);
    outline: none;
  }

  .-btn {
    cursor: pointer;
    
    &:hover {
      background-color: var(--bck-hover-c);
    }
  }

  [align] {
    &[align='end'] {
      margin-left: auto;
    }
  }

  .-item {
    gap: 0 3px;
    align-items: center;
    -align-items: end;
    position: relative;
    min-width: 0;
    padding: 3px 5px 3px 5px;
    font-family: var(--header-item);
    color: var(--col);

    &.n-title-search {
      &:has(.n-title .value:empty) {
        display: none;
      }
      .n-title {
        &:has(.value:empty) {
          display: none;
        }
      }
      .n-search {
        &:empty {
          display: none;
        }
      }
    }

    .n-search {
      padding: 0 3px 0 3px;
      font-size: smaller;
      font-weight: 600;
      min-width: auto;
      background-color: var(--bck-c-for);
      border-radius: 3px;
      cursor: pointer;

      &[status] {
        &[status='+'] {
          color: var(--col-ok);
        }
        &[status='-'] {
          color: var(--col-fail);
        }
      }
    }

    &.n-broadcast {
      &:not([showEnded])[status='finished'] {
        display: none;
      }
    }
    &.n-id {
      .value {
        text-decoration: none;
        color: var(--col);
      }
    }

    .value {
      &:is(:empty) {
        display: none;
      }
    }

    &.airpublish {
      background-color: var(--bck-c-green);
    }
    &.finished {
      background-color: var(--bck-c-red);
    }

    &.n-link {
      text-decoration: none;
    }

    &.n-reload {
      cursor: pointer;
    }

    &.n-statusItem {
      outline: none;
    }
  }

  .n-statusItem {
    font-family: var(--select);
  }

  [border] {
    &[border='1'] {
      border: 1px solid var(--bor-c);
    }
    &[border='2'] {
      border: 2px solid var(--bor-c);
    }
  }
  [border_r] {
    &[border_r='1'] {
      border-radius: 3px;
    }
    &[border_r='2'] {
      border-radius: 20px;
    }
  }

  .n-save-updated {
    gap: 0 10px;
    flex-grow: 1;
    align-self: auto;

    &[align='end'] {
      justify-content: end;

      summary {
        align-self: end;
      }
    }
    
    .n-updatedAt {
      flex-grow: 1;
      min-width: 0;
      position: relative;

      summary {
        cursor: pointer;
      }

      &[open] summary {
        list-style-type: '';
        background-color: var(--status-open);
      }
      &:not([open]) summary {
        list-style-type: '';
      }
  
      .list {
        gap: 0 5px;
        padding: 0 3px 0 3px;
        position: absolute;
        right: 0;
        width: calc(100% - 3px - 3px);
        background-color: var(--bck-c);
        border-radius: 0 0 3px 3px;
        border: 1px solid var(--bor-c);
        box-shadow: 0 0 3px 1px rgb(0, 0, 0);

        .item {
          gap: 0 5px;
          white-space: nowrap;
        }
      }
    }

    .n-save {
      flex-grow: 0;

      &.saved {
        &::after {
          content: '✅';
        }
      }
    }
  }

  *[api] {
    &[api='mal'] {
      &[tag] {
        &::after {
          position: absolute;
          top: -2px;
          right: -5px;
          vertical-align: super;
          font-size: 9px;
          content: 'ML';
          font-family: var(--font-mini);
          font-weight: 400;
          background-color: var(--bck-c-sec);
        }

        &[tag='2'] {
          &::after {
            color: var(--mal-tag-c);
          }
        }
      }
    }
    &[api='ani'] {
      &[tag='1'] {
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
    }
  }

  .numBtn {
    color: var(--col);
    background-color: var(--bck-c);
    border: unset;
    -border: 2px solid var(--bor-c-sec);
    cursor: pointer;

    &:hover {
      background-color: var(--bck-hover-c);
    }
    
    &.left {
      border-radius: 10px 0 0 10px;
    }
    &.right {
      border-radius: 0 10px 10px 0;
    }
  }

  .container {
    min-width: 0;
    position: relative;
    
    &:not([gap]) {
      gap: 0 5px;
    }
  }

  *[gap] {
    &[gap='0'] {
      gap: 0;
    }
    &[gap='0 1px'] {
      gap: 0 1px;
    }
    &[gap='0 2px'] {
      gap: 0 2px;
    }
    &[gap='0 3px'] {
      gap: 0 3px;
    }
    &[gap='0 4px'] {
      gap: 0 4px;
    }
    &[gap='0 5px'] {
      gap: 0 5px;
    }

    &[gap='1px 0'] {
      gap: 1px 0;
    }
    &[gap='2px 0'] {
      gap: 2px 0;
    }
    &[gap='3px 0'] {
      gap: 3px 0;
    }
    &[gap='4px 0'] {
      gap: 4px 0;
    }
    &[gap='5px 0'] {
      gap: 5px 0;
    }

    &[gap='1px 1px'] {
      gap: 1px 1px;
    }
    &[gap='2px 2px'] {
      gap: 2px 2px;
    }
    &[gap='3px 3px'] {
      gap: 3px 3px;
    }
    &[gap='4px 4px'] {
      gap: 4px 4px;
    }
    &[gap='5px 5px'] {
      gap: 5px 5px;
    }
  }

  .lab {
    align-items: center;
    min-width: 0;

    &:not([gap]) {
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

      &[separator] {
        -gap: attr(gap type(*));
  
        &[separator='before'] {
          &::before {
            content: '/';
          }
        }
        &[separator='after'] {
          &::after {
            content: '/';
          }
        }
      }
    }
  }

  .line {
    flex-grow: 1;
    gap: 7px 7px;
    min-width: 0;

    &[direction] {

      &[direction='column'] {
        flex-direction: column;
      }
    }

    &[i-align] {
      &[i-align='normal'] {
      }
    }
    &:not([i-align]) {
    }
    
    .-string {
      flex-wrap: wrap;
      flex-grow: 1;
      gap: 5px 7px;
      min-width: 0;

      .-itemMini {
        min-width: 0;
        align-items: center;
        position: relative;
        font-family: var(--header-item);
        color: var(--col);

        &.reload {
          cursor: pointer;
        }
      }

      .item-group {
        flex-wrap: wrap;
        position: relative;

        &:not([gap]) {
          gap: 3px 5px;
        }
      }
    }
  }

  .-itemTitle {
    padding: 0 0 3px 0;
    color: var(--col);
    font-family: 'Faculty Glyphic', sans-serif;
    border: solid var(--bor-c);
    border-width: 0 0 2px 0;
  }
}

.widgetStatus {
  .gap-5 {
    gap: 5px 5px;
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

.search-modal {
  gap: 7px 0;
  background-color: var(--bck-c);

  .header {
    gap: 5px 0;

    .title {
      text-align: center;
      color: var(--col);
    }

    .item {
      gap: 0 5px;

      .text {
        color: var(--col);
      }
    }
  }

  .list {
    gap: 5px 0;

    .item {
      justify-content: space-between;
      gap: 0 5px;
      color: var(--col);

      .num {
        padding: 0 2px 0 2px;
        font-size: smaller;
        border: 1px solid var(--bor-c);
        border-radius: 2px;
      }
    }
  }
}
`
