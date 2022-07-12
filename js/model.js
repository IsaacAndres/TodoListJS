export default class Model {

    constructor () {
        this.view = null
        this.todos = JSON.parse(localStorage.getItem('todos'))
        if ( !this.todos || this.todos.length < 1 ) {
            this.todos = [
                {
                    key: 0,
                    title: 'Learn JS',
                    description: 'Watch JS tutorial',
                    completed: false,
                }
            ]
            this.currentKey = 1
        } else {
            this.currentKey = this.todos[this.todos.length - 1].key + 1
        }
    }

    setView ( view ) {
        this.view = view
    }

    save () {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    getTodos () {
        return this.todos.map((todo) => ({...todo}))
    }

    findTodo ( key ) {
        return this.todos.findIndex( ( todo ) => todo.key === key)
    }

    toggleCompleted ( key ) {
        const index = this.findTodo( key )
        const todo = this.todos[index]
        todo.completed = !todo.completed
        this.save()
    }

    editTodo ( key, values ) {
        const index = this.findTodo( key )
        Object.assign(this.todos[index], values)
        this.save()
    }

    addTodo ( title, description ) {
        const todo = {
            key: this.currentKey++,
            title,
            description,
            completed: false,
        }

        this.todos.push( todo )
        this.save()

        return {...todo}
    }

    removeTodo ( key ) {
        const index = this.findTodo( key )
        this.todos.splice(index, 1)
        this.save()
    }

}