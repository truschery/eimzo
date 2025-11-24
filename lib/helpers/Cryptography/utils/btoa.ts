import cb_encode from "./cb_encode";


const localBtoa = (b: string) => {
    return b.replace(/[\s\S]{1,3}/g, cb_encode)
}

export default localBtoa