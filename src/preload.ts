// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', async () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld('api', {
  path: async () => {
    const path = (document.getElementById('dbpath') as HTMLInputElement).value;
    try {
      const res = await ipcRenderer.invoke('setDatabase', path);
      (document.getElementById('pout') as HTMLElement).innerText = 'Output: ' + res;
    } catch (error) {
      (document.getElementById('pout') as HTMLElement).innerText = 'Output: ' + error;
    }
  },
  equery: async () => {
    const query = (document.getElementById('singlequery') as HTMLInputElement).value;
    const fetch = (document.getElementById('fetch') as HTMLInputElement).value;
    const values = (document.getElementById('value') as HTMLInputElement).value;
    try {
      const arr = JSON.parse("[" + values + "]");
      const res = await ipcRenderer.invoke('executeQuery', query, fetch, arr[0]);
      (document.getElementById('pout1') as HTMLElement).innerText = 'Output: ' + res;
    } catch (error) {
      (document.getElementById('pout1') as HTMLElement).innerText = 'Output: ' + error;
    }
  },
  mquery: async () => {
    const query = (document.getElementById('query') as HTMLInputElement).value;
    const values = (document.getElementById('values') as HTMLInputElement).value;
    try {
      const arr = JSON.parse("[" + values + "]");
      const res = await ipcRenderer.invoke('executeMany', query, arr[0]);
      (document.getElementById('pout2') as HTMLElement).innerText = 'Output: ' + res;
    } catch (error) {
      (document.getElementById('pout2') as HTMLElement).innerText = 'Output: ' + error;
    }
  },
  escript: async () => {
    const spath = (document.getElementById('scriptPath') as HTMLInputElement).value;
    const res = await ipcRenderer.invoke('executeScript', spath);
    (document.getElementById('pout3') as HTMLElement).innerText = 'Output: ' + res;
  }
});