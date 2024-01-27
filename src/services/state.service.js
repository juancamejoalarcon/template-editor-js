class State {
    constructor() {
        this.preventDestroyFunctToFireFlag = false
    }

    setPreventDestroyFunctToFire(value) {
        this.preventDestroyFunctToFireFlag = value
    }
}

export default new State()