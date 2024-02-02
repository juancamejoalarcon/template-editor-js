class State {
    constructor() {
        this.preventDestroyFunctToFireFlag = false
    }

    setPreventDestroyFunctToFire(value) {
        this.preventDestroyFunctToFireFlag = value
    }

    setApi(API) {
        this.api = API
    }
}

export default new State()