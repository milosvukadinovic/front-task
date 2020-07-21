import {extendObservable} from 'mobx';

class UserStore {
    constructor(){
        extendObservable(this, {

            isLoggedIn: false,
            username: '',
            apiKey: ''

        })
    }
}

export default new UserStore();