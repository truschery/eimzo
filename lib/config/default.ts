import Config from "./Config";

const eimzoConfig = new Config({
    default: {
        'timestamp': null
    }
})

export default eimzoConfig

// eimzoConfig.merge({
//     'timestamp': 'your-site.com'
// })

// eimzoConfig.get('timestamp')
// eimzoConfig.equal('timestamp', '123')




