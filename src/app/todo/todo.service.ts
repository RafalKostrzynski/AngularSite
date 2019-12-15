import { Injectable } from '@angular/core';

let TODOS = [
  { title: 'Wstać', isDone: true },
  { title: 'Zrobić płatki', isDone: true },
  { title: 'Pójść na uczelnie', isDone: true },
  { title: 'Nauczyć się Angulara :(', isDone: false },
  { title: 'Opić zaliczenie lub poprawić stronę', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public constructor() { }

  public get(query = '') {
    return new Promise(resolve => {
      let data;
  
      if (query === 'completed' || query === 'active'){
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = TODOS;
      }
  
      resolve(data);
    });
  }

  public add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }

  public put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].title = changed.title;
      resolve(changed);
    });
  }

  public delete(selected) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    });
  }

  public deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone);
      resolve(TODOS);
    });
  }

  public toggle(selected) {
    selected.isDone = !selected.isDone;
    return Promise.resolve();
  }

}