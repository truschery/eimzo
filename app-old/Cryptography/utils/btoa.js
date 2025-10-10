import cb_encode from "./cb_encode.js";


const localBtoa = (b) => {
    return b.replace(/[\s\S]{1,3}/g, cb_encode)
}

export default !!btoa ? btoa : localBtoa